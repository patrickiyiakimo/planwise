"use client";

import React, { useState } from 'react';
import {
  X,
  Download,
  Star,
  Trash2,
  FileText,
  Calendar,
  BookOpen,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

const SummaryViewer = ({ summary, onClose, onDelete, onDownload, onStar }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCourseColor = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-700',
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      blue: 'bg-blue-100 text-blue-700',
      red: 'bg-red-100 text-red-700',
      gray: 'bg-gray-100 text-gray-700'
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-lg font-semibold text-white">{summary.title}</h3>
                <p className="text-sm text-indigo-100">{summary.fileName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Metadata Bar */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCourseColor(summary.courseColor)}`}>
              {summary.course}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <BookOpen className="w-4 h-4 mr-1" />
              {summary.pages} pages
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(summary.date)}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {summary.processingTime} sec
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <Sparkles className="w-4 h-4 mr-1" />
              {Math.round(summary.confidence * 100)}% confidence
            </span>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-gray-200">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'summary'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('keypoints')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'keypoints'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Key Points
              </button>
              <button
                onClick={() => setActiveTab('topics')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'topics'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Topics
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Statistics
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
                </div>
                
                {/* Pagination (simulated) */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {Math.ceil(summary.tokens / 500)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === Math.ceil(summary.tokens / 500)}
                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'keypoints' && (
              <div className="space-y-4">
                {summary.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
                    <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'topics' && (
              <div className="flex flex-wrap gap-2">
                {summary.topics.map((topic, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Pages</div>
                  <div className="text-2xl font-bold text-gray-900">{summary.pages}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Tokens</div>
                  <div className="text-2xl font-bold text-gray-900">{summary.tokens.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Readability Score</div>
                  <div className="text-2xl font-bold text-green-600">{summary.readabilityScore}%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">AI Confidence</div>
                  <div className="text-2xl font-bold text-indigo-600">{Math.round(summary.confidence * 100)}%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Processing Time</div>
                  <div className="text-2xl font-bold text-gray-900">{summary.processingTime}s</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">File Size</div>
                  <div className="text-2xl font-bold text-gray-900">{summary.fileSize}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopySummary}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
              <button
                onClick={() => onDownload(summary)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                <span>Download</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onStar(summary.id)}
                className={`p-2 rounded-lg transition-colors ${
                  summary.starred 
                    ? 'text-yellow-500 hover:bg-yellow-50' 
                    : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Star className="w-5 h-5" fill={summary.starred ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => {
                  onDelete(summary.id);
                  onClose();
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryViewer;