// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import LoginForm from '@/app/(website)/components/login/LoginForm';

// const LoginContainer = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Login successful:', formData.email);
//       router.push('/dashboard');
//     } catch (error) {
//       setErrors({ form: 'Invalid email or password. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setGoogleLoading(true);
    
//     // Simulate Google OAuth
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Google login successful');
//       router.push('/dashboard');
//     } catch (error) {
//       setErrors({ form: 'Google login failed. Please try again.' });
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   const handleForgotPassword = () => {
//     router.push('/forgot-password');
//   };

//   const handleSignupRedirect = () => {
//     router.push('/signup');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <LoginForm
//           formData={formData}
//           errors={errors}
//           isLoading={isLoading}
//           googleLoading={googleLoading}
//           onChange={handleChange}
//           onSubmit={handleSubmit}
//           onGoogleLogin={handleGoogleLogin}
//           onForgotPassword={handleForgotPassword}
//           onSignupRedirect={handleSignupRedirect}
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginContainer;



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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email or password. Please try again.';
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Store user data and token
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
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