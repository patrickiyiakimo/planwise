"use client";

import React, { useEffect, useState } from 'react';
import About from '@/app/(website)/components/about/About';

const AboutContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const aboutContent = {
    title: "Empowering Students for Academic Excellence",
    subtitle: "Your Trusted Study Companion",
    description: "At Planwise, we understand the challenges of modern education. Our platform was born from a simple idea: help students organize their academic lives more effectively while leveraging AI to make studying smarter, not harder.",
    mission: "We're dedicated to creating tools that reduce stress, improve productivity, and foster collaborative learning environments. Our AI-powered features are designed to complement traditional study methods, not replace them.",
    stats: [
      { value: "94%", label: "of users report improved grades" },
      { value: "5k+", label: "active students worldwide" },
      { value: "4.8/5", label: "rating from student reviews" },
      { value: "25+", label: "university partnerships" }
    ],
    features: [
      { icon: "🎯", text: "Personalized study plans" },
      { icon: "🤖", text: "AI-powered PDF summaries" },
      { icon: "📅", text: "Smart deadline tracking" },
      { icon: "👥", text: "Collaborative study groups" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      alt: "Students collaborating in a modern study space"
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <About 
      isVisible={isVisible}
      content={aboutContent}
    />
  );
};

export default AboutContainer;