"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StudyGroupsWidget from '@/app/(website)/components/dashboard/StudyGroupsWidget';
import CalendarWidget from '@/app/(website)/components/dashboard/CalendarWidget';
import ActivityFeed from '@/app/(website)/components/dashboard/ActivityFeed';
import SummariesWidget from '@/app/(website)/components/dashboard/SummariesWidget';
import ProgressWidget from '@/app/(website)/components/dashboard/ProgressWidget';
import TasksWidget from '@/app/(website)/components/dashboard/TasksWidget';
import StatsCards from '@/app/(website)/components/dashboard/StatsCards';
import Sidebar from '@/app/(website)/components/dashboard/Sidebar';
import Header from '@/app/(website)/components/dashboard/Header';
// import Sidebar from '@/components/dashboard/Sidebar';
// import Header from '@/components/dashboard/Header';
// import StatsCards from '@/components/dashboard/StatsCards';
// import TasksWidget from '@/components/dashboard/TasksWidget';
// import SummariesWidget from '@/components/dashboard/SummariesWidget';
// import ProgressWidget from '@/components/dashboard/ProgressWidget';
// import CalendarWidget from '@/components/dashboard/CalendarWidget';
// import ActivityFeed from '@/components/dashboard/ActivityFeed';
// import StudyGroupsWidget from '@/components/dashboard/StudyGroupsWidget';

const DashboardContainer = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    tasks: [],
    summaries: [],
    progress: {},
    calendar: [],
    activity: [],
    studyGroups: []
  });

  // Check if we're on the main dashboard page
  const isMainDashboard = pathname === '/dashboard';

  // Simulate fetching user data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      setUser({
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        plan: 'Pro',
        avatar: 'AJ',
        joinDate: '2024-01-15',
        university: 'Stanford University',
        course: 'Computer Science',
        year: '3rd Year'
      });

      // Mock dashboard data
      setDashboardData({
        stats: {
          totalCourses: 6,
          completedTasks: 24,
          pendingTasks: 8,
          studyHours: 42,
          pdfSummaries: 15,
          upcomingDeadlines: 3,
          averageGrade: 87,
          studyGroups: 4
        },
        tasks: [
          {
            id: 't1',
            title: 'Calculus III - Problem Set 7',
            course: 'MATH 301',
            dueDate: '2024-03-25T23:59:00',
            priority: 'high',
            status: 'pending',
            courseColor: 'blue'
          },
          {
            id: 't2',
            title: 'Read Chapter 5: Quantum Mechanics',
            course: 'PHYS 202',
            dueDate: '2024-03-23T23:59:00',
            priority: 'medium',
            status: 'pending',
            courseColor: 'green'
          },
          {
            id: 't3',
            title: 'Submit Research Paper Draft',
            course: 'ENGL 210',
            dueDate: '2024-03-28T23:59:00',
            priority: 'high',
            status: 'pending',
            courseColor: 'purple'
          },
          {
            id: 't4',
            title: 'Group Meeting - Project Alpha',
            course: 'CS 450',
            dueDate: '2024-03-22T15:00:00',
            priority: 'medium',
            status: 'pending',
            courseColor: 'yellow'
          },
          {
            id: 't5',
            title: 'Review for Midterm Exam',
            course: 'BIOL 110',
            dueDate: '2024-03-30T09:00:00',
            priority: 'low',
            status: 'pending',
            courseColor: 'red'
          }
        ],
        summaries: [
          {
            id: 's1',
            title: 'Machine Learning Fundamentals',
            fileName: 'ml_lecture_notes.pdf',
            date: '2024-03-20',
            pages: 24,
            summary: 'This document covers supervised learning algorithms including linear regression, decision trees, and neural networks...',
            tokens: 1250,
            course: 'CS 450'
          },
          {
            id: 's2',
            title: 'Organic Chemistry Reactions',
            fileName: 'ochem_chapter_7.pdf',
            date: '2024-03-18',
            pages: 18,
            summary: 'Chapter 7 focuses on alkene reactions including addition, elimination, and substitution mechanisms with detailed mechanisms...',
            tokens: 980,
            course: 'CHEM 210'
          },
          {
            id: 's3',
            title: 'Renaissance Art History',
            fileName: 'arthist_lecture_12.pdf',
            date: '2024-03-15',
            pages: 32,
            summary: 'This lecture examines the works of Michelangelo, Leonardo da Vinci, and Raphael during the High Renaissance period...',
            tokens: 1560,
            course: 'ARTH 101'
          }
        ],
        progress: {
          courses: [
            { id: 'c1', code: 'MATH 301', name: 'Calculus III', progress: 75, color: 'blue', grade: 'B+' },
            { id: 'c2', code: 'PHYS 202', name: 'Physics II', progress: 45, color: 'green', grade: 'C+' },
            { id: 'c3', code: 'CS 450', name: 'Machine Learning', progress: 90, color: 'purple', grade: 'A-' },
            { id: 'c4', code: 'ENGL 210', name: 'Technical Writing', progress: 60, color: 'yellow', grade: 'B' },
            { id: 'c5', code: 'BIOL 110', name: 'Biology', progress: 30, color: 'red', grade: 'C' }
          ],
          weeklyStudyTime: [
            { day: 'Mon', hours: 3.5, date: '2024-03-18' },
            { day: 'Tue', hours: 4.0, date: '2024-03-19' },
            { day: 'Wed', hours: 2.5, date: '2024-03-20' },
            { day: 'Thu', hours: 5.0, date: '2024-03-21' },
            { day: 'Fri', hours: 3.0, date: '2024-03-22' },
            { day: 'Sat', hours: 2.0, date: '2024-03-23' },
            { day: 'Sun', hours: 1.5, date: '2024-03-24' }
          ],
          totalHours: 21.5,
          weeklyTarget: 25,
          streak: 12
        },
        calendar: [
          { date: '2024-03-22', events: ['Group Meeting - CS450', 'Physics Study Session'] },
          { date: '2024-03-23', events: ['Physics Assignment Due', 'Calculus Tutoring'] },
          { date: '2024-03-24', events: ['Study Group - BIOL110'] },
          { date: '2024-03-25', events: ['Calculus Problem Set Due', 'ML Project Review'] }
        ],
        activity: [
          { id: 'a1', type: 'task_completed', title: 'Completed Calculus homework', time: '2 hours ago', user: 'You' },
          { id: 'a2', type: 'summary_created', title: 'Created AI summary for ML lecture', time: '5 hours ago', user: 'You' },
          { id: 'a3', type: 'group_joined', title: 'Joined Physics study group', time: '1 day ago', user: 'You' },
          { id: 'a4', type: 'task_added', title: 'Added new task: Research paper', time: '2 days ago', user: 'You' }
        ],
        studyGroups: [
          { id: 'g1', name: 'Machine Learning Study Group', members: 8, nextMeeting: '2024-03-25T15:00:00', course: 'CS 450' },
          { id: 'g2', name: 'Physics Problem Solvers', members: 6, nextMeeting: '2024-03-23T14:00:00', course: 'PHYS 202' },
          { id: 'g3', name: 'Calculus III Tutorial', members: 5, nextMeeting: '2024-03-24T10:00:00', course: 'MATH 301' }
        ]
      });
      
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleTaskComplete = (taskId) => {
    console.log('Task completed:', taskId);
    setDashboardData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      ),
      stats: {
        ...prev.stats,
        completedTasks: prev.stats.completedTasks + 1,
        pendingTasks: prev.stats.pendingTasks - 1
      }
    }));
  };

  const handleViewSummary = (summaryId) => {
    router.push(`/dashboard/summaries/${summaryId}`);
  };

  const handleCreateSummary = () => {
    router.push('/dashboard/upload-pdf');
  };

  const handleAddTask = () => {
    router.push('/dashboard/tasks/new');
  };

  const handleViewAllTasks = () => {
    router.push('/dashboard/tasks');
  };

  const handleViewAllSummaries = () => {
    router.push('/dashboard/summaries');
  };

  const handleJoinStudyGroup = (groupId) => {
    console.log('Joining study group:', groupId);
  };

  const handleStartStudySession = () => {
    router.push('/dashboard/study-session');
  };

  const handleLogout = () => {
    router.push('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        onLogout={handleLogout}
        currentPath={pathname}
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header
          user={user}
          onToggleSidebar={toggleSidebar}
        />

        <main className="p-6">
          {isMainDashboard ? (
            // Main Dashboard View
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
                <p className="text-indigo-100">Here's your academic overview for today. You're making great progress!</p>
              </div>

              {/* Stats Cards */}
              <StatsCards stats={dashboardData.stats} />

              {/* Main Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Tasks and Progress */}
                <div className="lg:col-span-2 space-y-6">
                  <TasksWidget
                    tasks={dashboardData.tasks}
                    onTaskComplete={handleTaskComplete}
                    onViewAll={handleViewAllTasks}
                    onAddTask={handleAddTask}
                  />
                  
                  <ProgressWidget progress={dashboardData.progress} />
                </div>
                
                {/* Right Column - Summaries and Activity */}
                <div className="space-y-6">
                  <SummariesWidget
                    summaries={dashboardData.summaries}
                    onViewSummary={handleViewSummary}
                    onViewAll={handleViewAllSummaries}
                    onCreateNew={handleCreateSummary}
                  />
                  
                  <ActivityFeed activities={dashboardData.activity} />
                </div>
              </div>

              {/* Bottom Grid - Calendar and Study Groups */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CalendarWidget events={dashboardData.calendar} />
                <StudyGroupsWidget
                  groups={dashboardData.studyGroups}
                  onJoinGroup={handleJoinStudyGroup}
                  onStartSession={handleStartStudySession}
                />
              </div>
            </div>
          ) : (
            // Child Pages (Tasks, Summaries, etc.)
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardContainer;