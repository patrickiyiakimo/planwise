"use client";

import React, { useState, useEffect } from 'react';
import FaqSection from '@/app/(website)/components/faq/FaqSection';
import SupportSection from '@/app/(website)/components/faq/SupportSection';

const FaqContainer = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState({});

  const faqData = {
    title: "Frequently Asked Questions",
    subtitle: "Got questions? We've got answers!",
    description: "Find answers to the most common questions about Planwise and how it can help you succeed in your studies.",
    categories: [
      { id: 'general', label: 'General' },
      { id: 'account', label: 'Account & Billing' },
      { id: 'features', label: 'Features' },
      { id: 'ai-summary', label: 'AI PDF Summary' },
      { id: 'technical', label: 'Technical Support' }
    ],
    faqs: {
      general: [
        {
          id: 'g1',
          question: "What is Planwise and how can it help me?",
          answer: "Planwise is an intelligent student planning platform designed to help you organize your academic life. It combines task management, calendar features, and AI-powered tools like PDF summaries to make studying more efficient and effective. Whether you're managing multiple courses, tracking deadlines, or preparing for exams, Planwise adapts to your needs."
        },
        {
          id: 'g2',
          question: "Is Planwise really free?",
          answer: "Yes! Planwise offers a generous free tier that includes up to 3 subjects, basic task management, calendar view, and mobile app access. You can use these features indefinitely without any cost. For students who need more advanced features, we offer affordable premium plans starting at just ₦1,500/month."
        },
        {
          id: 'g3',
          question: "Do I need to download any software?",
          answer: "Planwise is available as a web application that works in any modern browser, so you can start using it immediately without downloads. For enhanced convenience, we also offer mobile apps for iOS and Android, as well as desktop apps for Windows and Mac."
        },
        {
          id: 'g4',
          question: "Can I use Planwise on multiple devices?",
          answer: "Absolutely! Your Planwise account syncs seamlessly across all your devices. Start planning on your laptop, continue on your tablet, and check deadlines on your phone—everything stays in sync automatically."
        }
      ],
      account: [
        {
          id: 'a1',
          question: "How do I create an account?",
          answer: "Creating an account is simple and free. Just click the 'Sign Up' button on our homepage, enter your email address and a password, and you're ready to start. You can also sign up using your Google or Microsoft account for even faster access."
        },
        {
          id: 'a2',
          question: "Can I change my subscription plan?",
          answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. When upgrading, the new features are available immediately. When downgrading, the changes will take effect at the start of your next billing cycle."
        },
        {
          id: 'a3',
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and mobile money options. All payments are processed securely through our payment partners."
        },
        {
          id: 'a4',
          question: "Is there a student discount?",
          answer: "Yes! We offer a 20% discount for verified students. Simply sign up with your university email address or submit your student ID through our verification process to unlock the discount on any paid plan."
        }
      ],
      features: [
        {
          id: 'f1',
          question: "What study tools does Planwise include?",
          answer: "Planwise includes a comprehensive suite of study tools: task management with priorities and deadlines, calendar views (daily, weekly, monthly), Kanban boards for project tracking, study timers with Pomodoro technique, note-taking capabilities, and progress tracking dashboards."
        },
        {
          id: 'f2',
          question: "Can I share my study plans with classmates?",
          answer: "Yes! Planwise supports collaborative features that let you share study plans, create group projects, and coordinate with classmates. You can set different permission levels (view only, comment, edit) to control access to your shared content."
        },
        {
          id: 'f3',
          question: "How do reminders work?",
          answer: "You can set reminders for any task or deadline. Choose from email notifications, push notifications on mobile, or both. Reminders can be set to alert you days, hours, or minutes in advance. Pro users get AI-powered smart reminders that adapt to your study patterns."
        }
      ],
      'ai-summary': [
        {
          id: 'ai1',
          question: "How does the AI PDF summary feature work?",
          answer: "Simply upload any PDF document (lecture notes, research papers, textbook chapters), and our AI analyzes the content to generate concise, well-structured summaries. It identifies key concepts, main arguments, and important details, saving you hours of reading time."
        },
        {
          id: 'ai2',
          question: "Is the AI summary accurate?",
          answer: "Our AI is trained on millions of academic documents and achieves over 95% accuracy in capturing key information. However, we always recommend reviewing summaries alongside original materials for critical study. Pro users can also customize the AI's focus areas."
        },
        {
          id: 'ai3',
          question: "What languages does the AI support?",
          answer: "Currently, our AI supports English, Spanish, French, German, and Portuguese. We're actively working on adding more languages based on user demand. The interface itself is available in 12 languages."
        },
        {
          id: 'ai4',
          question: "Are there any limits on PDF uploads?",
          answer: "Free users can upload up to 5 PDFs per month. Basic plan users get 50 uploads per month. Pro users enjoy unlimited PDF uploads and can process documents up to 500 pages each."
        }
      ],
      technical: [
        {
          id: 't1',
          question: "What browsers are supported?",
          answer: "Planwise works best on the latest versions of Chrome, Firefox, Safari, and Edge. We ensure compatibility with all modern browsers. If you're experiencing issues, try updating your browser to the latest version."
        },
        {
          id: 't2',
          question: "Is my data secure?",
          answer: "Security is our top priority. All data is encrypted in transit and at rest. We use industry-standard security practices, regular audits, and never share your personal information with third parties. You can learn more in our Privacy Policy."
        },
        {
          id: 't3',
          question: "Can I export my data?",
          answer: "Yes! You can export your study plans, tasks, and notes in various formats including CSV, PDF, and JSON. This makes it easy to back up your data or move to other platforms if needed."
        }
      ]
    },
    support: {
      title: "Still have questions?",
      description: "Can't find what you're looking for? Our friendly support team is here to help you get the most out of Planwise.",
      options: [
        {
          type: "Live Chat",
          icon: "💬",
          description: "Average response time: 2 minutes",
          availability: "24/7",
          action: "Start Chat",
          link: "#chat"
        },
        {
          type: "Email Support",
          icon: "✉️",
          description: "support@planwise.app",
          availability: "24/7 response within 24h",
          action: "Send Email",
          link: "mailto:support@planwise.app"
        },
        {
          type: "Phone Support",
          icon: "📞",
          description: "Pro users only • 24/7 availability",
          availability: "Premium support",
          action: "View Details",
          link: "#phone-support",
          badge: "Pro"
        }
      ],
      image: {
        src: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=600&q=80",
        alt: "Customer support illustration"
      }
    }
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqData.faqs);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.keys(faqData.faqs).forEach(category => {
      const matchedItems = faqData.faqs[category].filter(
        item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
      );
      
      if (matchedItems.length > 0) {
        filtered[category] = matchedItems;
      }
    });

    setFilteredFaqs(filtered);
  }, [searchQuery]);

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenItems({}); // Close all items when switching categories
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setActiveCategory('all');
    }
  };

  const handleContactOption = (option) => {
    console.log(`Contact option selected: ${option.type}`);
    // Add analytics or routing logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <FaqSection
        title={faqData.title}
        subtitle={faqData.subtitle}
        description={faqData.description}
        categories={faqData.categories}
        faqs={searchQuery ? filteredFaqs : faqData.faqs}
        activeCategory={activeCategory}
        openItems={openItems}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        onToggleItem={toggleItem}
        onSearch={handleSearch}
      />
      
      <SupportSection
        support={faqData.support}
        onContactOption={handleContactOption}
      />
    </div>
  );
};

export default FaqContainer;