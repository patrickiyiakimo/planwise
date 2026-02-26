"use client";

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const About = ({ isVisible, content }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <div className={`
            transition-all duration-1000 transform
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}
          `}>
            <div className="relative group">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={content.image.src}
                  alt={content.image.alt}
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/800x600?text=Students+Collaborating';
                  }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 max-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Trusted By</div>
                      <div className="text-xs text-gray-600">5,000+ Students</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className={`
            transition-all duration-1000 delay-300 transform
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
          `}>
            {/* Subtitle */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-blue-700">
                {content.subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.mission}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Learn More About Our Story
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;