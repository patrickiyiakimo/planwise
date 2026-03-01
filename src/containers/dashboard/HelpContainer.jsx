"use client";

import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, BookOpen, MessageCircle, FileText, Video, Mail, MessageSquare } from 'lucide-react';
import HelpHeader from '@/components/help/HelpHeader';
import SearchBar from '@/components/help/SearchBar';
import QuickLinks from '@/components/help/QuickLinks';
import FAQCategory from '@/components/help/FAQCategory';
import ContactSupport from '@/components/help/ContactSupport';
import HelpResources from '@/components/help/HelpResources';
import HelpSidebar from '@/components/help/HelpSidebar';

const HelpContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [loading, setLoading] = useState(true);

  // FAQ data
  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      faqs: [
        {
          id: 'gs1',
          question: 'How do I create an account?',
          answer: 'To create an account, click the "Sign Up" button on the homepage. You can sign up using your email address or connect with Google. Fill in your basic information, verify your email, and you\'re ready to start using Planwise!'
        },
        {
          id: 'gs2',
          question: 'How do I add my first course?',
          answer: 'Go to the Courses page from your dashboard, click the "Add Course" button, and fill in the course details including course code, name, instructor, and schedule. You can add multiple courses to track all your classes.'
        },
        {
          id: 'gs3',
          question: 'How do I set up my profile?',
          answer: 'Navigate to Settings > Profile Settings. Here you can add your personal information, academic details, and customize your profile. Make sure to save your changes after updating.'
        },
        {
          id: 'gs4',
          question: 'What is the AI PDF Summary feature?',
          answer: 'The AI PDF Summary feature allows you to upload PDF documents (lecture notes, research papers, etc.) and get instant AI-generated summaries. Go to the AI PDF Summaries page, upload your file, and the AI will analyze and summarize the content for you.'
        }
      ]
    },
    {
      id: 'courses-tasks',
      title: 'Courses & Tasks',
      icon: FileText,
      faqs: [
        {
          id: 'ct1',
          question: 'How do I add assignments to my courses?',
          answer: 'When viewing a course in the Courses page, click on the course to open details. In the Assignments tab, you can add new assignments with due dates, descriptions, and point values. You can also mark assignments as completed when done.'
        },
        {
          id: 'ct2',
          question: 'How do I track my task progress?',
          answer: 'Your task progress is automatically tracked as you complete assignments. You can view your progress in the Tasks page and on each course card. The dashboard also shows an overview of your pending and completed tasks.'
        },
        {
          id: 'ct3',
          question: 'Can I set reminders for deadlines?',
          answer: 'Yes! When creating or editing an assignment, you can set reminders. You\'ll receive notifications based on your reminder preferences. You can also manage notification settings in Settings > Notification Settings.'
        },
        {
          id: 'ct4',
          question: 'How do I organize tasks by priority?',
          answer: 'When adding a task, you can set its priority (High, Medium, Low). Tasks are color-coded in your task list, and you can filter by priority to focus on what matters most. High priority tasks also appear prominently on your dashboard.'
        }
      ]
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: MessageCircle,
      faqs: [
        {
          id: 'cal1',
          question: 'How do I add events to my calendar?',
          answer: 'Go to the Calendar page and click the "Add Event" button. Fill in the event details including title, date/time, location, and any notes. You can also click directly on a date in the calendar to create an event for that day.'
        },
        {
          id: 'cal2',
          question: 'Can I sync my calendar with other apps?',
          answer: 'Currently, you can export your calendar data in various formats. We\'re working on direct sync with Google Calendar and other popular calendar apps. Check the API settings page for integration options.'
        },
        {
          id: 'cal3',
          question: 'How do I view different calendar views?',
          answer: 'On the Calendar page, you can switch between Month, Week, Day, and Agenda views using the view toggle buttons. Each view provides a different perspective on your schedule.'
        },
        {
          id: 'cal4',
          question: 'How are course assignments shown on calendar?',
          answer: 'All assignments from your courses are automatically added to your calendar with their due dates. They appear as events and are color-coded by course for easy identification.'
        }
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: MessageSquare,
      faqs: [
        {
          id: 'ai1',
          question: 'How does the AI Math Solver work?',
          answer: 'Go to the Math Solver page, enter your math problem in the input field, and click "Solve". The AI will analyze the problem and provide a step-by-step solution with explanations. You can also view graphs for applicable problems.'
        },
        {
          id: 'ai2',
          question: 'What types of math problems can be solved?',
          answer: 'The AI Math Solver can handle various types including algebra, calculus, trigonometry, linear algebra, and statistics. Simply type your problem in natural language or use mathematical notation.'
        },
        {
          id: 'ai3',
          question: 'How accurate are the AI summaries?',
          answer: 'Our AI achieves over 90% accuracy in capturing key information from academic documents. The confidence score is displayed with each summary. For critical documents, we recommend reviewing alongside original materials.'
        },
        {
          id: 'ai4',
          question: 'Are there limits on PDF uploads?',
          answer: 'Free users can upload up to 5 PDFs per month. Basic plan users get 50 uploads per month, and Pro users enjoy unlimited uploads. Your current usage is shown in the PDF Summaries page.'
        }
      ]
    },
    {
      id: 'account-billing',
      title: 'Account & Billing',
      icon: Mail,
      faqs: [
        {
          id: 'ab1',
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security. Click on "Change Password" and follow the prompts. You\'ll need to enter your current password and then your new password twice to confirm.'
        },
        {
          id: 'ab2',
          question: 'How do I update my subscription?',
          answer: 'Navigate to Settings > Subscription. Here you can view your current plan, upgrade, downgrade, or cancel your subscription. Changes take effect at the start of your next billing cycle.'
        },
        {
          id: 'ab3',
          question: 'What payment methods are accepted?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and various mobile payment options. Your payment information is securely processed and stored.'
        },
        {
          id: 'ab4',
          question: 'How do I delete my account?',
          answer: 'Go to Settings > Danger Zone. Click "Delete Account" and follow the confirmation steps. Please note that this action is permanent and cannot be undone. All your data will be permanently deleted.'
        }
      ]
    }
  ];

  // Quick links data
  const quickLinks = [
    { id: 1, title: 'Getting Started Guide', icon: BookOpen, href: '#getting-started', color: 'bg-blue-500' },
    { id: 2, title: 'Video Tutorials', icon: Video, href: '#tutorials', color: 'bg-purple-500' },
    { id: 3, title: 'FAQ Database', icon: HelpCircle, href: '#faq', color: 'bg-green-500' },
    { id: 4, title: 'Contact Support', icon: MessageCircle, href: '#contact', color: 'bg-orange-500' }
  ];

  // Support resources data
  const resources = [
    { id: 1, title: 'Documentation', description: 'Detailed guides and API references', icon: BookOpen, href: '#docs' },
    { id: 2, title: 'Community Forum', description: 'Connect with other students', icon: MessageSquare, href: '#forum' },
    { id: 3, title: 'Video Tutorials', description: 'Watch step-by-step guides', icon: Video, href: '#videos' },
    { id: 4, title: 'Release Notes', description: 'See what\'s new', icon: FileText, href: '#releases' }
  ];

  // Contact options
  const contactOptions = [
    {
      id: 1,
      method: 'Email Support',
      value: 'support@planwise.app',
      icon: Mail,
      description: 'Average response time: 24 hours',
      action: 'Send Email',
      link: 'mailto:support@planwise.app'
    },
    {
      id: 2,
      method: 'Live Chat',
      value: 'Available 24/7',
      icon: MessageCircle,
      description: 'Get instant answers from our team',
      action: 'Start Chat',
      link: '#chat'
    },
    {
      id: 3,
      method: 'Community Forum',
      value: 'planwise.com/community',
      icon: MessageSquare,
      description: 'Connect with other students',
      action: 'Visit Forum',
      link: '#forum'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Filter FAQs based on search query
  const filteredCategories = searchQuery
    ? faqCategories
        .map(category => ({
          ...category,
          faqs: category.faqs.filter(
            faq =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }))
        .filter(category => category.faqs.length > 0)
    : faqCategories;

  const toggleFAQ = (faqId) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('all');
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading help center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HelpHeader />

      <div className="px-6 py-8">
        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        {/* Quick Links */}
        <QuickLinks links={quickLinks} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <HelpSidebar
              categories={faqCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3">
            {searchQuery ? (
              // Search Results
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Results for "{searchQuery}"
                </h2>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <FAQCategory
                      key={category.id}
                      category={category}
                      expandedFAQs={expandedFAQs}
                      onToggleFAQ={toggleFAQ}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">
                      We couldn't find any FAQs matching your search. Try different keywords or browse the categories.
                    </p>
                  </div>
                )}
              </div>
            ) : selectedCategory !== 'all' ? (
              // Single Category View
              <FAQCategory
                category={faqCategories.find(c => c.id === selectedCategory)}
                expandedFAQs={expandedFAQs}
                onToggleFAQ={toggleFAQ}
              />
            ) : (
              // All Categories View
              <div className="space-y-8">
                {faqCategories.map((category) => (
                  <FAQCategory
                    key={category.id}
                    category={category}
                    expandedFAQs={expandedFAQs}
                    onToggleFAQ={toggleFAQ}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <ContactSupport options={contactOptions} />

        {/* Help Resources */}
        <HelpResources resources={resources} />
      </div>
    </div>
  );
};

export default HelpContainer;