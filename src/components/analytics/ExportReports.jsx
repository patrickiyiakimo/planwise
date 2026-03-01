"use client";

import React, { useState } from 'react';
import { Download, FileText, FileJson, FileSpreadsheet, Calendar, ChevronDown } from 'lucide-react';

const ExportReports = ({ onExport }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const formats = [
    { id: 'pdf', label: 'PDF Report', icon: FileText, description: 'Comprehensive report with charts' },
    { id: 'csv', label: 'CSV Data', icon: FileSpreadsheet, description: 'Raw data for spreadsheets' },
    { id: 'json', label: 'JSON Export', icon: FileJson, description: 'Machine-readable format' }
  ];

  const periods = [
    { id: 'week', label: 'Last 7 days' },
    { id: 'month', label: 'Last 30 days' },
    { id: 'semester', label: 'This semester' },
    { id: 'year', label: 'This academic year' },
    { id: 'all', label: 'All time' }
  ];

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleExport = () => {
    onExport(selectedFormat, selectedPeriod);
    setShowOptions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>

      {/* Quick Export Buttons */}
      <div className="space-y-3 mb-4">
        <button
          onClick={() => onExport('pdf', 'month')}
          className="w-full p-4 bg-indigo-50 text-left rounded-lg hover:bg-indigo-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-medium text-gray-900">Monthly Progress Report</p>
                <p className="text-xs text-gray-500">Complete overview of last 30 days</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        <button
          onClick={() => onExport('csv', 'semester')}
          className="w-full p-4 bg-green-50 text-left rounded-lg hover:bg-green-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Semester Grade Data</p>
                <p className="text-xs text-gray-500">All grades and assignments</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>

      {/* Custom Export */}
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Custom Export</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
        </button>

        {showOptions && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Export Options</h4>

            {/* Format Selection */}
            <div className="space-y-2 mb-4">
              <label className="block text-xs text-gray-500 mb-1">Format</label>
              {formats.map((format) => {
                const Icon = format.icon;
                return (
                  <label
                    key={format.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedFormat === format.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.id}
                      checked={selectedFormat === format.id}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="sr-only"
                    />
                    <Icon className={`w-4 h-4 mr-3 ${
                      selectedFormat === format.id ? 'text-indigo-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium ${
                        selectedFormat === format.id ? 'text-indigo-600' : 'text-gray-700'
                      }`}>
                        {format.label}
                      </p>
                      <p className="text-xs text-gray-500">{format.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Period Selection */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>{period.label}</option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors"
            >
              Generate Report
            </button>
          </div>
        )}
      </div>

      {/* Last Export Info */}
      <p className="text-xs text-gray-400 text-center mt-4">
        Last exported: March 20, 2024
      </p>
    </div>
  );
};

export default ExportReports;