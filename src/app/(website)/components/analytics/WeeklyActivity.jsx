"use client";

import React from 'react';
import { Calendar, Clock, CheckCircle, Zap } from 'lucide-react';

const WeeklyActivity = ({ data }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getActivityColor = (value, max) => {
    const intensity = (value / max) * 100;
    if (intensity >= 80) return 'bg-indigo-600';
    if (intensity >= 60) return 'bg-indigo-500';
    if (intensity >= 40) return 'bg-indigo-400';
    if (intensity >= 20) return 'bg-indigo-300';
    return 'bg-indigo-200';
  };

  const maxStudy = Math.max(...days.map(d => data[d]?.study || 0));
  const maxTasks = Math.max(...days.map(d => data[d]?.tasks || 0));
  const maxFocus = Math.max(...days.map(d => data[d]?.focus || 0));

  const totalStudy = days.reduce((acc, d) => acc + (data[d]?.study || 0), 0);
  const totalTasks = days.reduce((acc, d) => acc + (data[d]?.tasks || 0), 0);
  const avgFocus = Math.round(days.reduce((acc, d) => acc + (data[d]?.focus || 0), 0) / days.length);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Heatmap</h3>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {/* Day Labels */}
        {dayLabels.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 mb-2">
            {day}
          </div>
        ))}

        {/* Study Hours Heatmap */}
        {days.map((day, index) => (
          <div key={`study-${index}`} className="text-center">
            <div className="relative group">
              <div
                className={`w-full h-12 ${getActivityColor(data[day]?.study || 0, maxStudy)} rounded-lg transition-all duration-300`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {data[day]?.study || 0} hours studied
                </div>
              </div>
              <span className="text-xs text-gray-600 mt-1 block">{data[day]?.study || 0}h</span>
            </div>
          </div>
        ))}

        {/* Tasks Heatmap */}
        {days.map((day, index) => (
          <div key={`tasks-${index}`} className="text-center">
            <div className="relative group">
              <div
                className={`w-full h-8 ${getActivityColor(data[day]?.tasks || 0, maxTasks)} rounded-lg transition-all duration-300`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data[day]?.tasks || 0} tasks
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Focus Score Heatmap */}
        {days.map((day, index) => (
          <div key={`focus-${index}`} className="text-center">
            <div className="relative group">
              <div
                className={`w-full h-8 ${getActivityColor(data[day]?.focus || 0, maxFocus)} rounded-lg transition-all duration-300`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {data[day]?.focus || 0}% focus
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-200 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Low</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Clock className="w-3 h-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-600">{totalStudy}h total</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-600">{totalTasks} tasks</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-3 h-3 text-gray-400 mr-1" />
            <span className="text-xs text-gray-600">{avgFocus}% avg focus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;