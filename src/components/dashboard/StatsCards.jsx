"use client";

import React from 'react';

import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  Target,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

const StatsCards = ({ stats }) => {
  const statCards = [
    {
      id: 1,
      label: 'Active Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+2',
      changeType: 'increase'
    },
    {
      id: 2,
      label: 'Completed Tasks',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+12',
      changeType: 'increase'
    },
    {
      id: 3,
      label: 'Pending Tasks',
      value: stats.pendingTasks,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      change: '-3',
      changeType: 'decrease'
    },
    {
      id: 4,
      label: 'Study Hours',
      value: stats.studyHours,
      icon: Target,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+5.5',
      changeType: 'increase'
    },
    {
      id: 5,
      label: 'PDF Summaries',
      value: stats.pdfSummaries,
      icon: FileText,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      change: '+3',
      changeType: 'increase'
    },
    {
      id: 6,
      label: 'Average Grade',
      value: `${stats.averageGrade}%`,
      icon: Award,
      color: 'pink',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      change: '+4%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <span className={`
                text-xs font-medium px-1.5 py-0.5 rounded-full
                ${stat.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
              `}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;