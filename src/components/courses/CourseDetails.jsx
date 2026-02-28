"use client";

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Mail,
  FileText,
  Award,
  Edit,
  Trash2,
  Download,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Users
} from 'lucide-react';

const CourseDetails = ({ course, onClose, onUpdate, onDelete, onAssignmentSubmit, onGradeUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'graded':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
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
          <div className={`px-6 py-4 bg-gradient-to-r from-${course.color}-600 to-${course.color}-700 flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-2xl">
                {course.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-white">{course.code}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-white/90 text-sm">{course.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 border-b border-gray-200">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'assignments'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Assignments
                {course.assignments?.filter(a => !a.submitted).length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                    {course.assignments.filter(a => !a.submitted).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'materials'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'announcements'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Announcements
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Course Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Credits</div>
                    <div className="text-2xl font-bold text-gray-900">{course.creditHours}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Semester</div>
                    <div className="text-lg font-semibold text-gray-900">{course.semester}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Progress</div>
                    <div className="text-2xl font-bold text-indigo-600">{course.progress}%</div>
                  </div>
                  {course.grade && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">Current Grade</div>
                      <div className="text-2xl font-bold text-green-600">{course.grade}</div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{course.description}</p>
                </div>

                {/* Instructor Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Instructor</h4>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.instructor}</p>
                      <p className="text-sm text-gray-500">{course.instructorEmail}</p>
                      <p className="text-sm text-gray-500">Office: {course.instructorOffice}</p>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Schedule</h4>
                  <div className="space-y-2">
                    {course.schedule.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 text-sm font-medium text-gray-700">{item.day}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start: {new Date(course.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    End: {new Date(course.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {course.assignments?.length > 0 ? (
                  course.assignments.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getAssignmentStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <div className={`flex items-center ${isOverdue(assignment.dueDate) && !assignment.submitted ? 'text-red-600' : 'text-gray-500'}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {formatDate(assignment.dueDate)}
                          {isOverdue(assignment.dueDate) && !assignment.submitted && (
                            <span className="ml-2 text-xs text-red-600">Overdue</span>
                          )}
                        </div>
                        <div className="text-gray-500">
                          Points: {assignment.points}
                        </div>
                        {assignment.grade && (
                          <div className="text-green-600 font-medium">
                            Grade: {assignment.grade}/{assignment.points}
                          </div>
                        )}
                      </div>

                      {!assignment.submitted && !isOverdue(assignment.dueDate) && (
                        <button
                          onClick={() => onAssignmentSubmit(course.id, assignment.id)}
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Submit Assignment
                        </button>
                      )}

                      {assignment.feedback && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{assignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No assignments yet</p>
                )}
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-3">
                {course.materials?.length > 0 ? (
                  course.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="font-medium text-gray-900">{material.title}</p>
                          <p className="text-sm text-gray-500">{material.type}</p>
                        </div>
                      </div>
                      <a
                        href={material.url}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No materials available</p>
                )}
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-4">
                {course.announcements?.length > 0 ? (
                  course.announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                        <span className="text-xs text-gray-500">{formatDate(announcement.date)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{announcement.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No announcements</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              onClick={() => onUpdate(course.id, { ...course })}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Course
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Delete Course</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {course.code}? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(course.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;