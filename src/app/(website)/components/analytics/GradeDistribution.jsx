"use client";

import React, { useState } from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

const GradeDistribution = ({ distribution, trend }) => {
  const [view, setView] = useState('distribution'); // 'distribution', 'trend'

  const gradeColors = {
    A: 'bg-green-600',
    'A-': 'bg-green-500',
    'B+': 'bg-blue-500',
    B: 'bg-blue-400',
    'B-': 'bg-blue-300',
    'C+': 'bg-yellow-500',
    C: 'bg-yellow-400',
    D: 'bg-orange-500',
    F: 'bg-red-500'
  };

  const totalGrades = Object.values(distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Grade Distribution</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('distribution')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'distribution' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <PieChart className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('trend')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'trend' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === 'distribution' ? (
        <div className="space-y-3">
          {Object.entries(distribution).map(([grade, count]) => (
            count > 0 && (
              <div key={grade} className="flex items-center">
                <div className="w-8 text-sm font-medium text-gray-700">{grade}</div>
                <div className="flex-1 mx-2">
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${gradeColors[grade]} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(count / totalGrades) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-medium text-gray-700">{count}</span>
                  <span className="text-xs text-gray-400 ml-1">
                    ({Math.round((count / totalGrades) * 100)}%)
                  </span>
                </div>
              </div>
            )
          ))}

          {totalGrades === 0 && (
            <p className="text-center text-gray-500 py-4">No grades available</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {trend.map((semester, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 text-sm text-gray-600">{semester.semester}</div>
              <div className="flex-1 mx-2">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(semester.gpa / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-12 text-right">
                <span className="text-sm font-semibold text-gray-900">{semester.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GPA Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalGrades}</div>
            <div className="text-xs text-gray-500">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Object.keys(distribution).filter(g => g.startsWith('A') || g.startsWith('B')).reduce((acc, g) => acc + distribution[g], 0)}
            </div>
            <div className="text-xs text-gray-500">A/B Grades</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeDistribution;