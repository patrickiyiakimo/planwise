"use client";

import React from 'react';
import { Users, Calendar, Clock, Plus, ChevronRight } from 'lucide-react';

const StudyGroupsWidget = ({ groups, onJoinGroup, onStartSession }) => {
  const formatMeetingTime = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Study Groups</h2>
          <p className="text-sm text-gray-500">Collaborate with peers</p>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
          Browse all
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
              <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                {group.course}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1" />
                {group.members} members
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {formatMeetingTime(group.nextMeeting)}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onJoinGroup(group.id)}
                className="flex-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Join Group
              </button>
              <button
                onClick={onStartSession}
                className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Clock className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center justify-center">
        <Plus className="w-4 h-4 mr-2" />
        Create New Study Group
      </button>
    </div>
  );
};

export default StudyGroupsWidget;