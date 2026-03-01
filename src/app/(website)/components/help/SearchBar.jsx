"use client";

import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearch }) => {
  return (
    <div className="relative max-w-2xl mx-auto -mt-6">
      <div className="absolute inset-0 bg-white rounded-xl shadow-lg transform -translate-y-1/2"></div>
      <div className="relative bg-white rounded-xl shadow-lg p-1">
        <div className="flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, and guides..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;