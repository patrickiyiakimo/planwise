"use client";

import React from 'react';
import { BookOpen, CheckCircle, Clock, Target, Award, Calendar } from 'lucide-react';

const CourseStats = ({ stats }) => {
  const statCards = [
    {
      id: 1,
      label: 'Total Courses',
      value: stats.total,
      icon: BookOpen,
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 3,
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 4,
      label: 'Planned',
      value: stats.planned,
      icon: Calendar,
      color: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 5,
      label: 'Total Credits',
      value: stats.totalCredits,
      icon: Target,
      color: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      id: 6,
      label: 'Current GPA',
      value: stats.currentGPA,
      icon: Award,
      color: 'bg-pink-50',
      textColor: 'text-pink-600'
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
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseStats;