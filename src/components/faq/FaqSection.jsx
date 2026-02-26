"use client";

import React from 'react';
import { Search, HelpCircle } from 'lucide-react';
import FaqItem from './FaqItem';

const FaqSection = ({
  title,
  subtitle,
  description,
  categories,
  faqs,
  activeCategory,
  openItems,
  searchQuery,
  onCategoryChange,
  onToggleItem,
  onSearch
}) => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-indigo-700">
              {subtitle}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {searchQuery && Object.keys(faqs).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
              <button
                onClick={() => onSearch('')}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            Object.entries(faqs).map(([category, items]) => {
              if (searchQuery || category === activeCategory || activeCategory === 'all') {
                return items.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    isOpen={openItems[item.id]}
                    onToggle={onToggleItem}
                  />
                ));
              }
              return null;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;