"use client";

import React from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, BarChart } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  
  const overdueTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    return dueDate < today && t.status !== 'completed';
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      id: 1,
      label: 'Total Tasks',
      value: totalTasks,
      icon: BarChart,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      label: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      iconColor: 'text-yellow-600'
    },
    {
      id: 4,
      label: 'Pending',
      value: pendingTasks,
      icon: AlertCircle,
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
      iconColor: 'text-orange-600'
    },
    {
      id: 5,
      label: 'High Priority',
      value: highPriorityTasks,
      icon: AlertCircle,
      color: 'bg-red-50',
      textColor: 'text-red-600',
      iconColor: 'text-red-600'
    },
    {
      id: 6,
      label: 'Overdue',
      value: overdueTasks,
      icon: Calendar,
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
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

export default TaskStats;