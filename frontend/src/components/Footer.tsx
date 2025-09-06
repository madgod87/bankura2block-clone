import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary-900 via-primary-800 to-accent-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Office Information */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B2</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display">Bankura II Block</h3>
                <p className="text-primary-200">District Administration Office</p>
              </div>
            </div>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Serving the community of Bankura II Block with transparency, efficiency, and dedication. 
              We are committed to providing quality government services to all citizens.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                  📍
                </div>
                <span className="text-primary-100">
                  Block Administrative Building, Bankura II, West Bengal - 722122
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                  📞
                </div>
                <span className="text-primary-100">+91-123-456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
                  📧
                </div>
                <span className="text-primary-100">info@bankura2block.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'Home',
                'Block Profile',
                'Services',
                'Image Gallery',
                'Important Links',
                'Contact Us',
                'Grievances',
                'RTI'
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary-200 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 font-display">Government Portals</h4>
            <ul className="space-y-3">
              {[
                'West Bengal Govt',
                'India.gov.in',
                'Digital India',
                'MyGov',
                'Aadhaar',
                'PM Kisan',
                'MGNREGA',
                'PDS'
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-primary-200 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-secondary-400 rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Office Hours & Social Media */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Office Hours */}
            <div>
              <h4 className="text-xl font-bold mb-4 font-display">Office Hours</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="card bg-primary-700/50">
                  <h5 className="font-semibold text-primary-100 mb-2">Weekdays</h5>
                  <p className="text-white">10:00 AM - 5:00 PM</p>
                  <p className="text-primary-200 text-xs mt-1">Monday to Friday</p>
                </div>
                <div className="card bg-primary-700/50">
                  <h5 className="font-semibold text-primary-100 mb-2">Saturday</h5>
                  <p className="text-white">10:00 AM - 2:00 PM</p>
                  <p className="text-primary-200 text-xs mt-1">Half Day</p>
                </div>
              </div>
              <p className="text-primary-200 text-xs mt-3">
                * Closed on Sundays and Government Holidays
              </p>
            </div>

            {/* Social Media & Newsletter */}
            <div className="text-center lg:text-right">
              <h4 className="text-xl font-bold mb-4 font-display">Stay Connected</h4>
              
              {/* Social Media Icons */}
              <div className="flex justify-center lg:justify-end space-x-4 mb-6">
                {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                  >
                    <span className="text-xl">{icon}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <p className="text-primary-200 text-sm mb-3">
                  Subscribe for updates and notifications
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-400"
                  />
                  <button className="bg-accent-500 hover:bg-accent-600 px-6 py-2 rounded-r-lg font-semibold transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary-900 py-6 border-t border-primary-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-primary-200 mb-4 md:mb-0">
              <p>
                © {currentYear} Bankura II Block Administration. All rights reserved.
              </p>
              <p className="text-xs mt-1">
                Developed as part of Digital India Initiative
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-primary-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">RTI</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
