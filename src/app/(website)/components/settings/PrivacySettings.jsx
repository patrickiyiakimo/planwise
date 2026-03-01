"use client";

import React, { useState } from 'react';
import { Eye, Users, Globe, Lock, Search, Activity } from 'lucide-react';

const PrivacySettings = ({ privacy, onUpdate }) => {
  const [formData, setFormData] = useState(privacy);

  const handleToggle = (category, setting) => {
    if (typeof setting === 'string') {
      // For nested objects like dataSharing
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: !prev[category][setting]
        }
      }));
    } else {
      // For top-level boolean settings
      setFormData(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see' },
    { value: 'students', label: 'Students Only', description: 'Only verified students' },
    { value: 'private', label: 'Private', description: 'Only you' }
  ];

  const activityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your activity' },
    { value: 'friends', label: 'Friends Only', description: 'Only your study groups' },
    { value: 'private', label: 'Private', description: 'Only you' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
        <p className="text-sm text-gray-500">Control your privacy and data sharing preferences</p>
      </div>

      {/* Profile Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Profile Visibility</h3>
        <div className="space-y-3">
          {visibilityOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={formData.profileVisibility === option.value}
                onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
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

      {/* Activity Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Activity Visibility</h3>
        <div className="space-y-3">
          {activityOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="showActivity"
                value={option.value}
                checked={formData.showActivity === option.value}
                onChange={(e) => handleSelectChange('showActivity', e.target.value)}
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

      {/* Contact Information Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Email</span>
              <p className="text-xs text-gray-500">Display your email on your profile</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showEmail')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showEmail ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showEmail ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Phone</span>
              <p className="text-xs text-gray-500">Display your phone number on your profile</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showPhone')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showPhone ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showPhone ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Academic Information Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Academic Information</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Student ID</span>
              <p className="text-xs text-gray-500">Display your student ID on your profile</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showStudentId')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showStudentId ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showStudentId ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Courses</span>
              <p className="text-xs text-gray-500">Display your enrolled courses</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showCourses')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showCourses ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showCourses ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Study Groups</span>
              <p className="text-xs text-gray-500">Display your study group memberships</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showStudyGroups')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showStudyGroups ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showStudyGroups ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Online Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Online Status</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Online Status</span>
              <p className="text-xs text-gray-500">Let others see when you're active</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showOnlineStatus')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showOnlineStatus ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Show Last Active</span>
              <p className="text-xs text-gray-500">Display when you were last active</p>
            </div>
            <button
              onClick={() => handleToggle(null, 'showLastActive')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.showLastActive ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.showLastActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Search Visibility */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Search Visibility</h3>
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="text-sm font-medium text-gray-700">Allow in Search</span>
            <p className="text-xs text-gray-500">Let others find you in search results</p>
          </div>
          <button
            onClick={() => handleToggle(null, 'searchable')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.searchable ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.searchable ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Data Sharing */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Data Sharing</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Analytics</span>
              <p className="text-xs text-gray-500">Help us improve by sharing usage data</p>
            </div>
            <button
              onClick={() => handleToggle('dataSharing', 'analytics')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.dataSharing.analytics ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.dataSharing.analytics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Personalized Recommendations</span>
              <p className="text-xs text-gray-500">Get better recommendations based on your activity</p>
            </div>
            <button
              onClick={() => handleToggle('dataSharing', 'personalizedRecommendations')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.dataSharing.personalizedRecommendations ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.dataSharing.personalizedRecommendations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Research Participation</span>
              <p className="text-xs text-gray-500">Allow your data to be used in academic research</p>
            </div>
            <button
              onClick={() => handleToggle('dataSharing', 'researchParticipation')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.dataSharing.researchParticipation ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.dataSharing.researchParticipation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;