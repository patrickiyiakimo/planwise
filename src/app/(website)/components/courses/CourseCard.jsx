"use client";

import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';

const CourseCard = ({ course, view, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'planned':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCourseColor = (color) => {
    const colors = {
      purple: 'bg-purple-600',
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      yellow: 'bg-yellow-600',
      red: 'bg-red-600',
      indigo: 'bg-indigo-600'
    };
    return colors[color] || 'bg-indigo-600';
  };

  const getDueAssignments = () => {
    const today = new Date();
    return course.assignments?.filter(a => {
      const dueDate = new Date(a.dueDate);
      return dueDate > today && !a.submitted;
    }).length || 0;
  };

  const dueCount = getDueAssignments();

  if (view === 'list') {
    return (
      <div 
        onClick={() => onView(course)}
        className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="p-4">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className={`${getCourseColor(course.color)} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
              {course.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{course.code}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{course.name}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {course.grade && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Current Grade</div>
                      <div className="text-lg font-semibold text-indigo-600">{course.grade}</div>
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Details */}
              <div className="flex items-center space-x-4 mt-2">
                <span className="flex items-center text-xs text-gray-500">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {course.creditHours} credits
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {course.semester}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.schedule[0]?.day}s at {course.schedule[0]?.time}
                </span>
              </div>

              {/* Progress Bar */}
              {course.status === 'in-progress' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      onClick={() => onView(course)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden cursor-pointer group"
    >
      {/* Header with color */}
      <div className={`${getCourseColor(course.color)} h-2`}></div>
      
      <div className="p-5">
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-3">
          <div className={`${getCourseColor(course.color)} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl bg-opacity-90`}>
            {course.icon}
          </div>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
        </div>

        {/* Course Info */}
        <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
          {course.code}: {course.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <p className="text-xs text-gray-400 mb-3">{course.instructor}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-xs text-gray-500">
            <BookOpen className="w-3 h-3 mr-1" />
            {course.creditHours} credits
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {course.semester}
          </div>
        </div>

        {/* Due Assignments Alert */}
        {dueCount > 0 && (
          <div className="flex items-center space-x-1 mb-3 p-1.5 bg-red-50 rounded-lg">
            <AlertCircle className="w-3 h-3 text-red-600" />
            <span className="text-xs text-red-600">{dueCount} assignment{dueCount > 1 ? 's' : ''} due soon</span>
          </div>
        )}

        {/* Progress Bar */}
        {course.status === 'in-progress' && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-700">{course.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Grade Display */}
        {course.grade && (
          <div className="mt-3 flex items-center justify-end">
            <Award className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold text-gray-900">{course.grade}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;