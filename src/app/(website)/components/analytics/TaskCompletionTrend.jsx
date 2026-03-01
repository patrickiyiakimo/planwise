"use client";

import React from 'react';
import { CheckCircle, Clock, AlertCircle, TrendingUp, PieChart } from 'lucide-react';

const TaskCompletionTrend = ({ data, byPriority, onTimeRate }) => {
  const completionRate = Math.round(
    (data.reduce((acc, d) => acc + d.completed, 0) / 
     data.reduce((acc, d) => acc + d.total, 0)) * 100
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const maxCompleted = Math.max(...data.map(d => d.total));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Task Completion</h3>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            {onTimeRate}% On Time
          </span>
        </div>
      </div>

      {/* Completion Chart */}
      <div className="h-40 flex items-end space-x-2 mb-6">
        {data.slice(-10).map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full space-y-1">
              {/* Completed bar */}
              <div
                className="w-full bg-green-500 rounded-t-lg transition-all duration-300 group-hover:bg-green-600"
                style={{ height: `${(day.completed / maxCompleted) * 60}px` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.completed} completed
                </div>
              </div>
              {/* Pending bar */}
              {day.total > day.completed && (
                <div
                  className="w-full bg-yellow-500 rounded-t-lg transition-all duration-300 group-hover:bg-yellow-600"
                  style={{ height: `${((day.total - day.completed) / maxCompleted) * 60}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.total - day.completed} pending
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-2">{formatDate(day.date)}</span>
          </div>
        ))}
      </div>

      {/* Priority Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.entries(byPriority).map(([priority, stats]) => {
          const rate = Math.round((stats.completed / stats.total) * 100);
          const colors = {
            high: { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500' },
            medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: 'bg-yellow-500' },
            low: { bg: 'bg-green-100', text: 'text-green-700', bar: 'bg-green-500' }
          };
          const color = colors[priority] || colors.medium;

          return (
            <div key={priority} className="text-center">
              <span className={`text-xs font-medium ${color.text} mb-1 block`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
              <div className="text-lg font-bold text-gray-900">{stats.completed}/{stats.total}</div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-full ${color.bar} rounded-full`}
                  style={{ width: `${rate}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{completionRate}%</div>
            <div className="text-xs text-gray-500">Completion Rate</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{onTimeRate}%</div>
            <div className="text-xs text-gray-500">On-Time Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionTrend;