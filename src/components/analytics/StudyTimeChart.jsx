"use client";

import React, { useState } from 'react';
import { Clock, TrendingUp, Calendar, Zap } from 'lucide-react';

const StudyTimeChart = ({ daily, weekly, productivity }) => {
  const [timeframe, setTimeframe] = useState('daily'); // 'daily', 'weekly'

  const maxDaily = Math.max(...daily.map(d => d.hours));
  const maxWeekly = Math.max(...weekly.map(w => w.hours));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Study Time</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              timeframe === 'daily' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              timeframe === 'weekly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end space-x-2">
        {timeframe === 'daily' ? (
          daily.slice(-14).map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-blue-600 rounded-t-lg transition-all duration-300 group-hover:from-indigo-700 group-hover:to-blue-700"
                  style={{ height: `${(day.hours / maxDaily) * 150}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.hours} hours
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{formatDate(day.date)}</span>
            </div>
          ))
        ) : (
          weekly.map((week, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-blue-600 rounded-t-lg transition-all duration-300 group-hover:from-indigo-700 group-hover:to-blue-700"
                  style={{ height: `${(week.hours / maxWeekly) * 150}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {week.hours}h
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{week.week}</span>
            </div>
          ))
        )}
      </div>

      {/* Productivity Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <Clock className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">{productivity.averageDaily}h</div>
          <div className="text-xs text-gray-500">Daily Avg</div>
        </div>
        <div className="text-center">
          <TrendingUp className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">{productivity.mostProductiveDay}</div>
          <div className="text-xs text-gray-500">Best Day</div>
        </div>
        <div className="text-center">
          <Zap className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">{productivity.bestTime}</div>
          <div className="text-xs text-gray-500">Peak Time</div>
        </div>
        <div className="text-center">
          <Calendar className="w-4 h-4 text-purple-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">{productivity.consistency}%</div>
          <div className="text-xs text-gray-500">Consistency</div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimeChart;