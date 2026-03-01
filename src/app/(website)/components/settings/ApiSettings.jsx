"use client";

import React, { useState } from 'react';
import {
  Key,
  Globe,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';

const ApiSettings = ({ api, onUpdate, onRegenerateKey }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [newWebhook, setNewWebhook] = useState({ url: '', events: [] });

  const handleToggleApi = () => {
    onUpdate({ ...api, enabled: !api.enabled });
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(api.apiKey);
  };

  const handleAddWebhook = () => {
    if (newWebhook.url) {
      const webhook = {
        id: `w${Date.now()}`,
        ...newWebhook,
        active: true
      };
      onUpdate({
        ...api,
        webhooks: [...api.webhooks, webhook]
      });
      setNewWebhook({ url: '', events: [] });
    }
  };

  const handleDeleteWebhook = (webhookId) => {
    onUpdate({
      ...api,
      webhooks: api.webhooks.filter(w => w.id !== webhookId)
    });
  };

  const handleToggleWebhook = (webhookId) => {
    onUpdate({
      ...api,
      webhooks: api.webhooks.map(w =>
        w.id === webhookId ? { ...w, active: !w.active } : w
      )
    });
  };

  const eventOptions = [
    'assignment.due',
    'exam.scheduled',
    'grade.posted',
    'study.group.created',
    'study.group.joined',
    'summary.created'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">API & Integrations</h2>
        <p className="text-sm text-gray-500">Manage API access and webhook integrations</p>
      </div>

      {/* API Access Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">API Access</h3>
          <button
            onClick={handleToggleApi}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              api.enabled ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                api.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {api.enabled && (
          <div className="space-y-4">
            {/* API Key Display */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <div className="flex">
                <div className="relative flex-1">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={api.apiKey}
                    readOnly
                    className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-l-lg font-mono text-sm"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleCopyApiKey}
                  className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg hover:bg-gray-200 transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Regenerate Key */}
            <button
              onClick={() => setShowRegenerateModal(true)}
              className="text-sm text-red-600 hover:text-red-700 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Regenerate API Key
            </button>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Rate Limit</div>
                <div className="text-lg font-semibold text-gray-900">{api.rateLimit} requests/hour</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Usage (last month)</div>
                <div className="text-lg font-semibold text-gray-900">{api.usageLastMonth} requests</div>
              </div>
            </div>

            {/* IP Whitelist */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IP Whitelist
              </label>
              <div className="space-y-2">
                {api.allowedIps.map((ip, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={ip}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm"
                    />
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add IP Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Webhooks</h3>

        {/* Webhook List */}
        <div className="space-y-3 mb-6">
          {api.webhooks.map((webhook) => (
            <div key={webhook.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${webhook.active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className="text-sm font-medium text-gray-700">{webhook.url}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {webhook.events.map((event, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    webhook.active ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      webhook.active ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleDeleteWebhook(webhook.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Webhook Form */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Webhook</h4>
          <div className="space-y-3">
            <input
              type="url"
              placeholder="https://api.your-app.com/webhook"
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Events to Subscribe
              </label>
              <div className="space-y-2">
                {eventOptions.map((event) => (
                  <label key={event} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={event}
                      checked={newWebhook.events.includes(event)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewWebhook({
                            ...newWebhook,
                            events: [...newWebhook.events, event]
                          });
                        } else {
                          setNewWebhook({
                            ...newWebhook,
                            events: newWebhook.events.filter(e => e !== event)
                          });
                        }
                      }}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">{event}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddWebhook}
              disabled={!newWebhook.url || newWebhook.events.length === 0}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Webhook
            </button>
          </div>
        </div>
      </div>

      {/* OAuth Apps */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Connected OAuth Apps</h3>
        <div className="space-y-3">
          {api.oauthApps.map((app, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">{app.name}</p>
                <p className="text-xs text-gray-500">Access: {app.access} • Last used {app.lastUsed}</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700">
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Regenerate Key Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Regenerate API Key</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to regenerate your API key? Any applications using the current key will lose access immediately.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-700">
                  This action cannot be undone. Make sure to update your applications with the new key.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRegenerateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onRegenerateKey();
                    setShowRegenerateModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Regenerate Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiSettings;