"use client";

import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Clock } from 'lucide-react';

const NotificationSettings = ({ notifications, onUpdate }) => {
  const [formData, setFormData] = useState(notifications);

  const handleToggle = (channel, setting) => {
    setFormData(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: !prev[channel][setting]
      }
    }));
  };

  const handleFrequencyChange = (e) => {
    setFormData(prev => ({
      ...prev,
      frequency: e.target.value
    }));
  };

  const handleQuietHoursToggle = () => {
    setFormData(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled: !prev.quietHours.enabled
      }
    }));
  };

  const handleQuietHoursChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value
      }
    }));
  };

  const notificationCategories = [
    {
      id: 'assignmentReminders',
      label: 'Assignment Reminders',
      description: 'Get notified before assignments are due'
    },
    {
      id: 'examReminders',
      label: 'Exam Reminders',
      description: 'Receive reminders about upcoming exams'
    },
    {
      id: 'studyGroupInvites',
      label: 'Study Group Invites',
      description: 'Be notified when someone invites you to a study group'
    },
    {
      id: 'courseAnnouncements',
      label: 'Course Announcements',
      description: 'Get updates and announcements from your courses'
    },
    {
      id: 'gradeUpdates',
      label: 'Grade Updates',
      description: 'Be notified when new grades are posted'
    },
    {
      id: 'studyReminders',
      label: 'Study Reminders',
      description: 'Receive reminders for scheduled study sessions'
    },
    {
      id: 'deadlineAlerts',
      label: 'Deadline Alerts',
      description: 'Get alerts for approaching deadlines'
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Notifications for new messages'
    },
    {
      id: 'systemAlerts',
      label: 'System Alerts',
      description: 'Important updates about the platform'
    }
  ];

  const frequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'daily', label: 'Daily digest' },
    { value: 'weekly', label: 'Weekly digest' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-sm text-gray-500">Choose how and when you want to be notified</p>
      </div>

      {/* Notification Frequency */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Frequency</h3>
        <div className="space-y-3">
          {frequencyOptions.map(option => (
            <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={formData.frequency === option.value}
                onChange={handleFrequencyChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Channels</h3>
        
        {/* Email Notifications */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-700">Email Notifications</h4>
          </div>
          <div className="space-y-3">
            {notificationCategories.map(category => (
              <label key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">{category.label}</span>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </div>
                <button
                  onClick={() => handleToggle('email', category.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.email[category.id] ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.email[category.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Smartphone className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-700">Push Notifications</h4>
          </div>
          <div className="space-y-3">
            {notificationCategories.slice(0, 7).map(category => (
              <label key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">{category.label}</span>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </div>
                <button
                  onClick={() => handleToggle('push', category.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.push[category.id] ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.push[category.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Bell className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-700">In-App Notifications</h4>
          </div>
          <div className="space-y-3">
            {notificationCategories.map(category => (
              <label key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">{category.label}</span>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </div>
                <button
                  onClick={() => handleToggle('inApp', category.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.inApp[category.id] ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.inApp[category.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Quiet Hours</h3>
        
        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Enable Quiet Hours</span>
            <p className="text-xs text-gray-500">Mute notifications during specific hours</p>
          </div>
          <button
            onClick={handleQuietHoursToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.quietHours.enabled ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>

        {formData.quietHours.enabled && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.quietHours.start}
                  onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={formData.quietHours.end}
                  onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;