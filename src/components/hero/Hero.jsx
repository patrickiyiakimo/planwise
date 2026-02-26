"use client";

import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const Hero = ({
  isVisible,
  stats,
  heroImage,
  onGetStarted,
  onWatchDemo
}) => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-20 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`
            transition-all duration-1000 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-gray-600">
                Trusted by 5,000+ students
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Plan Your Academic{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Success
                </span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full" 
                  height="12" 
                  viewBox="0 0 300 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M2 10C79.5 -1.99999 218.5 -2.00001 298 10" 
                    stroke="url(#gradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="2" y1="10" x2="298" y2="10" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6" />
                      <stop offset="1" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{' '}
              with Planwise
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Your intelligent companion for academic planning. Organize courses, track deadlines, 
              and get AI-powered PDF summaries to study smarter, not harder.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button
                onClick={onWatchDemo}
                className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center border border-gray-200"
              >
                <Play className="w-5 h-5 mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center lg:text-left">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className={`
            transition-all duration-1000 delay-300 transform
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}>
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-xl p-4 max-w-[200px] backdrop-blur-sm bg-white/90">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">PDF Summary</div>
                      <div className="text-xs text-gray-500">Ready in seconds</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Hero;