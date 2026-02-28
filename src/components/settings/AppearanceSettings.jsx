"use client";

import React, { useState } from 'react';
import { Palette, Monitor, Sun, Moon, Type, Layout, Eye } from 'lucide-react';

const AppearanceSettings = ({ appearance, onUpdate }) => {
  const [formData, setFormData] = useState(appearance);

  const handleThemeChange = (theme) => {
    setFormData(prev => ({ ...prev, theme }));
  };

  const handleColorSchemeChange = (colorScheme) => {
    setFormData(prev => ({ ...prev, colorScheme }));
  };

  const handleFontSizeChange = (fontSize) => {
    setFormData(prev => ({ ...prev, fontSize }));
  };

  const handleToggle = (setting) => {
    setFormData(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  const colorSchemes = [
    { id: 'indigo', label: 'Indigo', color: 'bg-indigo-600' },
    { id: 'blue', label: 'Blue', color: 'bg-blue-600' },
    { id: 'purple', label: 'Purple', color: 'bg-purple-600' },
    { id: 'green', label: 'Green', color: 'bg-green-600' },
    { id: 'red', label: 'Red', color: 'bg-red-600' },
    { id: 'orange', label: 'Orange', color: 'bg-orange-600' }
  ];

  const fontSizeOptions = [
    { id: 'small', label: 'Small', scale: '0.875rem' },
    { id: 'medium', label: 'Medium', scale: '1rem' },
    { id: 'large', label: 'Large', scale: '1.125rem' }
  ];

  const layoutOptions = [
    { id: 'default', label: 'Default', description: 'Standard layout with cards' },
    { id: 'compact', label: 'Compact', description: 'More content, less spacing' },
    { id: 'detailed', label: 'Detailed', description: 'Expanded views with more information' }
  ];

  const cardStyleOptions = [
    { id: 'rounded', label: 'Rounded', description: 'Soft, modern look' },
    { id: 'flat', label: 'Flat', description: 'Clean, minimal design' },
    { id: 'minimal', label: 'Minimal', description: 'Simple, borderless design' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
        <p className="text-sm text-gray-500">Customize how Planwise looks and feels</p>
      </div>

      {/* Theme Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleThemeChange(option.id)}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.theme === option.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  formData.theme === option.id ? 'text-indigo-600' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  formData.theme === option.id ? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Accent Color</h3>
        <div className="flex flex-wrap gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => handleColorSchemeChange(scheme.id)}
              className={`w-10 h-10 rounded-full ${scheme.color} ${
                formData.colorScheme === scheme.id ? 'ring-4 ring-offset-2 ring-indigo-300' : ''
              }`}
              title={scheme.label}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Font Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {fontSizeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleFontSizeChange(option.id)}
              className={`p-4 border-2 rounded-lg transition-all ${
                formData.fontSize === option.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Type className={`w-5 h-5 mx-auto mb-2 ${
                formData.fontSize === option.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                formData.fontSize === option.id ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                {option.label}
              </span>
              <p className="text-xs text-gray-400 mt-1">{option.scale}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Layout Preferences</h3>
        <div className="space-y-3">
          {layoutOptions.map((option) => (
            <label key={option.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="dashboardLayout"
                value={option.id}
                checked={formData.dashboardLayout === option.id}
                onChange={(e) => setFormData(prev => ({ ...prev, dashboardLayout: e.target.value }))}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Card Style */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Card Style</h3>
        <div className="grid grid-cols-3 gap-3">
          {cardStyleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFormData(prev => ({ ...prev, cardStyle: option.id }))}
              className={`p-4 border-2 rounded-lg transition-all ${
                formData.cardStyle === option.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Layout className={`w-5 h-5 mx-auto mb-2 ${
                formData.cardStyle === option.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                formData.cardStyle === option.id ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                {option.label}
              </span>
              <p className="text-xs text-gray-400 mt-1">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Accessibility</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Compact Mode</span>
              <p className="text-xs text-gray-500">Reduce spacing to show more content</p>
            </div>
            <button
              onClick={() => handleToggle('compactMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.compactMode ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.compactMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Reduced Motion</span>
              <p className="text-xs text-gray-500">Minimize animations throughout the app</p>
            </div>
            <button
              onClick={() => handleToggle('reducedMotion')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.reducedMotion ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">High Contrast</span>
              <p className="text-xs text-gray-500">Increase contrast for better readability</p>
            </div>
            <button
              onClick={() => handleToggle('highContrast')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.highContrast ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Animations</span>
              <p className="text-xs text-gray-500">Enable UI animations and transitions</p>
            </div>
            <button
              onClick={() => handleToggle('animations')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.animations ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.animations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Eye className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-medium text-indigo-900">Preview</h3>
        </div>
        <p className="text-sm text-indigo-700">
          Your changes will be applied immediately. Try different combinations to find what works best for you.
        </p>
      </div>
    </div>
  );
};

export default AppearanceSettings;