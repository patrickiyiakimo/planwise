"use client";

import React from 'react';
import { BookOpen, TrendingUp, Clock } from 'lucide-react';

const SubjectPerformance = ({ data, studyHours }) => {
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-600';
    if (percentage >= 80) return 'bg-blue-600';
    if (percentage >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  // Combine data
  const subjects = data.map(subject => {
    const hours = studyHours.find(h => h.subject === subject.subject)?.hours || 0;
    return { ...subject, studyHours: hours };
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-gray-500">{subject.credits} credits</span>
                  <span className={`text-xs font-semibold ${getGradeColor(subject.grade)}`}>
                    {subject.grade}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{subject.percentage}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
              <div
                className={`h-full ${getProgressColor(subject.percentage)} rounded-full transition-all duration-300`}
                style={{ width: `${subject.percentage}%` }}
              ></div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {subject.studyHours} hours studied
              </div>
              <div className="flex items-center text-gray-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                {subject.studyHours / subject.credits} hrs/credit
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="text-sm text-gray-600">Average Performance</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            {Math.round(data.reduce((acc, s) => acc + s.percentage, 0) / data.length)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubjectPerformance;