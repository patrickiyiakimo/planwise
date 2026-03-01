"use client";

import React from 'react';
import { FileText, Clock, Sparkles, BookOpen, Star, TrendingUp } from 'lucide-react';

const SummaryStats = ({ summaries }) => {
  const totalSummaries = summaries.length;
  const totalPages = summaries.reduce((acc, s) => acc + s.pages, 0);
  const totalTokens = summaries.reduce((acc, s) => acc + s.tokens, 0);
  const starredCount = summaries.filter(s => s.starred).length;
  
  const avgConfidence = summaries.length > 0 
    ? Math.round((summaries.reduce((acc, s) => acc + s.confidence, 0) / summaries.length) * 100)
    : 0;

  const stats = [
    {
      id: 1,
      label: 'Total Summaries',
      value: totalSummaries,
      icon: FileText,
      color: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Pages Processed',
      value: totalPages,
      icon: BookOpen,
      color: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 3,
      label: 'Starred',
      value: starredCount,
      icon: Star,
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      id: 4,
      label: 'Avg. Confidence',
      value: `${avgConfidence}%`,
      icon: TrendingUp,
      color: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;