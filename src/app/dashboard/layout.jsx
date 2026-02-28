// import DashboardContainer from '@/containers/dashboard/DashboardContainer';

import DashboardContainer from "@/containers/dashboard/DashboardContainer";

export const metadata = {
  title: 'Dashboard - Planwise | Student Planning App',
  description: 'Your personalized dashboard to manage courses, tasks, study progress, and AI-powered PDF summaries.',
};

export default function DashboardLayout({ children }) {
  return <DashboardContainer>{children}</DashboardContainer>;
}