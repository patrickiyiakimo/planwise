"use client";

import React from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ courses, view, onViewCourse }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first course</p>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Add Course
        </button>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="space-y-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            view={view}
            onView={onViewCourse}
          />
        ))}
      </div>
    );
  }

  if (view === 'calendar') {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Calendar</h3>
        <div className="text-center py-8 text-gray-500">
          Calendar view coming soon...
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          view={view}
          onView={onViewCourse}
        />
      ))}
    </div>
  );
};

export default CourseGrid;