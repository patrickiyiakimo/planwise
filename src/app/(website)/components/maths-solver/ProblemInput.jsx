"use client";

import React from 'react';
import { Send, Eraser, Sparkles } from 'lucide-react';

const ProblemInput = ({ problem, setProblem, onSolve, onClear, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSolve();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-4">
        {/* Input Label */}
        <div className="flex items-center justify-between">
          <label htmlFor="problem" className="text-sm font-medium text-gray-700">
            Enter your math problem
          </label>
          <span className="text-xs text-gray-400">
            Press Ctrl+Enter to solve
          </span>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Solve x² + x - 6 = 0, or find the derivative of x³ + x²"
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            disabled={loading}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {problem.length} characters
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClear}
              disabled={!problem || loading}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>

          <button
            onClick={onSolve}
            disabled={!problem.trim() || loading}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Solving...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Solve Problem</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Quick Tips */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            <span className="font-medium">Tips:</span> Use ^ for exponents (x^2), sqrt() for square roots, 
            and type 'derivative', 'integral', or 'solve' for specific operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemInput;