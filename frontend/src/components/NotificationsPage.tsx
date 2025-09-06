import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../utils/api';

interface Notification {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'html' | 'none';
  createdAt: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiEndpoints.get('/api/notifications');
      console.log('Fetched notifications:', response.data.data);
      setNotifications(response.data.data);
    } catch (err: any) {
      setError('Failed to fetch notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openFile = (notification: Notification) => {
    if (notification.fileUrl) {
      // Extract filename from the fileUrl (e.g., '/uploads/09f6b2dce405c4e9c564cf5faf5f77a2' -> '09f6b2dce405c4e9c564cf5faf5f77a2')
      const filename = notification.fileUrl.split('/').pop();
      const viewUrl = `http://localhost:5000/view/${encodeURIComponent(filename!)}`;
      
      // Debug logging
      console.log('Opening file:', {
        title: notification.title,
        fileUrl: notification.fileUrl,
        filename: filename,
        viewUrl: viewUrl
      });
      
      window.open(viewUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-primary-600">Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            📢 Notifications
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements and important information from Krishnagar-I Block
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            <p>{error}</p>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Notifications Yet</h2>
            <p className="text-gray-500">Check back later for important updates and announcements.</p>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-primary-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary-800 mb-2">
                        {notification.title}
                      </h3>
                      <p className="text-primary-600 mb-3 leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                    
                    {notification.fileType !== 'none' && (
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => openFile(notification)}
                          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            notification.fileType === 'pdf'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {notification.fileType === 'pdf' ? (
                            <>
                              📄 View PDF
                            </>
                          ) : (
                            <>
                              🌐 View HTML
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📅</span>
                      <span>{formatDate(notification.createdAt)}</span>
                    </div>
                    
                    {notification.fileType !== 'none' && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-1">
                          {notification.fileType === 'pdf' ? '📄' : '🌐'}
                        </span>
                        <span className="capitalize">{notification.fileType} attachment</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual indicator for new notifications (less than 7 days old) */}
                {new Date().getTime() - new Date(notification.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                  <div className="bg-gradient-to-r from-accent-500 to-primary-500 text-white text-center py-2 text-sm font-medium">
                    ✨ New
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
