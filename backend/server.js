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

// In-memory storage
let users = [];
let notifications = [];
let notificationId = 1;

// File upload setup
const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
  res.json({ success: true, message: 'Sub-admin created' });
});

// Delete sub-admin (admin only)
app.delete('/api/admin/delete-subadmin/:username', authenticateToken, requireAdmin, (req, res) => {
  const { username } = req.params;
  const idx = users.findIndex(u => u.username === username && u.role === 'subadmin');
  if (idx === -1) return res.status(404).json({ error: 'Sub-admin not found' });
  users.splice(idx, 1);
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
  res.json({ success: true, message: 'Notification deleted' });
});


// Root route for health check
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
