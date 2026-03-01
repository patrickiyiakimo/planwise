"use client";

import React, { useState } from 'react';
import { AlertTriangle, Download, Trash2, Archive, UserX } from 'lucide-react';

const DangerZone = ({ onDeleteAccount, onExportData }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      onDeleteAccount();
      setShowDeleteConfirm(false);
    }
  };

  const handleExportData = (format) => {
    onExportData(format);
    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Danger Zone</h2>
        <p className="text-sm text-gray-500">Actions that can't be undone. Proceed with caution.</p>
      </div>

      {/* Export Data */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Export Your Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download a copy of all your data including courses, assignments, summaries, and settings.
            </p>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Archive Account */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Archive Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Temporarily disable your account. Your data will be preserved and you can reactivate at any time.
            </p>
          </div>
          <button className="px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center">
            <Archive className="w-4 h-4 mr-2" />
            Archive Account
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Your Data</h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose the format for your data export. This may take a few moments to prepare.
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleExportData('json')}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">JSON Format</p>
                  <p className="text-sm text-gray-500">Machine-readable format, good for developers</p>
                </button>
                <button
                  onClick={() => handleExportData('csv')}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">CSV Format</p>
                  <p className="text-sm text-gray-500">Spreadsheet-compatible format</p>
                </button>
                <button
                  onClick={() => handleExportData('pdf')}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">PDF Report</p>
                  <p className="text-sm text-gray-500">Human-readable report with summaries</p>
                </button>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  This action is permanent and cannot be undone. All your data will be permanently deleted.
                </p>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-700 mb-2">This includes:</p>
                  <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                    <li>Your profile and personal information</li>
                    <li>All courses and assignments</li>
                    <li>All PDF summaries and study materials</li>
                    <li>Study groups and messages</li>
                    <li>Subscription and billing history</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type "DELETE" to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="DELETE"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Permanently Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;