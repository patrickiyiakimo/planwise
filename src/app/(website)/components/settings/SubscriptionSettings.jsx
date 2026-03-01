"use client";

import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  HardDrive,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';

const SubscriptionSettings = ({ subscription, onUpdate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'pro':
        return <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-medium rounded-full">Pro</span>;
      case 'basic':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Basic</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Starter</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const usagePercent = (used, limit) => {
    return (used / limit) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Subscription & Billing</h2>
        <p className="text-sm text-gray-500">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Current Plan</h3>
          {getPlanBadge(subscription.plan)}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Status</div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-lg font-semibold text-gray-900 capitalize">{subscription.status}</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Next Billing</div>
            <div className="text-lg font-semibold text-gray-900">{formatDate(subscription.nextBillingDate)}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Amount</div>
            <div className="text-lg font-semibold text-gray-900">
              {subscription.currency}{subscription.amount.toLocaleString()}/{subscription.interval}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Payment Method</div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-lg font-semibold text-gray-900">
                {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setShowChangePlanModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Change Plan
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Usage Statistics</h3>
        
        <div className="space-y-4">
          {/* Storage Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <HardDrive className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Storage</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {subscription.usage.storageUsed} GB / {subscription.usage.storageLimit} GB
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${usagePercent(subscription.usage.storageUsed, subscription.usage.storageLimit)}%` }}
              ></div>
            </div>
          </div>

          {/* PDF Summaries */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">PDF Summaries</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {subscription.usage.summariesUsed} / {subscription.usage.summariesLimit}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${usagePercent(subscription.usage.summariesUsed, subscription.usage.summariesLimit)}%` }}
              ></div>
            </div>
          </div>

          {/* Study Groups */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Study Groups</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {subscription.usage.studyGroupsJoined} / {subscription.usage.studyGroupsLimit}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${usagePercent(subscription.usage.studyGroupsJoined, subscription.usage.studyGroupsLimit)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Included Features */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Included Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subscription.features.map((feature, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
              {feature.included ? (
                <CheckCircle className="w-4 h-4 text-green-600 mr-3" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300 mr-3" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Billing History</h3>
        
        <div className="space-y-3">
          {subscription.invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">{invoice.plan}</p>
                <p className="text-xs text-gray-500">{formatDate(invoice.date)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {subscription.currency}{invoice.amount.toLocaleString()}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {invoice.status}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Cancel Subscription</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Note:</span> You'll continue to have access until {formatDate(subscription.nextBillingDate)}.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => {
                    // Handle cancellation
                    setShowCancelModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSettings;