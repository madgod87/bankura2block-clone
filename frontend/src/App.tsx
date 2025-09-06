import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminRegister from './components/AdminRegister';
import NotificationsPage from './components/NotificationsPage';
import AdminDashboard from './components/AdminDashboard';
import ImageGallery from './components/ImageGallery';
import BlockProfile from './components/BlockProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <ContactForm />
              </>
            } />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/gallery" element={<ImageGallery />} />
            <Route path="/block-profile" element={<BlockProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
