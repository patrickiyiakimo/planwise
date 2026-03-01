"use client";

import React from 'react';
import { CheckCircle, Users, BookOpen, Award } from 'lucide-react';

const SignupImage = ({ imageData }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={imageData.src}
        alt={imageData.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-blue-900/80 to-purple-900/90 mix-blend-multiply"></div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-white p-12">
        {/* Main Heading */}
        <h2 className="text-4xl font-bold mb-6 text-center">
          Join the Planwise Community
        </h2>
        
        {/* Description */}
        <p className="text-lg text-center mb-12 text-indigo-100 max-w-md">
          Thousands of students are already planning smarter and achieving more with Planwise.
        </p>

        {/* Feature List */}
        <div className="space-y-6 max-w-sm">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Smart Planning</h3>
              <p className="text-indigo-200 text-sm">Organize your academic life effortlessly</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Collaborative Learning</h3>
              <p className="text-indigo-200 text-sm">Study together with classmates</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI-Powered Tools</h3>
              <p className="text-indigo-200 text-sm">Get smart PDF summaries and recommendations</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Better Grades</h3>
              <p className="text-indigo-200 text-sm">94% of users report improved performance</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 flex space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold">5k+</div>
            <div className="text-sm text-indigo-200">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.8</div>
            <div className="text-sm text-indigo-200">App Store Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm text-indigo-200">Universities</div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default SignupImage;