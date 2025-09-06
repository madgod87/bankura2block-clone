const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
