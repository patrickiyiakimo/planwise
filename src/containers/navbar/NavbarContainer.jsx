// "use client";

// import React, { useState, useEffect, useCallback } from 'react';
// import Navbar from '../../components/navbar/Navbar';

// const NavbarContainer = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeLink, setActiveLink] = useState('home');

//   const navItems = [
//     { id: 'home', href: '#home', label: 'Home' },
//     { id: 'About', href: '#About', label: 'About' },
//     { id: 'pricing', href: '#pricing', label: 'Pricing' },
//     { id: 'faq', href: '#faq', label: 'Faq' },
//   ];

//   // Memoize the setIsMenuOpen function to ensure it remains stable
//   const toggleMenu = useCallback((value) => {
//     setIsMenuOpen(value);
//   }, []);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
      
//       // Update active link based on scroll position
//       const sections = navItems.map(link => ({
//         id: link.id,
//         element: document.getElementById(link.id)
//       }));

//       for (const section of sections) {
//         if (section.element) {
//           const rect = section.element.getBoundingClientRect();
//           if (rect.top <= 100 && rect.bottom >= 100) {
//             setActiveLink(section.id);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [navItems]);

//   // Handle link click
//   const handleLinkClick = useCallback((e, linkId) => {
//     e.preventDefault();
//     setActiveLink(linkId);
    
//     const element = document.getElementById(linkId);
//     if (element) {
//       const offset = 80; // Height of fixed navbar
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//     }
    
//     // Close mobile menu if open
//     if (isMenuOpen) {
//       toggleMenu(false);
//     }
//   }, [isMenuOpen, toggleMenu]);

//   // Close mobile menu on window resize (if screen becomes larger)
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && isMenuOpen) {
//         toggleMenu(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isMenuOpen, toggleMenu]);

//   // Log to verify setIsMenuOpen is a function
//   console.log('Container - setIsMenuOpen type:', typeof setIsMenuOpen);

//   return (
//     <Navbar
//       isMenuOpen={isMenuOpen}
//       setIsMenuOpen={toggleMenu}
//       isScrolled={isScrolled}
//       activeLink={activeLink}
//       handleLinkClick={handleLinkClick}
//       navItems={navItems}
//     />
//   );
// };

// export default NavbarContainer;