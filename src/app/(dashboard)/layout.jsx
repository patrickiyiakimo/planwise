"use client";

import { usePathname } from 'next/navigation';
// import Sidebar from '@/app/(dashboard)/components/sidebar/Sidebar';
import { useState } from 'react';
import Sidebar from '../(website)/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Mock user data - in a real app, this would come from authentication
  const user = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    plan: 'Pro',
    avatar: 'AJ',
    university: 'Stanford University'
  };

  const handleLogout = () => {
    // Implement logout logic
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div >
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}