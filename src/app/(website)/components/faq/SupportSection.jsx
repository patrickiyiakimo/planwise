"use client";

import React from 'react';
import { MessageCircle, Mail, Phone, Clock, Zap } from 'lucide-react';

const SupportSection = ({ support, onContactOption }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Side - Support Options */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {support.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {support.description}
              </p>
            </div>

            {/* Support Options */}
            <div className="space-y-4">
              {support.options.map((option, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                        {option.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {option.type}
                        </h3>
                        {option.badge && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full">
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{option.description}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {option.availability}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onContactOption(option)}
                      className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      {option.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Badge */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 p-4 rounded-lg">
              <Zap className="w-5 h-5 text-indigo-600" />
              <span>Average first response time: &lt; 2 hours</span>
            </div>
          </div>

          {/* Right Side - Support Image */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-2xl opacity-60"></div>
            
            {/* Image Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src={support.image.src}
                alt={support.image.alt}
                className="w-full h-auto opacity-90 transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent"></div>
              
              {/* Floating Support Stats */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">95%</div>
                    <div className="text-xs text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full shadow-lg p-3">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-gray-900">Live Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;