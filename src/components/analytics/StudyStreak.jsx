"use client";

import React from 'react';
import { Flame, Calendar, Award, TrendingUp } from 'lucide-react';

const StudyStreak = ({ data }) => {
  const getStreakColor = (days) => {
    if (days >= 20) return 'text-orange-600';
    if (days >= 10) return 'text-orange-500';
    if (days >= 5) return 'text-orange-400';
    return 'text-orange-300';
  };

  const maxDays = Math.max(...data.history.map(h => h.days));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Study Streak</h3>
        <div className="flex items-center space-x-1">
          <Flame className={`w-5 h-5 ${getStreakColor(data.current)}`} />
          <span className="text-2xl font-bold text-gray-900">{data.current}</span>
          <span className="text-sm text-gray-500">days</span>
        </div>
      </div>

      {/* Streak History */}
      <div className="flex items-end justify-between h-24 mb-4">
        {data.history.map((week, index) => (
          <div key={index} className="flex flex-col items-center w-8">
            <div className="relative w-full">
              <div
                className={`w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-300`}
                style={{ height: `${(week.days / maxDays) * 60}px` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {week.days} days
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-2">{week.week}</span>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Flame className={`w-4 h-4 ${getStreakColor(data.current)}`} />
            <span className="text-lg font-bold text-gray-900">{data.current}</span>
          </div>
          <div className="text-xs text-gray-500">Current</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Award className="w-4 h-4 text-yellow-600" />
            <span className="text-lg font-bold text-gray-900">{data.longest}</span>
          </div>
          <div className="text-xs text-gray-500">Longest</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">{data.thisWeek}</span>
          </div>
          <div className="text-xs text-gray-500">This Week</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">{data.consistency}%</span>
          </div>
          <div className="text-xs text-gray-500">Consistency</div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange-700 text-center">
          {data.current >= 20 
            ? "🔥 Incredible! You're on fire! Keep up the amazing consistency!"
            : data.current >= 10
            ? "🌟 Great job! You've built a strong study habit. Push for 20!"
            : data.current >= 5
            ? "💪 Good start! Keep the momentum going to build your streak."
            : "🌱 Every day counts. Start your streak today!"}
        </p>
      </div>
    </div>
  );
};

export default StudyStreak;