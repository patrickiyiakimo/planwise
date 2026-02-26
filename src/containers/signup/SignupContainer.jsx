"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/signup/SignupForm';
import SignupImage from '@/components/signup/SignupImage';

const SignupContainer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Signup successful:', formData.email);
      router.push('/dashboard');
    } catch (error) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    
    // Simulate Google OAuth
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Google signup successful');
      router.push('/dashboard');
    } catch (error) {
      setErrors({ form: 'Google signup failed. Please try again.' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const imageData = {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    alt: "Professional student working productively on laptop in modern workspace"
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <SignupForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            googleLoading={googleLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onGoogleSignup={handleGoogleSignup}
            onLoginRedirect={handleLoginRedirect}
          />
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600">
          <SignupImage imageData={imageData} />
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;