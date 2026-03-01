"use client";

import React from 'react';
import { 
  Sparkles, 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Heart,
  ArrowUp
} from 'lucide-react';

const Footer = ({
  footerData,
  email,
  setEmail,
  subscriptionStatus,
  onSubscribe,
  onSocialClick,
  currentYear
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Company Info - 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-gray-900 rounded-lg p-2">
                  <span className="text-2xl">{footerData.company.logo}</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {footerData.company.name}
              </span>
            </a>

            {/* Tagline */}
            <p className="text-xl font-semibold text-white">
              {footerData.company.tagline}
            </p>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed">
              {footerData.company.description}
            </p>

            {/* App Store Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {footerData.appStores.map((store) => (
                <a
                  key={store.platform}
                  href={store.href}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  aria-label={store.label}
                >
                  <span className="text-xl">{store.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Download on</span>
                    <span className="text-sm font-semibold">{store.platform}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - 2 columns on large screens */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerData.sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center space-x-2"
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter - 1 column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">{footerData.newsletter.title}</h3>
            <p className="text-sm text-gray-400">
              {footerData.newsletter.description}
            </p>

            {/* Subscription Form */}
            <form onSubmit={onSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footerData.newsletter.placeholder}
                  className="w-full bg-gray-800 text-white placeholder-gray-500 pl-10 pr-24 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  disabled={subscriptionStatus === 'loading' || subscriptionStatus === 'success'}
                />
                <button
                  type="submit"
                  disabled={subscriptionStatus === 'loading' || subscriptionStatus === 'success'}
                  className={`
                    absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-md text-sm font-medium
                    transition-all duration-200 flex items-center space-x-1
                    ${subscriptionStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : subscriptionStatus === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }
                  `}
                >
                  {subscriptionStatus === 'loading' && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {subscriptionStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                  {subscriptionStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                  {subscriptionStatus === 'idle' && (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{footerData.newsletter.buttonText}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {subscriptionStatus === 'success' && (
                <p className="text-sm text-green-500">Thanks for subscribing! Check your inbox.</p>
              )}
              {subscriptionStatus === 'error' && (
                <p className="text-sm text-red-500">Please enter a valid email address.</p>
              )}

              <p className="text-xs text-gray-500">
                {footerData.newsletter.privacyNote}
              </p>
            </form>

            {/* Social Links */}
            {/* <div className="flex flex-wrap gap-4 pt-4">
              {footerData.social.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  onClick={() => onSocialClick(social.platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <span className="text-2xl hover:scale-110 transform transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>{footerData.copyright.text}</p>
              <p className="flex items-center justify-center md:justify-start space-x-1 mt-1">
                <span>{footerData.copyright.builtWith}</span>
                <Heart className="w-4 h-4 text-red-500 inline animate-pulse" />
              </p>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;