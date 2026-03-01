"use client";

import React from 'react';
import { Users, TrendingUp, Award, BarChart } from 'lucide-react';

const ComparisonChart = ({ data }) => {
  const maxValue = Math.max(
    ...data.vsClassAverage.map(d => Math.max(d.user, d.class)),
    100
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Comparison</h3>

      {/* Class Average Comparison */}
      <div className="space-y-3 mb-6">
        {data.vsClassAverage.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">{item.subject}</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-indigo-600">{item.user}%</span>
                <span className="text-gray-400">vs</span>
                <span className="text-gray-600">{item.class}%</span>
              </div>
            </div>
            <div className="relative h-6">
              {/* User bar */}
              <div
                className="absolute h-full bg-indigo-600 rounded-l-lg"
                style={{ width: `${(item.user / maxValue) * 100}%` }}
              >
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-white opacity-0 group-hover:opacity-100">
                  You
                </span>
              </div>
              {/* Class average bar */}
              <div
                className="absolute h-full bg-gray-300 rounded-r-lg"
                style={{ 
                  width: `${(item.class / maxValue) * 100}%`,
                  left: `${(item.user / maxValue) * 100}%`
                }}
              >
                <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100">
                  Class
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>You: {item.user}%</span>
              <span>Class: {item.class}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Percentile Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-gray-900">Top {data.vsPeers.top25}%</div>
          <div className="text-xs text-gray-500">Top 25%</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-gray-900">{data.vsPeers.median}%</div>
          <div className="text-xs text-gray-500">Median</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <BarChart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-gray-900">{data.percentile}th</div>
          <div className="text-xs text-gray-500">Percentile</div>
        </div>
      </div>

      {/* Insight */}
      <div className="p-3 bg-indigo-50 rounded-lg">
        <p className="text-sm text-indigo-700">
          {data.percentile >= 75 
            ? "🎉 You're performing better than most of your peers! Keep up the great work!"
            : data.percentile >= 50
            ? "📈 You're above average! With a little more effort, you can reach the top quartile."
            : "💪 You're making progress. Focus on the recommended areas to improve your standing."}
        </p>
      </div>
    </div>
  );
};

export default ComparisonChart;