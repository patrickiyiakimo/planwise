"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/(website)/components/login/LoginForm';

const LoginContainer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email or password';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
  setApiError('');

  try {
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        remember_me: formData.rememberMe
      }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid email or password. Please try again.');
    }

    // Store user data in localStorage for UI
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data));
    }

    router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    setApiError(error.message || 'Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};




  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setApiError('');
    
    try {
      const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      // For Google OAuth, we need to redirect
      window.location.href = `${API_ENDPOINT}/auth/google`;
    } catch (error) {
      console.error('Google login error:', error);
      setApiError('Google login failed. Please try again.');
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignupRedirect = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm
          formData={formData}
          errors={errors}
          apiError={apiError}
          isLoading={isLoading}
          googleLoading={googleLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
          onForgotPassword={handleForgotPassword}
          onSignupRedirect={handleSignupRedirect}
        />
      </div>
    </div>
  );
};

export default LoginContainer;