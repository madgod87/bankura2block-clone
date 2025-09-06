import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Certificate Services',
      description: 'Income, Caste, Residence certificates and more',
      icon: '📄',
      color: 'from-primary-500 to-primary-600',
      features: ['Income Certificate', 'Caste Certificate', 'Residence Certificate', 'Birth Certificate'],
    },
    {
      id: 2,
      title: 'Land Records',
      description: 'Land ownership, mutation, and record services',
      icon: '🏞️',
      color: 'from-accent-500 to-accent-600',
      features: ['Land Mutation', 'Property Records', 'Survey Records', 'Revenue Records'],
    },
    {
      id: 3,
      title: 'Social Schemes',
      description: 'Government welfare schemes and benefits',
      icon: '🤝',
      color: 'from-secondary-500 to-secondary-600',
      features: ['MGNREGA', 'Pension Schemes', 'Housing Schemes', 'Education Support'],
    },
    {
      id: 4,
      title: 'Agriculture Support',
      description: 'Farmer assistance and agricultural services',
      icon: '🌾',
      color: 'from-green-500 to-green-600',
      features: ['Crop Insurance', 'Subsidies', 'Soil Testing', 'Agricultural Loans'],
    },
    {
      id: 5,
      title: 'Healthcare Services',
      description: 'Public health programs and medical support',
      icon: '🏥',
      color: 'from-red-500 to-red-600',
      features: ['Health Cards', 'Vaccination', 'Mother-Child Care', 'Medical Assistance'],
    },
    {
      id: 6,
      title: 'Digital Services',
      description: 'Online applications and digital governance',
      icon: '💻',
      color: 'from-purple-500 to-purple-600',
      features: ['Online Applications', 'Digital Payments', 'E-Services', 'Status Tracking'],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-display">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive government services to citizens of Bankura II Block.
            Access various schemes, certificates, and support services through our office.
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group card hover:scale-105 transform transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${service.color} p-4 rounded-t-xl -mx-6 -mt-6 mb-6`}>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="text-white text-right">
                    <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                    <p className="text-white/80 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-4">
                <div className="text-gray-600 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Available Services:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button className={`w-full bg-gradient-to-r ${service.color} text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="card max-w-4xl mx-auto gradient-bg text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 font-display">
                Need Assistance?
              </h3>
              <p className="text-xl mb-8 text-white/90">
                Our team is here to help you with all government services and procedures.
                Visit our office or contact us for personalized support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
                  Visit Office
                </button>
                <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all transform hover:scale-105">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
