"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const StepByStep = ({ steps }) => {
  const [expandedSteps, setExpandedSteps] = useState({});

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution</h2>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Step Header */}
            <div
              onClick={() => toggleStep(index)}
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-600">
                  {step.step}
                </div>
                <span className="text-sm font-medium text-gray-700">{step.description}</span>
              </div>
              {expandedSteps[index] ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>

            {/* Step Details */}
            {expandedSteps[index] && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-xs text-indigo-700 mb-1">Formula / Calculation:</p>
                    <p className="text-sm font-mono text-indigo-900">{step.formula}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Step {step.step} complete</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Message */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center space-x-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm text-green-700 font-medium">All steps completed! You've solved the problem.</span>
      </div>
    </div>
  );
};

export default StepByStep;