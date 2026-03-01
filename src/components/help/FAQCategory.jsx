"use client";

import React from 'react';
import FAQItem from './FAQItem';

const FAQCategory = ({ category, expandedFAQs, onToggleFAQ }) => {
  if (!category) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <category.icon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
          <span className="ml-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
            {category.faqs.length} articles
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {category.faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isExpanded={expandedFAQs[faq.id]}
            onToggle={() => onToggleFAQ(faq.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQCategory;