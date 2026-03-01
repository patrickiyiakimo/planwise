"use client";

import React from 'react';
import { TrendingUp, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';

const GradePredictor = ({ predictions }) => {
  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 80) return 'bg-green-100 text-green-700';
    if (prob >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Grade Predictor</h3>
        <Sparkles className="w-5 h-5 text-indigo-600" />
      </div>

      {/* Overall Prediction */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mb-2">{predictions.finalGPA}</div>
        <div className="text-sm text-gray-500 mb-3">Predicted Final GPA</div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          predictions.confidence >= 80 ? 'bg-green-100 text-green-700' :
          predictions.confidence >= 60 ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {predictions.confidence}% Confidence
        </div>
      </div>

      {/* Subject Predictions */}
      <div className="space-y-3 mb-4">
        {predictions.bySubject.map((subject, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">{subject.subject}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-lg font-semibold ${getGradeColor(subject.predicted)}`}>
                  {subject.predicted}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getProbabilityColor(subject.probability)}`}>
                  {subject.probability}% chance
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recommendations</h4>
        <div className="space-y-2">
          {predictions.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-4">
        *Predictions are based on current performance and historical data. Actual grades may vary.
      </p>
    </div>
  );
};

export default GradePredictor;