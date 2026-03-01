"use client";

import React, { useState } from 'react';
import {
  Key,
  Smartphone,
  Shield,
  AlertCircle,
  CheckCircle,
  Copy,
  Clock,
  Globe
} from 'lucide-react';

const SecuritySettings = ({ security, onUpdate, onChangePassword, onEnable2FA }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    onChangePassword(passwordData.currentPassword, passwordData.newPassword);
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(security.backupCodes.join('\n'));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        <p className="text-sm text-gray-500">Manage your account security and authentication</p>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Password</h3>
          <span className="text-xs text-gray-500">Last changed {formatDate(security.passwordLastChanged)}</span>
        </div>

        {!showPasswordForm ? (
          <button
            onClick={() => setShowPasswordForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
          {security.twoFactorEnabled ? (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Enabled
            </span>
          ) : (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              Disabled
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </p>

        {!security.twoFactorEnabled ? (
          <button
            onClick={() => setShow2FAModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Enable Two-Factor Authentication
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                Authentication method: <span className="font-medium">{security.twoFactorMethod}</span>
              </p>
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {showBackupCodes ? 'Hide' : 'Show'} Backup Codes
              </button>

              {showBackupCodes && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Save these codes somewhere safe</span>
                    <button
                      onClick={handleCopyBackupCodes}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {security.backupCodes.map((code, index) => (
                      <div key={index} className="font-mono text-sm bg-gray-100 p-2 rounded text-center">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="text-sm text-red-600 hover:text-red-700">
              Disable Two-Factor Authentication
            </button>
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          {security.loginHistory.map((login, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">{login.device}</p>
                  <span className="text-xs text-gray-500">{formatDate(login.date)}</span>
                </div>
                <p className="text-xs text-gray-500">{login.location} • IP: {login.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Devices */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Trusted Devices</h3>
        <div className="space-y-3">
          {security.trustedDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{device.name}</p>
                  <p className="text-xs text-gray-500">Last used {formatDate(device.lastUsed)}</p>
                </div>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Questions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Security Questions</h3>
        <div className="space-y-3">
          {security.securityQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">{question.question}</span>
              <span className="text-xs text-green-600">✓ Answered</span>
            </div>
          ))}
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Update Security Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;