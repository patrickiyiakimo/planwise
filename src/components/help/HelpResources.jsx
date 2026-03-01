"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

const HelpResources = ({ resources }) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Additional Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.id}
              href={resource.href}
              className="group bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HelpResources;