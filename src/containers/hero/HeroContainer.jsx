"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Hero from '@/components/hero/Hero';

const HeroContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats] = useState([
    { id: 1, label: 'Active Students', value: '5,000+', icon: '👥' },
    { id: 2, label: 'Study Hours Saved', value: '50,000+', icon: '⏰' },
    { id: 3, label: 'AI Summaries', value: '25,000+', icon: '🤖' },
  ]);

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);
  }, []);

  const handleGetStarted = useCallback(() => {
    // Add your get started logic here
    console.log('Get Started clicked');
    // You can add navigation, modal opening, etc.
  }, []);

//   const handleWatchDemo = useCallback(() => {
//     // Add your watch demo logic here
//     console.log('Watch Demo clicked');
//     // You can open a video modal, navigate to demo page, etc.
//   }, []);

  const heroImage = {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    alt: "Students collaborating on their studies"
  };

  return (
    <Hero
      isVisible={isVisible}
      stats={stats}
      heroImage={heroImage}
      onGetStarted={handleGetStarted}
    //   onWatchDemo={handleWatchDemo}
    />
  );
};

export default HeroContainer;