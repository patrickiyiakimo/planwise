"use client";

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ faq, isExpanded, onToggle }) => {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left"
      >
        <span className="text-sm font-medium text-gray-900 pr-8">
          {faq.question}
        </span>
        <span className="flex-shrink-0 ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-indigo-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 pr-8">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
          <div className="mt-3 flex items-center space-x-3">
            <button className="text-xs text-indigo-600 hover:text-indigo-700">
              Was this helpful? Yes
            </button>
            <span className="text-xs text-gray-300">•</span>
            <button className="text-xs text-gray-500 hover:text-gray-700">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;