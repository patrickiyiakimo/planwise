"use client";

import React from 'react';
import { CheckCircle, FileText, Users, PlusCircle, Clock } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'summary_created':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'group_joined':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'task_added':
        return <PlusCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'task_completed':
        return 'bg-green-100';
      case 'summary_created':
        return 'bg-indigo-100';
      case 'group_joined':
        return 'bg-purple-100';
      case 'task_added':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 ${getActivityBgColor(activity.type)} rounded-lg flex items-center justify-center`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{activity.user}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div className="mt-6 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-indigo-600">AI Insight:</span> You're most productive between 10 AM and 12 PM. Consider scheduling important tasks during this time.
        </p>
      </div>
    </div>
  );
};

export default ActivityFeed;