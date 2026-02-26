"use client";

import React, { useState } from 'react';
import Footer from '@/components/footer/Footer';

const FooterContainer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const footerData = {
    company: {
      name: 'planwise',
      logo: '📚',
      tagline: 'Your intelligent student planning companion',
      description: 'Empowering students worldwide with smart tools for academic success.'
    },
    sections: [
      {
        id: 'product',
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
          { label: 'AI PDF Summary', href: '#ai-summary', badge: 'AI' }
        ]
      },
      {
        id: 'company',
        title: 'Company',
        links: [
          { label: 'About Us', href: '#about' },
          { label: 'Careers', href: '#careers' },
          { label: 'Press', href: '#press' },
          { label: 'Blog', href: '#blog' },
          { label: 'Contact', href: '#contact' }
        ]
      },
      {
        id: 'resources',
        title: 'Resources',
        links: [
          { label: 'Help Center', href: '#help' },
          { label: 'Community', href: '#community' },
          { label: 'Student Guide', href: '#guide' },
          { label: 'Study Tips', href: '#tips' },
          { label: 'Webinars', href: '#webinars' }
        ]
      },
      {
        id: 'legal',
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Cookie Policy', href: '#cookies' },
          { label: 'Security', href: '#security' },
          { label: 'GDPR', href: '#gdpr' }
        ]
      }
    ],
    // social: [
    //   { platform: 'Twitter', icon: '🐦', href: 'https://twitter.com/planwise', label: 'Follow us on Twitter' },
    //   { platform: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/planwise', label: 'Connect on LinkedIn' },
    //   { platform: 'Instagram', icon: '📸', href: 'https://instagram.com/planwise', label: 'Follow us on Instagram' },
    //   { platform: 'GitHub', icon: '🐙', href: 'https://github.com/planwise', label: 'View on GitHub' },
    //   { platform: 'YouTube', icon: '▶️', href: 'https://youtube.com/planwise', label: 'Subscribe on YouTube' }
    // ],
    newsletter: {
      title: 'Stay Updated',
      description: 'Get study tips, product updates, and exclusive offers.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      privacyNote: 'We respect your privacy. Unsubscribe at any time.'
    },
    appStores: [
      { platform: 'App Store', icon: '🍎', href: '#', label: 'Download on App Store' },
      { platform: 'Google Play', icon: '📱', href: '#', label: 'Get it on Google Play' }
    ],
    copyright: {
      text: `© ${new Date().getFullYear()} Planwise. All rights reserved.`,
      builtWith: 'Built with 🎓 for students worldwide'
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      return;
    }

    setSubscriptionStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscriptionStatus('idle');
      }, 5000);
    } catch (error) {
      setSubscriptionStatus('error');
    }
  };

  const handleSocialClick = (platform) => {
    console.log(`Clicked ${platform}`);
    // Add analytics tracking here
  };

  const currentYear = new Date().getFullYear();

  return (
    <Footer
      footerData={footerData}
      email={email}
      setEmail={setEmail}
      subscriptionStatus={subscriptionStatus}
      onSubscribe={handleSubscribe}
      onSocialClick={handleSocialClick}
      currentYear={currentYear}
    />
  );
};

export default FooterContainer;