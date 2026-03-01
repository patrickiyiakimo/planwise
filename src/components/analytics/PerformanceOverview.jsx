"use client";

import React from 'react';
import { Award, Target, TrendingUp, BookOpen, Star, TrendingDown } from 'lucide-react';

const PerformanceOverview = ({ data }) => {
  const cards = [
    {
      id: 1,
      label: 'Current GPA',
      value: data.currentGPA,
      target: data.targetGPA,
      icon: Award,
      color: 'bg-indigo-600',
      progress: (data.currentGPA / 4) * 100
    },
    {
      id: 2,
      label: 'Semester GPA',
      value: data.semesterGPA,
      change: data.semesterGPA - data.cumulativeGPA,
      icon: TrendingUp,
      color: 'bg-green-600'
    },
    {
      id: 3,
      label: 'Cumulative GPA',
      value: data.cumulativeGPA,
      icon: Star,
      color: 'bg-purple-600'
    },
    {
      id: 4,
      label: 'Credit Hours',
      value: `${data.completedCredits}/${data.totalCredits}`,
      subtitle: `${data.creditHours} current`,
      icon: BookOpen,
      color: 'bg-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {card.target && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                  Target: {card.target}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                {card.change !== undefined && (
                  <span className={`ml-2 text-sm font-medium ${card.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change >= 0 ? '+' : ''}{card.change.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{card.label}</p>
              {card.subtitle && (
                <p className="text-xs text-gray-400">{card.subtitle}</p>
              )}
            </div>

            {card.progress !== undefined && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress to target</span>
                  <span className="font-medium text-gray-700">{Math.round(card.progress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceOverview;