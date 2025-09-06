import React, { useState } from 'react';

const BlockProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Block statistics
  const blockStats = [
    { label: 'Total Area', value: '420.5 km²', icon: '🗺️', color: 'primary' },
    { label: 'Population', value: '2.8 Lakh', icon: '👥', color: 'accent' },
    { label: 'Gram Panchayats', value: '15', icon: '🏛️', color: 'secondary' },
    { label: 'Villages', value: '185', icon: '🏘️', color: 'primary' },
    { label: 'Assembly Constituencies', value: '4', icon: '🗳️', color: 'accent' },
    { label: 'Schools', value: '120+', icon: '🏫', color: 'secondary' },
    { label: 'Health Centers', value: '25', icon: '🏥', color: 'primary' },
    { label: 'Banks', value: '35', icon: '🏦', color: 'accent' },
  ];

  // Gram Panchayats
  const gramPanchayats = [
    { name: 'Bhimpur', area: '28.5 km²', population: '18,500', villages: 12 },
    { name: 'Asannagar', area: '32.2 km²', population: '22,300', villages: 14 },
    { name: 'Chakdignagar', area: '25.8 km²', population: '16,800', villages: 11 },
    { name: 'Dignagar', area: '29.7 km²', population: '19,200', villages: 13 },
    { name: 'Bhaluka', area: '31.3 km²', population: '20,100', villages: 15 },
    { name: 'Joania', area: '26.9 km²', population: '17,400', villages: 12 },
    { name: 'Dogachhi', area: '27.6 km²', population: '18,900', villages: 13 },
    { name: 'Bhatjungla', area: '33.1 km²', population: '21,800', villages: 16 },
    { name: 'Shibnibas', area: '24.7 km²', population: '15,600', villages: 10 },
    { name: 'Karimpur-I', area: '30.4 km²', population: '19,800', villages: 14 },
    { name: 'Karimpur-II', area: '28.9 km²', population: '18,200', villages: 12 },
    { name: 'Tehatta-I', area: '35.2 km²', population: '23,100', villages: 17 },
    { name: 'Tehatta-II', area: '32.8 km²', population: '21,400', villages: 15 },
    { name: 'Krishnagar-I', area: '29.5 km²', population: '19,600', villages: 13 },
    { name: 'Krishnagar-II', area: '26.1 km²', population: '17,100', villages: 11 },
  ];

  // Key officials
  const officials = [
    {
      name: 'Shri Rajesh Kumar',
      designation: 'Block Development Officer (BDO)',
      phone: '9733374108',
      email: 'bdo.krishnagar1@gmail.com',
      photo: '/officials/bdo.jpg',
      responsibilities: ['Overall administration', 'Development planning', 'Scheme implementation', 'Public grievances']
    },
    {
      name: 'Mrs. Priya Sharma',
      designation: 'Assistant Block Development Officer',
      phone: '9733374109',
      email: 'abdo.krishnagar1@gmail.com',
      photo: '/officials/abdo.jpg',
      responsibilities: ['Rural development', 'Women empowerment', 'Health programs', 'Education initiatives']
    },
    {
      name: 'Dr. Amit Ghosh',
      designation: 'Block Medical Officer (Health)',
      phone: '9733374110',
      email: 'bmoh.krishnagar1@gmail.com',
      photo: '/officials/bmoh.jpg',
      responsibilities: ['Public health', 'Medical services', 'Health awareness', 'Disease prevention']
    }
  ];

  // Major schemes
  const schemes = [
    {
      name: 'Pradhan Mantri Awas Yojana',
      category: 'Housing',
      beneficiaries: '2,450',
      status: 'Active',
      description: 'Providing pucca houses to rural families'
    },
    {
      name: 'MGNREGA',
      category: 'Employment',
      beneficiaries: '15,200',
      status: 'Active',
      description: 'Guaranteed employment in rural areas'
    },
    {
      name: 'PM-KISAN',
      category: 'Agriculture',
      beneficiaries: '8,750',
      status: 'Active',
      description: 'Direct income support to farmers'
    },
    {
      name: 'Swachh Bharat Mission',
      category: 'Sanitation',
      beneficiaries: '12,300',
      status: 'Active',
      description: 'Clean India initiative'
    },
    {
      name: 'Pradhan Mantri Ujjwala Yojana',
      category: 'Energy',
      beneficiaries: '6,890',
      status: 'Active',
      description: 'LPG connections to BPL families'
    },
    {
      name: 'Digital India',
      category: 'Technology',
      beneficiaries: '25,000+',
      status: 'Active',
      description: 'Digital literacy and e-governance'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏛️' },
    { id: 'panchayats', label: 'Gram Panchayats', icon: '🏘️' },
    { id: 'officials', label: 'Key Officials', icon: '👨‍💼' },
    { id: 'schemes', label: 'Schemes', icon: '📋' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4 font-display">
            🏛️ Block Profile
          </h1>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Comprehensive information about Krishnagar-I Development Block, its administration, 
            services, and development initiatives in Nadia District, West Bengal
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {blockStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
              <div className={`text-sm text-${stat.color}-500`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-primary-600 bg-primary-50 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Block Overview</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">About Krishnagar-I Block</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Krishnagar-I Development Block is one of the prominent administrative blocks in Nadia District, 
                    West Bengal. Established as part of the state's decentralized governance structure, it serves 
                    as a crucial link between the state government and rural communities.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The block is strategically located in the heart of Nadia district and plays a vital role in 
                    implementing various developmental schemes and programs. It encompasses diverse geographical 
                    features including fertile agricultural lands, water bodies, and growing urban centers.
                  </p>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-800 mb-2">Key Features:</h4>
                    <ul className="text-primary-700 space-y-1">
                      <li>• Rich agricultural heritage</li>
                      <li>• Strategic connectivity to Kolkata</li>
                      <li>• Cultural and educational hub</li>
                      <li>• Diverse economic activities</li>
                      <li>• Strong community participation</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">Administrative Structure</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary-500 pl-4">
                      <h4 className="font-semibold text-primary-800">Block Level</h4>
                      <p className="text-gray-600">Krishnagar-I Development Block Office</p>
                    </div>
                    <div className="border-l-4 border-accent-500 pl-4">
                      <h4 className="font-semibold text-accent-800">Panchayat Level</h4>
                      <p className="text-gray-600">15 Gram Panchayats</p>
                    </div>
                    <div className="border-l-4 border-secondary-500 pl-4">
                      <h4 className="font-semibold text-secondary-800">Village Level</h4>
                      <p className="text-gray-600">185 Villages</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary-700 mb-4 mt-8">Development Focus Areas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Agriculture', 'Education', 'Healthcare', 'Infrastructure', 'Employment', 'Environment'].map((area) => (
                      <div key={area} className="bg-accent-50 rounded-lg p-3 text-center">
                        <div className="text-accent-700 font-medium">{area}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gram Panchayats Tab */}
          {activeTab === 'panchayats' && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Gram Panchayats</h2>
              <p className="text-gray-600 mb-6">
                Krishnagar-I Block consists of 15 Gram Panchayats covering 185 villages across 420.5 km² area.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gramPanchayats.map((gp, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-primary-50 transition-colors duration-200">
                    <h3 className="font-semibold text-primary-800 text-lg mb-2">{gp.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="font-medium">{gp.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Population:</span>
                        <span className="font-medium">{gp.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Villages:</span>
                        <span className="font-medium">{gp.villages}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Officials Tab */}
          {activeTab === 'officials' && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Key Officials</h2>
              <div className="space-y-6">
                {officials.map((official, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="text-3xl text-primary-600">👨‍💼</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary-800">{official.name}</h3>
                        <p className="text-accent-600 font-medium mb-2">{official.designation}</p>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">📞 Phone</p>
                            <p className="font-medium">{official.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">📧 Email</p>
                            <p className="font-medium">{official.email}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Key Responsibilities:</p>
                          <div className="flex flex-wrap gap-2">
                            {official.responsibilities.map((resp, idx) => (
                              <span key={idx} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                                {resp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schemes Tab */}
          {activeTab === 'schemes' && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Major Government Schemes</h2>
              <p className="text-gray-600 mb-6">
                Various central and state government schemes are being implemented for the welfare and development of citizens.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {schemes.map((scheme, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-primary-800 text-lg">{scheme.name}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {scheme.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{scheme.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">Category:</span>
                        <span className="ml-2 bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                          {scheme.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Beneficiaries:</span>
                        <span className="ml-2 font-semibold text-accent-600">{scheme.beneficiaries}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">Block Office</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <p className="font-medium text-primary-800">Address</p>
                        <p className="text-gray-600">
                          Krishnagar-I Development Block Office<br />
                          Nadia District, West Bengal - 741101
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <p className="font-medium text-primary-800">Phone</p>
                        <p className="text-gray-600">9733374108</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        📧
                      </div>
                      <div>
                        <p className="font-medium text-primary-800">Email</p>
                        <p className="text-gray-600">bdo.krishnagar1@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        🕒
                      </div>
                      <div>
                        <p className="font-medium text-primary-800">Office Hours</p>
                        <p className="text-gray-600">
                          Monday - Friday: 10:30 AM - 5:30 PM<br />
                          Saturday & Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-4">Important Links</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'West Bengal Government', url: 'https://wb.gov.in' },
                      { name: 'Nadia District Magistrate', url: 'https://nadia.gov.in' },
                      { name: 'Digital India', url: 'https://digitalindia.gov.in' },
                      { name: 'MyGov', url: 'https://mygov.in' },
                      { name: 'RTI Portal', url: 'https://rtionline.gov.in' },
                      { name: 'PM-KISAN', url: 'https://pmkisan.gov.in' }
                    ].map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary-700">{link.name}</span>
                          <span className="text-primary-500">→</span>
                        </div>
                      </a>
                    ))}
                  </div>
                  
                  <div className="mt-8 bg-accent-50 rounded-lg p-6">
                    <h4 className="font-semibold text-accent-800 mb-2">🌐 Social Media</h4>
                    <p className="text-accent-700 mb-2">Follow us on X (Twitter) for updates:</p>
                    <a
                      href="https://x.com/Krishnagarbdo1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-accent-600 hover:text-accent-700"
                    >
                      <span>🐦</span>
                      <span>@Krishnagarbdo1</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlockProfile;
