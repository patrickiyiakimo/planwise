"use client";

import React, { useEffect, useState } from 'react';
import Pricing from '@/components/pricing/Pricing';

const PricingContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingData = {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose Your Plan",
    description: "Select the perfect plan for your academic journey. All plans include a 14-day free trial.",
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'Perfect for getting started',
        price: {
          monthly: 0,
          annual: 0
        },
        currency: '₦',
        interval: 'month',
        isFree: true,
        isPopular: false,
        features: [
          { name: 'Up to 3 subjects', included: true },
          { name: 'Basic task management', included: true },
          { name: 'Calendar view', included: true },
          { name: 'Mobile app access', included: true },
          { name: 'Email reminders', included: true },
          { name: 'Advanced analytics', included: false },
          { name: 'AI study recommendations', included: false },
          { name: 'Priority support', included: false },
          { name: 'Group study rooms', included: false },
          { name: 'Custom integrations', included: false }
        ],
        cta: 'Get Started Free',
        ctaLink: '/signup?plan=starter'
      },
       {
        id: 'pro',
        name: 'Pro',
        tagline: 'Unlock your full potential',
        price: {
          monthly: 3000,
          annual: 30000 // 2 months free with annual
        },
        currency: '₦',
        interval: 'month',
        isFree: false,
        isPopular: true,
        features: [
          { name: 'Everything in Basic', included: true },
          { name: 'Unlimited subjects & tasks', included: true },
          { name: 'All views (Calendar, Kanban, List)', included: true },
          { name: 'All platforms + offline mode', included: true },
          { name: 'AI-powered smart reminders', included: true },
          { name: 'AI PDF summary', included: true, highlight: true },
          { name: 'Advanced analytics & insights', included: true },
          { name: 'Personalized AI study coach', included: true },
          { name: '24/7 Priority support', included: true },
          { name: 'Unlimited group study rooms', included: true }
        ],
        cta: 'Go Pro',
        ctaLink: '/signup?plan=pro'
      },
      {
        id: 'basic',
        name: 'Basic',
        tagline: 'For serious students',
        price: {
          monthly: 1500,
          annual: 15000 // 2 months free with annual
        },
        currency: '₦',
        interval: 'month',
        isFree: false,
        isPopular: false,
        features: [
          { name: 'Unlimited subjects', included: true },
          { name: 'Advanced task management', included: true },
          { name: 'Calendar & Kanban views', included: true },
          { name: 'Mobile & desktop apps', included: true },
          { name: 'Smart reminders', included: true },
          { name: 'Basic analytics', included: true },
          { name: 'AI study recommendations', included: true },
          { name: 'Priority support', included: true },
          { name: 'Group study rooms', included: false },
          { name: 'Custom integrations', included: false }
        ],
        cta: 'Start Basic Plan',
        ctaLink: '/signup?plan=basic'
      }
    ],
    savingsNote: "Save 17% with annual billing",
    guarantee: "14-day money-back guarantee • Cancel anytime"
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    // Handle plan selection (e.g., redirect to checkout)
    console.log(`Selected plan: ${planId} with ${billingCycle} billing`);
  };

  const handleBillingToggle = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <Pricing
      isVisible={isVisible}
      billingCycle={billingCycle}
      selectedPlan={selectedPlan}
      pricingData={pricingData}
      onPlanSelect={handlePlanSelect}
      onBillingToggle={handleBillingToggle}
    />
  );
};

export default PricingContainer;