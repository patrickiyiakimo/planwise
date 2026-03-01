"use client";

import React from 'react';
import { HelpCircle } from 'lucide-react';

const HelpSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
      
      <div className="space-y-1">
        <button
          onClick={() => onCategorySelect('all')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            selectedCategory === 'all'
              ? 'bg-indigo-50 text-indigo-600 font-medium'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{category.title}</span>
              <span className="text-xs text-gray-400">{category.faqs.length}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-xs font-medium text-gray-500 mb-3">NEED MORE HELP?</h4>
        <button className="w-full px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpSidebar;