const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');
const COUNTER_FILE = path.join(DATA_DIR, 'counters.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load data from JSON files
function loadData() {
  try {
    // Load users
    if (fs.existsSync(USERS_FILE)) {
      users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } else {
      users = [];
    }
    
    // Load notifications
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      notifications = JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf8'));
    } else {
      notifications = [];
    }
    
    // Load counters
    if (fs.existsSync(COUNTER_FILE)) {
      const counters = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
      notificationId = counters.notificationId || 1;
    } else {
      notificationId = 1;
    }
    
    console.log(`Loaded ${users.length} users and ${notifications.length} notifications`);
  } catch (error) {
    console.error('Error loading data:', error);
    users = [];
    notifications = [];
    notificationId = 1;
  }
}

// Save data to JSON files
function saveUsers() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

function saveNotifications() {
  try {
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ notificationId }, null, 2));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
}

// Load existing data on startup
loadData();

// In-memory storage (now backed by JSON files)
let users = users || [];
let notifications = notifications || [];
let notificationId = notificationId || 1;

// File upload setup
const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Custom middleware for serving files with proper headers
app.use('/uploads', (req, res, next) => {
  const filePath = path.join(__dirname, 'uploads', req.path);
  const ext = path.extname(req.path).toLowerCase();
  
  // Set appropriate Content-Type headers
  if (ext === '.pdf') {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline'); // Open in browser instead of download
  } else if (ext === '.html' || ext === '.htm') {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', 'inline');
  }
  
  // Serve the file
  express.static(path.join(__dirname, 'uploads'))(req, res, next);
});

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Admin-only middleware
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// Admin registration (for initial setup)
app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hash, role: 'admin' });
  saveUsers(); // Save to JSON file
  res.json({ success: true, message: 'Admin registered' });
});

// Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ success: true, token, user: { username: user.username, role: user.role } });
});

// Create sub-admin (admin only)
app.post('/api/admin/create-subadmin', authenticateToken, requireAdmin, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (users.find(u => u.username === username)) return res.status(400).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hash, role: 'subadmin' });
  saveUsers(); // Save to JSON file
  res.json({ success: true, message: 'Sub-admin created' });
});

// Delete sub-admin (admin only)
app.delete('/api/admin/delete-subadmin/:username', authenticateToken, requireAdmin, (req, res) => {
  const { username } = req.params;
  const idx = users.findIndex(u => u.username === username && u.role === 'subadmin');
  if (idx === -1) return res.status(404).json({ error: 'Sub-admin not found' });
  users.splice(idx, 1);
  saveUsers(); // Save to JSON file
  res.json({ success: true, message: 'Sub-admin deleted' });
});

// List sub-admins (admin only)
app.get('/api/admin/subadmins', authenticateToken, requireAdmin, (req, res) => {
  const subadmins = users.filter(u => u.role === 'subadmin').map(u => ({ username: u.username, role: u.role }));
  res.json({ success: true, data: subadmins });
});

// Change password (admin or subadmin)
app.post('/api/admin/change-password', authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = users.find(u => u.username === req.user.username);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return res.status(400).json({ error: 'Old password incorrect' });
  user.password = await bcrypt.hash(newPassword, 10);
  saveUsers(); // Save to JSON file
  res.json({ success: true, message: 'Password changed' });
});

// Notifications CRUD
// Create notification (admin or subadmin)
app.post('/api/notifications', authenticateToken, upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  let fileUrl = '', fileType = 'none';
  if (req.file) {
    fileUrl = `/uploads/${req.file.filename}`;
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext === '.pdf') fileType = 'pdf';
    else if (ext === '.html' || ext === '.htm') fileType = 'html';
    else {
      // Delete the uploaded file if not allowed
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Only PDF or HTML files allowed' });
    }
  }
  const notification = {
    id: notificationId++,
    title,
    description,
    fileUrl,
    fileType,
    createdAt: new Date()
  };
  notifications.unshift(notification);
  saveNotifications(); // Save to JSON file
  res.json({ success: true, data: notification });
});

// Get all notifications (public)
app.get('/api/notifications', (req, res) => {
  res.json({ success: true, data: notifications });
});

// Delete notification (admin or subadmin)
app.delete('/api/notifications/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const idx = notifications.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Notification not found' });
  // Optionally delete file
  if (notifications[idx].fileUrl) {
    const filePath = path.join(__dirname, notifications[idx].fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  notifications.splice(idx, 1);
  saveNotifications(); // Save to JSON file
  res.json({ success: true, message: 'Notification deleted' });
});


// Root route for health check
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
