"use client";

import React from 'react';
import { TrendingUp, Award, Calendar, Flame, Target } from 'lucide-react';

const ProgressWidget = ({ progress }) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600'
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm">
            <Flame className="w-4 h-4 text-orange-500 mr-1" />
            <span className="font-medium text-gray-700">{progress.streak} day streak</span>
          </div>
          <div className="flex items-center text-sm">
            <Target className="w-4 h-4 text-indigo-600 mr-1" />
            <span className="text-gray-600">{progress.totalHours}/{progress.weeklyTarget}h</span>
          </div>
        </div>
      </div>
      
      {/* Course Progress Bars */}
      <div className="space-y-4 mb-8">
        {progress.courses.map((course) => (
          <div key={course.id}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{course.code}</span>
                <span className="text-xs text-gray-500">{course.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${getGradeColor(course.grade)}`}>
                  {course.grade}
                </span>
                <span className="text-sm text-gray-600">{course.progress}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${colorClasses[course.color]} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Study Time */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Weekly Study Hours</h3>
          <div className="flex items-center text-green-600 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% vs last week</span>
          </div>
        </div>
        
        <div className="flex items-end justify-between h-40">
          {progress.weeklyStudyTime.map((day) => (
            <div key={day.day} className="flex flex-col items-center w-8">
              <div className="relative w-full flex justify-center mb-2 group">
                <div
                  className="w-6 bg-gradient-to-t from-indigo-600 to-blue-600 rounded-t-lg transition-all duration-500 group-hover:from-indigo-700 group-hover:to-blue-700"
                  style={{ height: `${day.hours * 8}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.hours} hours
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-600">{day.day}</span>
              <span className="text-xs font-medium text-gray-900">{day.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressWidget;