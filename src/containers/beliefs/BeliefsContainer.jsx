"use client";

import React, { useEffect, useState } from 'react';
import Beliefs from '@/app/(website)/components/beliefs/Beliefs';

const BeliefsContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const beliefsData = {
    title: "What We Believe",
    subtitle: "Our Core Values",
    description: "At Planwise, we're guided by a set of principles that shape everything we do. These beliefs drive our innovation and commitment to student success.",
    beliefs: [
      {
        id: 1,
        icon: "🧠",
        title: "Education Should Be Accessible",
        description: "We believe every student deserves equal access to quality education and tools that help them succeed, regardless of their background."
      },
      {
        id: 2,
        icon: "🤝",
        title: "Collaboration Over Competition",
        description: "Learning thrives in community. We foster environments where students can collaborate, share knowledge, and grow together."
      },
      {
        id: 3,
        icon: "⚡",
        title: "Work Smarter, Not Harder",
        description: "Intelligent tools should enhance human potential, not replace it. We believe in leveraging AI to handle the mundane so students can focus on what matters."
      },
      {
        id: 4,
        icon: "🌱",
        title: "Continuous Growth",
        description: "Learning never stops. We're committed to evolving our platform based on student feedback and emerging educational needs."
      },
      {
        id: 5,
        icon: "🎯",
        title: "Purpose-Driven Design",
        description: "Every feature we build serves a genuine purpose. We prioritize meaningful impact over flashy additions."
      },
      {
        id: 6,
        icon: "🌟",
        title: "Empowerment Through Technology",
        description: "Technology should empower, not overwhelm. We create intuitive tools that build confidence and independence in learners."
      }
    ],
    // quote: {
    //   text: "Education is the most powerful weapon which you can use to change the world.",
    //   author: "Nelson Mandela",
    //   role: "Inspirational Leader"
    // }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Beliefs 
      isVisible={isVisible}
      beliefsData={beliefsData}
    />
  );
};

export default BeliefsContainer;