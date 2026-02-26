"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const navItems = [
    { id: 'home', href: '/#home', label: 'Home', isHash: true },
    { id: 'about', href: '/#about', label: 'About', isHash: true },
    { id: 'pricing', href: '/#pricing', label: 'Pricing', isHash: true },
    { id: 'faq', href: '/faq', label: 'FAQ', isHash: false },
  ];

  // Handle scroll effect only on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active link based on scroll position
      const sections = navItems
        .filter(item => item.isHash)
        .map(link => ({
          id: link.id,
          element: document.getElementById(link.id)
        }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle scroll effect on route change
  useEffect(() => {
    setIsScrolled(window.scrollY > 20);
  }, [pathname]);

  // Handle navigation
  const handleNavigation = (e, item) => {
    e.preventDefault();
    
    if (item.isHash) {
      // For hash links (homepage sections)
      if (isHomePage) {
        // Already on homepage, just scroll
        smoothScrollToSection(item.id);
      } else {
        // Navigate to homepage then scroll
        router.push(`/?scrollTo=${item.id}`);
      }
    } else {
      // For regular page links (FAQ)
      router.push(item.href);
    }
    
    // Close mobile menu
    setIsMenuOpen(false);
  };

  // Smooth scroll to section
  const smoothScrollToSection = (sectionId) => {
    setActiveLink(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll on page load when coming from another page
  useEffect(() => {
    if (isHomePage) {
      const urlParams = new URLSearchParams(window.location.search);
      const scrollTo = urlParams.get('scrollTo');
      
      if (scrollTo) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          smoothScrollToSection(scrollTo);
          // Clean up URL
          router.replace('/', undefined, { shallow: true });
        }, 100);
      }
    }
  }, [isHomePage, router]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
        }
      `}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                router.push('/');
              }}
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative bg-white rounded-lg p-1.5">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                planwise
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
                    ${!item.isHash && pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : item.isHash && activeLink === item.id && isHomePage
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="flex items-center space-x-1">
                    <span>{item.label}</span>
                    {item.id === 'faq' && pathname !== '/faq' && (
                      <span>
                       
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
             <Link href="/login">
              <button 
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log in
              </button>
             </Link>
              <Link href="/signup">
              <button 
                onClick={() => router.push('/signup')}
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign up free
              </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300
          md:hidden
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Slide-out */}
      <div className={`
        fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        md:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="font-semibold text-gray-900">Planwise</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavigation(e, item)}
                className={`
                  flex items-center justify-between px-4 py-3 text-base font-medium transition-all
                  ${!item.isHash && pathname === item.href
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : item.isHash && activeLink === item.id && isHomePage
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <span>{item.label}</span>
                {item.id === 'faq' && pathname !== '/faq' && (
                  <span >
                    
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="p-4 border-t border-gray-100 space-y-3">
            <button 
              onClick={() => {
                router.push('/login');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => {
                router.push('/signup');
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
            >
              Sign up free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;