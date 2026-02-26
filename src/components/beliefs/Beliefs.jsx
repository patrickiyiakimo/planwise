"use client";

import React from 'react';
import { Quote } from 'lucide-react';

const Beliefs = ({ isVisible, beliefsData }) => {
  return (
    <section id="beliefs" className="py-20 lg:py-28 bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className={`
          text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          {/* Subtitle Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-indigo-100 mb-6">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium text-indigo-700">
              {beliefsData.subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {beliefsData.title}
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            {beliefsData.description}
          </p>
        </div>

        {/* Beliefs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {beliefsData.beliefs.map((belief, index) => (
            <div
              key={belief.id}
              className={`
                group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {belief.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {belief.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {belief.description}
              </p>

              {/* Decorative Line */}
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full mt-6 transform group-hover:w-20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Inspirational Quote Section */}
        <div className={`
          relative max-w-4xl mx-auto transition-all duration-1000 delay-700 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 rounded-3xl"></div>
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-200 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-40"></div>
          </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute left-0 right-0 bottom-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L48 73.3C96 66.7 192 53.3 288 48C384 42.7 480 45.3 576 53.3C672 61.3 768 74.7 864 77.3C960 80 1056 72 1152 64C1248 56 1344 48 1392 44L1440 40V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="white" fillOpacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Beliefs;