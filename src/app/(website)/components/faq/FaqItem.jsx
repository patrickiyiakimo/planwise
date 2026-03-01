"use client";

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => onToggle(item.id)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 pr-8">
          {item.question}
        </span>
        <span className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-indigo-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqItem;