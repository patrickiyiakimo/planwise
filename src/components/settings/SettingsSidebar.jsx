"use client";

import React from 'react';

const SettingsSidebar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium">{tab.label}</span>
              {tab.id === 'danger' && (
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Help Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Need help?</h4>
        <p className="text-xs text-gray-500 mb-3">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;