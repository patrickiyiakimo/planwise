"use client";

import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Bell,
  Lock,
  CreditCard,
  Palette,
  Key,
  AlertTriangle,
  Save
} from 'lucide-react';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import SubscriptionSettings from '@/components/settings/SubscriptionSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import ApiSettings from '@/components/settings/ApiSettings';
import DangerZone from '@/components/settings/DangerZone';

const SettingsContainer = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'Alex',
      lastName: 'Johnson',
      displayName: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      alternativeEmail: '',
      phone: '+1 (555) 123-4567',
      university: 'Stanford University',
      studentId: 'STU2024001',
      year: '3rd Year',
      major: 'Computer Science',
      minor: 'Mathematics',
      bio: 'Passionate about machine learning and software development. Love collaborating on interesting projects.',
      avatar: 'AJ',
      coverPhoto: null,
      dateOfBirth: '2002-05-15',
      gender: 'male',
      pronouns: 'he/him',
      timezone: 'America/Los_Angeles',
      language: 'en-US'
    },
    account: {
      username: 'alexj_2024',
      email: 'alex.johnson@university.edu',
      alternativeEmail: '',
      phone: '+1 (555) 123-4567',
      twoFactorEnabled: false,
      loginAlerts: true,
      deviceHistory: [
        { device: 'MacBook Pro - Chrome', location: 'San Francisco, CA', lastActive: '2024-03-20T14:30:00', current: true },
        { device: 'iPhone 14 - Safari', location: 'San Francisco, CA', lastActive: '2024-03-19T22:15:00', current: false },
        { device: 'iPad Pro - Safari', location: 'Palo Alto, CA', lastActive: '2024-03-18T09:45:00', current: false }
      ],
      connectedAccounts: [
        { platform: 'Google', connected: true, email: 'alex.johnson@gmail.com' },
        { platform: 'Microsoft', connected: true, email: 'alex.j@university.edu' },
        { platform: 'GitHub', connected: false, email: '' },
        { platform: 'LinkedIn', connected: true, email: 'alex.johnson' }
      ]
    },
    notifications: {
      email: {
        assignmentReminders: true,
        examReminders: true,
        studyGroupInvites: true,
        courseAnnouncements: true,
        gradeUpdates: true,
        newsletter: false,
        productUpdates: true,
        tipsAndTricks: true
      },
      push: {
        assignmentReminders: true,
        examReminders: true,
        studyGroupInvites: true,
        courseAnnouncements: false,
        gradeUpdates: true,
        studyReminders: true,
        deadlineAlerts: true
      },
      inApp: {
        assignmentReminders: true,
        examReminders: true,
        studyGroupInvites: true,
        courseAnnouncements: true,
        gradeUpdates: true,
        messages: true,
        systemAlerts: true
      },
      frequency: 'realtime', // 'realtime', 'daily', 'weekly'
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '08:00',
        timezone: 'America/Los_Angeles'
      }
    },
    privacy: {
      profileVisibility: 'students', // 'public', 'students', 'private'
      showEmail: false,
      showPhone: false,
      showStudentId: true,
      showCourses: true,
      showStudyGroups: true,
      showActivity: 'friends', // 'public', 'friends', 'private'
      dataSharing: {
        analytics: true,
        personalizedRecommendations: true,
        researchParticipation: false,
        thirdPartySharing: false
      },
      searchable: true,
      showOnlineStatus: true,
      showLastActive: true
    },
    subscription: {
      plan: 'pro',
      status: 'active',
      startDate: '2024-01-15',
      nextBillingDate: '2024-04-15',
      amount: 3000,
      currency: '₦',
      interval: 'month',
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryDate: '05/25'
      },
      features: [
        { name: 'Unlimited subjects', included: true },
        { name: 'AI PDF Summaries', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Group study rooms', included: true },
        { name: 'Custom integrations', included: true }
      ],
      usage: {
        storageUsed: 2.5, // GB
        storageLimit: 10, // GB
        summariesUsed: 15,
        summariesLimit: 100,
        studyGroupsJoined: 3,
        studyGroupsLimit: 20
      },
      invoices: [
        { id: 'INV-001', date: '2024-03-15', amount: 3000, status: 'paid', plan: 'Pro Monthly' },
        { id: 'INV-002', date: '2024-02-15', amount: 3000, status: 'paid', plan: 'Pro Monthly' },
        { id: 'INV-003', date: '2024-01-15', amount: 3000, status: 'paid', plan: 'Pro Monthly' }
      ]
    },
    appearance: {
      theme: 'system', // 'light', 'dark', 'system'
      colorScheme: 'indigo', // 'indigo', 'blue', 'purple', 'green'
      fontSize: 'medium', // 'small', 'medium', 'large'
      compactMode: false,
      reducedMotion: false,
      highContrast: false,
      dashboardLayout: 'default', // 'default', 'compact', 'detailed'
      cardStyle: 'rounded', // 'rounded', 'flat', 'minimal'
      animations: true
    },
    security: {
      twoFactorEnabled: false,
      twoFactorMethod: 'app', // 'app', 'sms', 'email'
      backupCodes: ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345'],
      passwordLastChanged: '2024-01-15',
      loginHistory: [
        { date: '2024-03-20T14:30:00', ip: '192.168.1.1', device: 'MacBook Pro', location: 'San Francisco, CA' },
        { date: '2024-03-19T22:15:00', ip: '192.168.1.2', device: 'iPhone 14', location: 'San Francisco, CA' }
      ],
      trustedDevices: [
        { id: 'd1', name: 'MacBook Pro', lastUsed: '2024-03-20', trusted: true },
        { id: 'd2', name: 'iPhone 14', lastUsed: '2024-03-19', trusted: true }
      ],
      securityQuestions: [
        { question: 'What was your first pet\'s name?', answered: true },
        { question: 'What was your childhood nickname?', answered: true }
      ]
    },
    api: {
      enabled: false,
      apiKey: 'pk_live_abc123...',
      webhooks: [
        { id: 'w1', url: 'https://api.myapp.com/webhook', events: ['assignment.due', 'grade.posted'], active: true }
      ],
      rateLimit: 1000,
      usageLastMonth: 345,
      allowedIps: ['192.168.1.1/24'],
      oauthApps: [
        { name: 'Study Timer', access: 'read', lastUsed: '2024-03-18' }
      ]
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaving(false);
    setSaveSuccess(true);
  };

  const handleUpdateProfile = (data) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, ...data }
    }));
  };

  const handleUpdateAccount = (data) => {
    setSettings(prev => ({
      ...prev,
      account: { ...prev.account, ...data }
    }));
  };

  const handleUpdateNotifications = (data) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...data }
    }));
  };

  const handleUpdatePrivacy = (data) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, ...data }
    }));
  };

  const handleUpdateSubscription = (data) => {
    setSettings(prev => ({
      ...prev,
      subscription: { ...prev.subscription, ...data }
    }));
  };

  const handleUpdateAppearance = (data) => {
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, ...data }
    }));
  };

  const handleUpdateSecurity = (data) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, ...data }
    }));
  };

  const handleUpdateApi = (data) => {
    setSettings(prev => ({
      ...prev,
      api: { ...prev.api, ...data }
    }));
  };

  const handleDeleteAccount = () => {
    // Implement account deletion
    console.log('Account deletion requested');
  };

  const handleExportData = () => {
    // Implement data export
    console.log('Data export requested');
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    // Implement password change
    console.log('Password change requested');
  };

  const handleEnable2FA = async () => {
    // Implement 2FA setup
    console.log('2FA setup requested');
  };

  const handleRegenerateApiKey = () => {
    // Implement API key regeneration
    console.log('API key regeneration requested');
  };

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'api', label: 'API & Integrations', icon: Key },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account preferences and application settings
              </p>
            </div>

            {/* Save Button */}
            <div className="flex items-center space-x-3">
              {saveSuccess && (
                <span className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  Settings saved successfully!
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Settings Sidebar */}
        <SettingsSidebar
          tabs={settingsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            {activeTab === 'profile' && (
              <ProfileSettings
                profile={settings.profile}
                onUpdate={handleUpdateProfile}
              />
            )}

            {activeTab === 'account' && (
              <AccountSettings
                account={settings.account}
                onUpdate={handleUpdateAccount}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationSettings
                notifications={settings.notifications}
                onUpdate={handleUpdateNotifications}
              />
            )}

            {activeTab === 'privacy' && (
              <PrivacySettings
                privacy={settings.privacy}
                onUpdate={handleUpdatePrivacy}
              />
            )}

            {activeTab === 'subscription' && (
              <SubscriptionSettings
                subscription={settings.subscription}
                onUpdate={handleUpdateSubscription}
              />
            )}

            {activeTab === 'appearance' && (
              <AppearanceSettings
                appearance={settings.appearance}
                onUpdate={handleUpdateAppearance}
              />
            )}

            {activeTab === 'security' && (
              <SecuritySettings
                security={settings.security}
                onUpdate={handleUpdateSecurity}
                onChangePassword={handleChangePassword}
                onEnable2FA={handleEnable2FA}
              />
            )}

            {activeTab === 'api' && (
              <ApiSettings
                api={settings.api}
                onUpdate={handleUpdateApi}
                onRegenerateKey={handleRegenerateApiKey}
              />
            )}

            {activeTab === 'danger' && (
              <DangerZone
                onDeleteAccount={handleDeleteAccount}
                onExportData={handleExportData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;