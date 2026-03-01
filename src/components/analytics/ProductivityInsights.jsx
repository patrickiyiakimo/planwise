"use client";

import React from 'react';
import { Lightbulb, TrendingUp, Clock, Zap, Target, CheckCircle } from 'lucide-react';

const ProductivityInsights = ({ insights, productivity }) => {
  const tips = [
    {
      id: 1,
      icon: Clock,
      title: 'Best Time to Study',
      description: `You're most productive during ${productivity.bestTime}. Schedule important tasks then.`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      icon: Zap,
      title: 'Peak Performance Day',
      description: `${productivity.mostProductiveDay} is your most productive day. Plan challenging work then.`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 3,
      icon: Target,
      title: 'Consistency Score',
      description: `Your study consistency is ${productivity.consistency}%. ${
        productivity.consistency >= 80 ? "Excellent! You're very consistent." :
        productivity.consistency >= 60 ? "Good, but there's room for improvement." :
        "Try to establish a more regular study routine."
      }`,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <h3 className="text-lg font-semibold text-gray-900">Productivity Insights</h3>
      </div>

      {/* Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className={`${tip.bgColor} p-4 rounded-lg`}>
              <Icon className={`w-5 h-5 ${tip.color} mb-2`} />
              <h4 className="text-sm font-medium text-gray-900 mb-1">{tip.title}</h4>
              <p className="text-xs text-gray-600">{tip.description}</p>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recommended Actions</h4>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Efficiency */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Study Efficiency</span>
          <span className="text-sm font-medium text-gray-900">
            {(productivity.averageDaily / 4 * 100).toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"
            style={{ width: `${(productivity.averageDaily / 4 * 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Based on your daily study goals and completion rates
        </p>
      </div>
    </div>
  );
};

export default ProductivityInsights;