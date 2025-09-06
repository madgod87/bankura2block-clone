import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding authentication tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response?.status === 401) {
      // Unauthorized - maybe redirect to login
      localStorage.removeItem('auth_token');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Health check
  health: () => api.get('/api/health'),
  
  // Services
  getServices: () => api.get('/api/services'),
  
  // News/Updates
  getNews: () => api.get('/api/news'),
  
  // Contact form
  submitContact: (data: ContactFormData) => api.post('/api/contact', data),
  
  // Generic GET request
  get: (url: string) => api.get(url),
  
  // Generic POST request
  post: (url: string, data: any) => api.post(url, data),
};

// Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  features: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
}

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Success message utility
export const handleApiSuccess = (response: any): string => {
  if (response.data?.message) {
    return response.data.message;
  }
  return 'Operation completed successfully';
};

export default api;
