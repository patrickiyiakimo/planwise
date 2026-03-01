"use client";

import React from 'react';
import { Sparkles, Shield, CreditCard, RefreshCw } from 'lucide-react';
import PricingCard from './PricingCard';

const Pricing = ({
  isVisible,
  billingCycle,
  selectedPlan,
  pricingData,
  onPlanSelect,
  onBillingToggle
}) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className={`
          text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          {/* Subtitle Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-indigo-700">
              {pricingData.subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {pricingData.title}
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            {pricingData.description}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => onBillingToggle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7 bg-indigo-600' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1.5 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 mb-16">
          {pricingData.plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isVisible={isVisible}
              index={index}
              onSelect={onPlanSelect}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <div className={`
          grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center transition-all duration-1000 delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          <div className="flex flex-col items-center p-4">
            <Shield className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">14-Day Money Back</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <CreditCard className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Secure Payments</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <RefreshCw className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Cancel Anytime</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <Sparkles className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">AI-Powered</span>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className={`
          text-center mt-12 transition-all duration-1000 delay-1000
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          <p className="text-gray-600">
            Have questions? Check out our{' '}
            <a href="#faq" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
              FAQ section
            </a>
          </p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Pricing;