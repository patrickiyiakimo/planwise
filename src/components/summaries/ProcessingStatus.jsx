"use client";

import React from 'react';
import { Loader, CheckCircle, FileText, Sparkles } from 'lucide-react';

const ProcessingStatus = ({ status, progress }) => {
  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-4">
        {/* Status Icon */}
        <div className="relative">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            {status === 'uploading' && (
              <Loader className="w-6 h-6 text-indigo-600 animate-spin" />
            )}
            {status === 'processing' && (
              <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
            )}
            {status === 'complete' && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
          {status === 'uploading' && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-white text-xs flex items-center justify-center">
              {progress}%
            </span>
          )}
        </div>

        {/* Status Info */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">
            {status === 'uploading' && 'Uploading PDF...'}
            {status === 'processing' && 'AI is analyzing your document...'}
            {status === 'complete' && 'Summary complete!'}
          </h3>
          
          <p className="text-sm text-gray-500 mt-1">
            {status === 'uploading' && `Uploaded ${progress}%`}
            {status === 'processing' && 'Extracting key concepts and generating summary'}
            {status === 'complete' && 'Your summary is ready to view'}
          </p>

          {/* Progress Bar */}
          {status === 'uploading' && (
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Processing Animation */}
          {status === 'processing' && (
            <div className="mt-3 flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500">
            <FileText className="w-4 h-4 mr-1" />
            <span>lecture_notes.pdf</span>
          </div>
          <span className="text-xs text-gray-400">2.4 MB</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;