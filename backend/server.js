const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const User = require('./models/User');
const Notification = require('./models/Notification');

const app = express();
const PORT = process.env.PORT || 5000;


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
// Admin registration (for initial setup, then disable or protect this route!)
app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash, role: 'admin' });
  await user.save();
  res.json({ success: true, message: 'Admin registered' });
});

// Login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.json({ success: true, token, user: { username: user.username, role: user.role } });
});

// Create sub-admin (admin only)
app.post('/api/admin/create-subadmin', authenticateToken, requireAdmin, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash, role: 'subadmin' });
  await user.save();
  res.json({ success: true, message: 'Sub-admin created' });
});

// Delete sub-admin (admin only)
app.delete('/api/admin/delete-subadmin/:username', authenticateToken, requireAdmin, async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username, role: 'subadmin' });
  if (!user) return res.status(404).json({ error: 'Sub-admin not found' });
  await user.deleteOne();
  res.json({ success: true, message: 'Sub-admin deleted' });
});

// List sub-admins (admin only)
app.get('/api/admin/subadmins', authenticateToken, requireAdmin, async (req, res) => {
  const subadmins = await User.find({ role: 'subadmin' }).select('-password');
  res.json({ success: true, data: subadmins });
});

// Notifications CRUD
// Create notification (admin or subadmin)
app.post('/api/notifications', authenticateToken, upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  let fileUrl = '', fileType = 'none';
  if (req.file) {
    fileUrl = `/uploads/${req.file.filename}`;
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext === '.pdf') fileType = 'pdf';
    else if (ext === '.html' || ext === '.htm') fileType = 'html';
    else return res.status(400).json({ error: 'Only PDF or HTML files allowed' });
  }
  const notification = new Notification({ title, description, fileUrl, fileType });
  await notification.save();
  res.json({ success: true, data: notification });
});

// Get all notifications (public)
app.get('/api/notifications', async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json({ success: true, data: notifications });
});

// Delete notification (admin or subadmin)
app.delete('/api/notifications/:id', authenticateToken, async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) return res.status(404).json({ error: 'Notification not found' });
  await notification.deleteOne();
  res.json({ success: true, message: 'Notification deleted' });
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bankura2Block API Server is running!',
    version: '1.0.0',
    status: 'active'
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message, phone } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email, message' 
    });
  }

  // Here you would typically save to database or send email
  console.log('Contact form submission:', { name, email, message, phone });
  
  res.json({ 
    success: true, 
    message: 'Contact form submitted successfully',
    data: { name, email }
  });
});

// News/Updates endpoint
app.get('/api/news', (req, res) => {
  const news = [
    {
      id: 1,
      title: 'Welcome to Bankura2Block',
      content: 'Discover our services and offerings.',
      date: '2024-01-15',
      category: 'announcement'
    },
    {
      id: 2,
      title: 'New Services Available',
      content: 'We have expanded our service offerings.',
      date: '2024-01-10',
      category: 'update'
    },
    {
      id: 3,
      title: 'Community Events',
      content: 'Join us for upcoming community events.',
      date: '2024-01-05',
      category: 'event'
    }
  ];
  
  res.json({ success: true, data: news });
});

// Services endpoint
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      name: 'Service One',
      description: 'Comprehensive solution for your needs',
      icon: 'service-icon-1',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      id: 2,
      name: 'Service Two',
      description: 'Advanced tools and support',
      icon: 'service-icon-2',
      features: ['Feature A', 'Feature B', 'Feature C']
    },
    {
      id: 3,
      name: 'Service Three',
      description: 'Premium experience and quality',
      icon: 'service-icon-3',
      features: ['Premium 1', 'Premium 2', 'Premium 3']
    }
  ];
  
  res.json({ success: true, data: services });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
