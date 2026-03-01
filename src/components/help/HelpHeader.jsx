"use client";

import React from 'react';
import { HelpCircle } from 'lucide-react';

const HelpHeader = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-600">
      <div className="px-6 py-12 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white">Help Center</h1>
        </div>
        <p className="text-indigo-100 max-w-2xl mx-auto">
          Find answers to common questions, access resources, and get support from our team.
        </p>
      </div>
    </div>
  );
};

export default HelpHeader;