// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SignupForm from '@/app/(website)/components/signup/SignupForm';
// import SignupImage from '@/app/(website)/components/signup/SignupImage';

// const SignupContainer = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false
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

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.acceptTerms) {
//       newErrors.acceptTerms = 'You must accept the terms and conditions';
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
//       console.log('Signup successful:', formData.email);
//       router.push('/dashboard');
//     } catch (error) {
//       setErrors({ form: 'Signup failed. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setGoogleLoading(true);
    
//     // Simulate Google OAuth
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       console.log('Google signup successful');
//       router.push('/dashboard');
//     } catch (error) {
//       setErrors({ form: 'Google signup failed. Please try again.' });
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   const handleLoginRedirect = () => {
//     router.push('/login');
//   };

//   const imageData = {
//     src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
//     alt: "Professional student working productively on laptop in modern workspace"
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="flex min-h-screen">
//         {/* Left Side - Signup Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
//           <SignupForm
//             formData={formData}
//             errors={errors}
//             isLoading={isLoading}
//             googleLoading={googleLoading}
//             onChange={handleChange}
//             onSubmit={handleSubmit}
//             onGoogleSignup={handleGoogleSignup}
//             onLoginRedirect={handleLoginRedirect}
//           />
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600">
//           <SignupImage imageData={imageData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupContainer;


// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SignupForm from '@/app/(website)/components/signup/SignupForm';
// import SignupImage from '@/app/(website)/components/signup/SignupImage';

// const SignupContainer = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [apiError, setApiError] = useState('');

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
//     // Clear API error when user makes changes
//     if (apiError) {
//       setApiError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.acceptTerms) {
//       newErrors.acceptTerms = 'You must accept the terms and conditions';
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
//     setApiError('');

//     try {
//       const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      
//       const response = await fetch(`${API_ENDPOINT}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Signup failed. Please try again.');
//       }

//       // Store user data and token in localStorage/session
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//       }

//       console.log('Signup successful:', data);
//       router.push('/dashboard');
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       setApiError(error.message || 'Signup failed. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setGoogleLoading(true);
//     setApiError('');
    
//     try {
//       const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      
//       // Redirect to Google OAuth endpoint
//       window.location.href = `${API_ENDPOINT}/auth/google`;
      
//     } catch (error) {
//       console.error('Google signup error:', error);
//       setApiError('Google signup failed. Please try again.');
//       setGoogleLoading(false);
//     }
//   };

//   const handleLoginRedirect = () => {
//     router.push('/login');
//   };

//   const imageData = {
//     src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
//     alt: "Professional student working productively on laptop in modern workspace"
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="flex min-h-screen">
//         {/* Left Side - Signup Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
//           <SignupForm
//             formData={formData}
//             errors={errors}
//             apiError={apiError}
//             isLoading={isLoading}
//             googleLoading={googleLoading}
//             onChange={handleChange}
//             onSubmit={handleSubmit}
//             onGoogleSignup={handleGoogleSignup}
//             onLoginRedirect={handleLoginRedirect}
//           />
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600">
//           <SignupImage imageData={imageData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupContainer;








// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SignupForm from '@/app/(website)/components/signup/SignupForm';
// import SignupImage from '@/app/(website)/components/signup/SignupImage';

// const SignupContainer = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [apiError, setApiError] = useState('');

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
//     // Clear API error when user makes changes
//     if (apiError) {
//       setApiError('');
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullname.trim()) {
//       newErrors.fullname = 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     if (!formData.acceptTerms) {
//       newErrors.acceptTerms = 'You must accept the terms and conditions';
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
//     setApiError('');

//     try {
//       const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      
//       const response = await fetch(`${API_ENDPOINT}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullname: formData.fullname, // Note: backend expects "fullname"
//           email: formData.email,
//           password: formData.password,
//           confirm_password: formData.confirmPassword, // Add this if your backend expects it
//           accept_terms: formData.acceptTerms
//         }),
//         credentials: 'include' // Important: This ensures cookies are sent and received
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Signup failed. Please try again.');
//       }

//       // Store user data if needed (though tokens are in HTTP-only cookies)
//       if (data.data) {
//         localStorage.setItem('user', JSON.stringify(data.data));
//       }

//       console.log('Signup successful:', data);
//       router.push('/dashboard');
      
//     } catch (error) {
//       console.error('Signup error:', error);
//       setApiError(error.message || 'Signup failed. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setGoogleLoading(true);
//     setApiError('');
    
//     try {
//       const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      
//       // Redirect to Google OAuth endpoint
//       window.location.href = `${API_ENDPOINT}/auth/google`;
      
//     } catch (error) {
//       console.error('Google signup error:', error);
//       setApiError('Google signup failed. Please try again.');
//       setGoogleLoading(false);
//     }
//   };

//   const handleLoginRedirect = () => {
//     router.push('/login');
//   };

//   const imageData = {
//     src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
//     alt: "Professional student working productively on laptop in modern workspace"
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="flex min-h-screen">
//         {/* Left Side - Signup Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
//           <SignupForm
//             formData={formData}
//             errors={errors}
//             apiError={apiError}
//             isLoading={isLoading}
//             googleLoading={googleLoading}
//             onChange={handleChange}
//             onSubmit={handleSubmit}
//             onGoogleSignup={handleGoogleSignup}
//             onLoginRedirect={handleLoginRedirect}
//           />
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600">
//           <SignupImage imageData={imageData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupContainer;





"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/app/(website)/components/signup/SignupForm';
import SignupImage from '@/app/(website)/components/signup/SignupImage';

const SignupContainer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // IMPORTANT: For checkboxes, use 'checked' instead of 'value'
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

    if (!formData.fullname?.trim()) {
      newErrors.fullname = 'Full name is required';
    }

    if (!formData.email?.trim()) {
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

    // IMPORTANT: Check if acceptTerms is true (not false)
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
    setApiError('');

    try {
      const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_ENDPOINT}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          accept_terms: formData.acceptTerms // This will be true/false
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed. Please try again.');
      }

      if (data.data) {
        localStorage.setItem('user', JSON.stringify(data.data));
      }

      console.log('Signup successful:', data);
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Signup error:', error);
      setApiError(error.message || 'Signup failed. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setApiError('');
    
    try {
      const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';
      window.location.href = `${API_ENDPOINT}/auth/google`;
    } catch (error) {
      console.error('Google signup error:', error);
      setApiError('Google signup failed. Please try again.');
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

  // Add console log to debug
  console.log('Current formData:', formData);
  console.log('Current errors:', errors);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <SignupForm
            formData={formData}
            errors={errors}
            apiError={apiError}
            isLoading={isLoading}
            googleLoading={googleLoading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onGoogleSignup={handleGoogleSignup}
            onLoginRedirect={handleLoginRedirect}
          />
        </div>
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-600">
          <SignupImage imageData={imageData} />
        </div>
      </div>
    </div>
  );
};

export default SignupContainer;