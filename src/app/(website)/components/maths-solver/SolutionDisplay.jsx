"use client";

import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

const SolutionDisplay = ({ solution }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Solution</h2>
      </div>

      <div className="space-y-4">
        {/* Problem Statement */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Problem:</p>
          <p className="text-gray-900 font-mono">{solution.problem}</p>
        </div>

        {/* Solution */}
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-sm text-green-700 mb-1">Answer:</p>
          <p className="text-xl font-semibold text-green-800 font-mono">{solution.solution}</p>
        </div>

        {/* Quick Info */}
        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            This solution includes {solution.steps.length} steps. Click on "Step-by-Step" to see the detailed process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDisplay;