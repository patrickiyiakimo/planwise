// "use client";

// import React from 'react';
// import Link from 'next/link';
// import { 
//   LayoutDashboard, 
//   CheckSquare, 
//   FileText, 
//   BookOpen, 
//   Users, 
//   Settings, 
//   HelpCircle, 
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Calendar,
//   BarChart,
//   MessageSquare
// } from 'lucide-react';

// const Sidebar = ({ user, collapsed, onToggle, onLogout, currentPath }) => {
//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//     { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, badge: '8' },
//     { name: 'PDF Summaries', href: '/dashboard/summaries', icon: FileText, badge: 'AI' },
//     { name: 'Maths Solver', href: '/dashboard/maths-solver', icon: BookOpen, badge: 'AI' },
//     { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
//     { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
//     // { name: 'Study Groups', href: '/dashboard/groups', icon: Users },
//     { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
//   ];

//   const secondaryNavigation = [
//     { name: 'Settings', href: '/dashboard/settings', icon: Settings },
//     { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
//   ];

//   return (
//     <aside 
//       className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-50
//         ${collapsed ? 'w-16 md:w-20' : 'w-64'}`}
//     >
//       {/* Logo */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
//         <Link href="/dashboard" className="flex items-center space-x-2">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40"></div>
//             {/* <div className="relative bg-white rounded-lg p-1.5">
//               <Sparkles className="w-5 h-5 text-blue-600" />
//             </div> */}
//           </div>
//           {!collapsed && (
//             <span className="font-bold text-gray-900">planwise</span>
//           )}
//         </Link>
        
//         <button
//           onClick={onToggle}
//           className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
//         >
//           {collapsed ? (
//             <ChevronRight className="w-6 h-6 text-gray-600" />
//           ) : (
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           )}
//         </button>
//       </div>

//       {/* User Info */}
//       {!collapsed && (
//         <div className="p-4 border-b border-gray-100">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
//               {user.avatar}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
//               <p className="text-xs text-gray-500 truncate">{user.university}</p>
//               <div className="mt-1">
//                 <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
//                   {user.plan}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {collapsed && (
//         <div className="p-4 flex justify-center border-b border-gray-100">
//           <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
//             {user.avatar}
//           </div>
//         </div>
//       )}

//       {/* Main Navigation */}
//       <nav className="p-4 space-y-1">
//         {navigation.map((item) => {
//           const Icon = item.icon;
//           const isActive = currentPath === item.href;
          
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`
//                 flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg transition-all
//                 ${isActive 
//                   ? 'bg-indigo-50 text-indigo-600' 
//                   : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                 }
//               `}
//             >
//               <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
//               {!collapsed && (
//                 <>
//                   <span className="text-sm font-medium flex-1">{item.name}</span>
//                   {item.badge && (
//                     <span className={`
//                       px-1.5 py-0.5 text-xs font-medium rounded-full
//                       ${item.badge === 'AI' 
//                         ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
//                         : 'bg-indigo-100 text-indigo-700'
//                       }
//                     `}>
//                       {item.badge}
//                     </span>
//                   )}
//                 </>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Secondary Navigation */}
//       <nav className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
//         {secondaryNavigation.map((item) => {
//           const Icon = item.icon;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`
//                 flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
//                 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors
//               `}
//             >
//               <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
//               {!collapsed && (
//                 <span className="text-sm font-medium">{item.name}</span>
//               )}
//             </Link>
//           );
//         })}
        
//         <button
//           onClick={onLogout}
//           className={`
//             w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
//             text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-2
//           `}
//         >
//           <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
//           {!collapsed && (
//             <span className="text-sm bg-red-400 py-3 text-white w-full font-medium hover:bg-red-300">Logout</span>
//           )}
//         </button>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;




"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  BookOpen, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  BarChart,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ user, collapsed, onToggle, onLogout, currentPath }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentPath]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, badge: '8' },
    { name: 'PDF Summaries', href: '/dashboard/summaries', icon: FileText, badge: 'AI' },
    { name: 'Maths Solver', href: '/dashboard/maths-solver', icon: BookOpen, badge: 'AI' },
    { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  ];

  const secondaryNavigation = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ];

  // Mobile View - Completely hidden, only hamburger menu visible
  if (isMobile) {
    return (
      <>
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar - slides in from left */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-64 bg-white  z-50 transform transition-transform duration-300 ease-in-out
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-4 border-b border-gray-100">
            <Link href="/dashboard" className="flex items-center space-x-2" onClick={() => setIsMobileOpen(false)}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40"></div>
                <div className="relative bg-white rounded-lg p-1.5">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <span className="font-bold text-gray-900">planwise</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.university}</p>
                <div className="mt-1">
                  <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    {user.plan}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center justify-start px-3 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span className={`
                      px-1.5 py-0.5 text-xs font-medium rounded-full
                      ${item.badge === 'AI' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-indigo-100 text-indigo-700'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Navigation */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <button
              onClick={() => {
                onLogout();
                setIsMobileOpen(false);
              }}
              className="w-full flex items-center px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-2"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>
      </>
    );
  }

  // Tablet View (768px - 1023px) - Collapsible with icons always visible
  if (isTablet) {
    return (
      <aside 
        className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-50 hidden md:block lg:hidden
          ${collapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40"></div>
              <div className="relative bg-white rounded-lg p-1.5">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            {!collapsed && (
              <span className="font-bold text-gray-900">planwise</span>
            )}
          </Link>
          
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* User Info - Show avatar only when collapsed */}
        {!collapsed ? (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.university}</p>
                <div className="mt-1">
                  <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    {user.plan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 flex justify-center border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
              {user.avatar}
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={`
                        px-1.5 py-0.5 text-xs font-medium rounded-full
                        ${item.badge === 'AI' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-indigo-100 text-indigo-700'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
                  text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-1
                `}
              >
                <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
          
          <button
            onClick={onLogout}
            className={`
              w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
              text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-2
            `}
          >
            <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    );
  }

  // Desktop View (1024px and above) - Original layout
  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white shadow-xl transition-all duration-300 z-50 hidden lg:block
        ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-40"></div>
            <div className="relative bg-white rounded-lg p-1.5">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          {!collapsed && (
            <span className="font-bold text-gray-900">planwise</span>
          )}
        </Link>
        
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.university}</p>
              <div className="mt-1">
                <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                  {user.plan}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-4 flex justify-center border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
            {user.avatar}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg transition-all
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span className={`
                      px-1.5 py-0.5 text-xs font-medium rounded-full
                      ${item.badge === 'AI' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-indigo-100 text-indigo-700'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
                text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-1
              `}
            >
              <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
        
        <button
          onClick={onLogout}
          className={`
            w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-3 py-2 rounded-lg
            text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-2
          `}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;