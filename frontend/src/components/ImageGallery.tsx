import React, { useState } from 'react';

interface Image {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Gallery images from the slideshow with organized categories
  const images: Image[] = [
    {
      id: 1,
      src: '/slideshow/slide1.jpg',
      title: 'Welcome to Krishnagar-I Development Block',
      description: 'Serving the community of Nadia District with dedication and transparency',
      category: 'overview'
    },
    {
      id: 2,
      src: '/slideshow/slide2.jpg',
      title: 'Government Services',
      description: 'Access various government schemes and services online',
      category: 'services'
    },
    {
      id: 3,
      src: '/slideshow/slide3.jpg',
      title: 'Digital India Initiative',
      description: 'Empowering citizens through digital transformation',
      category: 'digital'
    },
    {
      id: 4,
      src: '/slideshow/slide4.jpg',
      title: 'Community Support',
      description: 'We are here to help you with all government services and procedures',
      category: 'community'
    },
    {
      id: 5,
      src: '/slideshow/slide5.jpg',
      title: 'Transparency & Efficiency',
      description: 'Committed to providing quality government services to all citizens',
      category: 'governance'
    },
    {
      id: 6,
      src: '/slideshow/slide6.jpg',
      title: 'Development Initiatives',
      description: 'Driving progress and development in Nadia District',
      category: 'development'
    },
    {
      id: 7,
      src: '/slideshow/slide7.jpg',
      title: 'Public Participation',
      description: 'Your voice matters in local governance',
      category: 'community'
    },
    {
      id: 8,
      src: '/slideshow/slide8.jpg',
      title: 'Inclusive Growth',
      description: 'Ensuring benefits reach every citizen',
      category: 'development'
    },
    {
      id: 9,
      src: '/slideshow/slide9.jpg',
      title: 'Modern Facilities',
      description: 'Upgrading infrastructure for a better tomorrow',
      category: 'infrastructure'
    },
    {
      id: 10,
      src: '/slideshow/slide10.jpg',
      title: 'Social Welfare',
      description: 'Supporting the vulnerable and underprivileged',
      category: 'welfare'
    },
    {
      id: 11,
      src: '/slideshow/slide11.jpg',
      title: 'Education for All',
      description: 'Promoting education and skill development',
      category: 'education'
    },
    {
      id: 12,
      src: '/slideshow/slide12.jpg',
      title: 'Clean & Green',
      description: 'Working towards a sustainable environment',
      category: 'environment'
    },
  ];

  const categories = [
    { key: 'all', label: 'All Images', icon: '🖼️' },
    { key: 'overview', label: 'Overview', icon: '🏛️' },
    { key: 'services', label: 'Services', icon: '📋' },
    { key: 'digital', label: 'Digital India', icon: '💻' },
    { key: 'community', label: 'Community', icon: '👥' },
    { key: 'governance', label: 'Governance', icon: '⚖️' },
    { key: 'development', label: 'Development', icon: '🚀' },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { key: 'welfare', label: 'Welfare', icon: '🤝' },
    { key: 'education', label: 'Education', icon: '📚' },
    { key: 'environment', label: 'Environment', icon: '🌱' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const openModal = (image: Image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4 font-display">
            📸 Image Gallery
          </h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Explore the visual journey of Krishnagar-I Development Block's initiatives, services, and community engagement
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-primary-600">{images.length}</div>
            <div className="text-sm text-primary-500">Total Images</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-accent-600">{categories.length - 1}</div>
            <div className="text-sm text-accent-500">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-secondary-500">100%</div>
            <div className="text-sm text-secondary-400">HD Quality</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-primary-600">2025</div>
            <div className="text-sm text-primary-500">Updated</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.key
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200 hover:transform hover:scale-105'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                <span className="bg-primary-500/20 text-primary-700 px-2 py-1 rounded-full text-xs">
                  {category.key === 'all' ? images.length : images.filter(img => img.category === category.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => openModal(image)}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{image.title}</h3>
                  <p className="text-xs text-gray-200 line-clamp-2">{image.description}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {categories.find(cat => cat.key === image.category)?.label}
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Image Number */}
              <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {index + 1} of {filteredImages.length}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{selectedImage.title}</h2>
                <p className="text-gray-200 text-sm">{selectedImage.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="ml-4 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Modal Footer */}
            <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-b-xl flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
                </span>
                <span className="text-sm bg-primary-600/50 px-2 py-1 rounded-full">
                  {categories.find(cat => cat.key === selectedImage.category)?.label}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateImage('prev')}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
