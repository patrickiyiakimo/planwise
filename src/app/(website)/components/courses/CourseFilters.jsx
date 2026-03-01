"use client";

import React from 'react';
import { X } from 'lucide-react';

const CourseFilters = ({ filters, setFilters, semesters, instructors, onClose }) => {
  const statusOptions = ['all', 'in-progress', 'completed', 'planned'];
  const creditOptions = ['all', '1-2', '3-4', '5+'];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      semester: 'all',
      status: 'all',
      creditHours: 'all',
      instructor: 'all'
    });
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Filters</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Semester Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Semester</label>
          <select
            value={filters.semester}
            onChange={(e) => handleFilterChange('semester', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">All Semesters</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Statuses' : option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Credit Hours Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Credit Hours</label>
          <select
            value={filters.creditHours}
            onChange={(e) => handleFilterChange('creditHours', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {creditOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Credits' : `${option} Credits`}
              </option>
            ))}
          </select>
        </div>

        {/* Instructor Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Instructor</label>
          <select
            value={filters.instructor}
            onChange={(e) => handleFilterChange('instructor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="all">All Instructors</option>
            {instructors.map(instructor => (
              <option key={instructor} value={instructor}>{instructor}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;