"use client";

import React from 'react';
import { 
  FileText, 
  Star, 
  Download, 
  Trash2, 
  Calendar,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const SummaryCard = ({ 
  summary, 
  view, 
  onView, 
  onDelete, 
  onStar, 
  onDownload 
}) => {
  const getCourseColor = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (view === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                      onClick={() => onView(summary)}>
                    {summary.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{summary.fileName}</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onStar(summary.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      summary.starred ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={summary.starred ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => onDownload(summary)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(summary.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCourseColor(summary.courseColor)}`}>
                  {summary.course}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {summary.pages} pages
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(summary.date)}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {Math.round(summary.confidence * 100)}% confidence
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {summary.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                  onClick={() => onView(summary)}>
                {summary.title}
              </h3>
              <p className="text-xs text-gray-500">{summary.fileName}</p>
            </div>
          </div>
          <button
            onClick={() => onStar(summary.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              summary.starred ? 'text-yellow-500' : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-4 h-4" fill={summary.starred ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Preview */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {summary.summary.substring(0, 150)}...
        </p>

        {/* Key Points */}
        <div className="space-y-2 mb-4">
          {summary.keyPoints.slice(0, 2).map((point, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Sparkles className="w-3 h-3 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-gray-600">{point}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCourseColor(summary.courseColor)}`}>
              {summary.course}
            </span>
            <span className="text-xs text-gray-500">{summary.pages}p</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onDownload(summary)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(summary.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onView(summary)}
              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;