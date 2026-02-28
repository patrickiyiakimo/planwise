"use client";

import React from 'react';
// import { FileText, Calendar, ChevronRight, Plus, Clock, Sparkles } from 'lucide-react';
import { FileText, Calendar, ChevronRight, Plus, Clock, Sparkles } from 'lucide-react';

const SummariesWidget = ({ summaries, onViewSummary, onViewAll, onCreateNew }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Summaries</h2>
          <p className="text-sm text-gray-500">AI-powered PDF summaries</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onCreateNew}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Create new summary"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onViewAll}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Summaries List */}
      <div className="space-y-4">
        {summaries.map((summary) => (
          <div
            key={summary.id}
            onClick={() => onViewSummary(summary.id)}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {summary.title}
                </h3>
                <Sparkles className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{summary.summary}</p>
              
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-xs text-gray-400">{summary.course}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{summary.pages} pages</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(summary.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {summaries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No PDF summaries yet</p>
          <button
            onClick={onCreateNew}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create your first summary
          </button>
        </div>
      )}
    </div>
  );
};

export default SummariesWidget;