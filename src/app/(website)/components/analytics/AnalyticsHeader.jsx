"use client";

import React from 'react';
import { Calendar, Download, RefreshCw, Filter, TrendingUp } from 'lucide-react';
import DateRangePicker from './DateRangePicker';

const AnalyticsHeader = ({ dateRange, onDateRangeChange, onRefresh, onExport }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <span className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                LIVE
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Track your academic performance and study habits
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Date Range Picker */}
            <DateRangePicker
              dateRange={dateRange}
              onChange={onDateRangeChange}
            />

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Export Button */}
            <button
              onClick={() => onExport('pdf')}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;