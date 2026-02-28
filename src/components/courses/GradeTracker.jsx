"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  PieChart,
  BarChart,
  Calendar,
  Download,
  ChevronRight
} from 'lucide-react';

const GradeTracker = ({ courses, assignments }) => {
  const [timeframe, setTimeframe] = useState('semester'); // 'semester', 'month', 'week'
  const [showDetails, setShowDetails] = useState(false);

  // Calculate overall GPA
  const calculateOverallGPA = () => {
    const gradedCourses = courses.filter(c => c.gradePoints);
    if (gradedCourses.length === 0) return '0.00';
    const total = gradedCourses.reduce((acc, c) => acc + c.gradePoints, 0);
    return (total / gradedCourses.length).toFixed(2);
  };

  // Calculate semester GPA
  const calculateSemesterGPA = (semester) => {
    const semesterCourses = courses.filter(c => c.semester === semester && c.gradePoints);
    if (semesterCourses.length === 0) return '0.00';
    const total = semesterCourses.reduce((acc, c) => acc + c.gradePoints, 0);
    return (total / semesterCourses.length).toFixed(2);
  };

  // Calculate grade distribution
  const getGradeDistribution = () => {
    const distribution = {
      A: courses.filter(c => c.grade?.startsWith('A')).length,
      B: courses.filter(c => c.grade?.startsWith('B')).length,
      C: courses.filter(c => c.grade?.startsWith('C')).length,
      D: courses.filter(c => c.grade?.startsWith('D')).length,
      F: courses.filter(c => c.grade?.startsWith('F')).length
    };
    return distribution;
  };

  // Calculate assignment performance
  const getAssignmentPerformance = () => {
    const allAssignments = courses.flatMap(c => c.assignments || []);
    const graded = allAssignments.filter(a => a.grade);
    
    if (graded.length === 0) return 0;
    
    const totalPercentage = graded.reduce((acc, a) => {
      return acc + (a.grade / a.points * 100);
    }, 0);
    
    return Math.round(totalPercentage / graded.length);
  };

  // Calculate trend (mock data - replace with real calculation)
  const getTrend = () => {
    return {
      direction: 'up',
      percentage: 2.5,
      period: 'this semester'
    };
  };

  const overallGPA = calculateOverallGPA();
  const gradeDistribution = getGradeDistribution();
  const assignmentPerformance = getAssignmentPerformance();
  const trend = getTrend();
  const semesters = [...new Set(courses.map(c => c.semester))];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Grade Tracker</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="semester">This Semester</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main GPA Display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-gray-900 mb-2">{overallGPA}</div>
        <div className="text-sm text-gray-500 mb-4">Overall GPA</div>
        
        {/* Trend Indicator */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full ${
          trend.direction === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trend.direction === 'up' ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm font-medium">
            {trend.percentage}% {trend.direction === 'up' ? 'higher' : 'lower'} than {trend.period}
          </span>
        </div>
      </div>

      {/* GPA by Semester */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">GPA by Semester</h3>
        <div className="space-y-3">
          {semesters.map((semester) => (
            <div key={semester} className="flex items-center">
              <div className="w-24 text-sm text-gray-600">{semester}</div>
              <div className="flex-1 mx-4">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(parseFloat(calculateSemesterGPA(semester)) / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {calculateSemesterGPA(semester)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-lg font-bold text-gray-900">{assignmentPerformance}%</span>
          </div>
          <div className="text-xs text-gray-500">Assignment Avg</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <PieChart className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-gray-900">
              {courses.filter(c => c.grade).length}
            </span>
          </div>
          <div className="text-xs text-gray-500">Graded Courses</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <BarChart className="w-4 h-4 text-yellow-600" />
            <span className="text-lg font-bold text-gray-900">
              {courses.reduce((acc, c) => acc + (c.assignments?.length || 0), 0)}
            </span>
          </div>
          <div className="text-xs text-gray-500">Total Assignments</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span className="text-lg font-bold text-gray-900">
              {courses.filter(c => c.status === 'in-progress').length}
            </span>
          </div>
          <div className="text-xs text-gray-500">Active Courses</div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">Grade Distribution</span>
          <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${
            showDetails ? 'rotate-90' : ''
          }`} />
        </button>

        {showDetails && (
          <div className="mt-4 space-y-3">
            {Object.entries(gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="flex items-center">
                <div className="w-8 text-sm font-medium text-gray-700">{grade}</div>
                <div className="flex-1 mx-2">
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          grade === 'A' ? 'bg-green-600' :
                          grade === 'B' ? 'bg-blue-600' :
                          grade === 'C' ? 'bg-yellow-600' :
                          grade === 'D' ? 'bg-orange-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${(count / Math.max(...Object.values(gradeDistribution))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="w-12 text-right text-sm text-gray-600">{count} courses</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Target GPA Calculator */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
        <h4 className="text-sm font-medium text-indigo-900 mb-2">Target GPA Calculator</h4>
        <p className="text-xs text-indigo-700 mb-3">
          To achieve a 3.5 GPA this semester, you need an average of B+ in your remaining courses.
        </p>
        <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
          Calculate Target
        </button>
      </div>
    </div>
  );
};

export default GradeTracker;