"use client";

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Award
} from 'lucide-react';

const AssignmentList = ({ assignments, courseId, onAssignmentSubmit, onGradeUpdate }) => {
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionNote, setSubmissionNote] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-700';
      case 'graded':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const handleFileChange = (e) => {
    setSubmissionFile(e.target.files[0]);
  };

  const handleSubmit = (assignmentId) => {
    if (submissionFile) {
      onAssignmentSubmit(courseId, assignmentId, {
        file: submissionFile,
        note: submissionNote,
        submittedAt: new Date().toISOString()
      });
      setShowSubmitModal(null);
      setSubmissionFile(null);
      setSubmissionNote('');
    }
  };

  const calculateProgress = () => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const totalPoints = assignments.reduce((acc, a) => acc + (a.points || 0), 0);
  const earnedPoints = assignments.reduce((acc, a) => acc + (a.grade || 0), 0);

  return (
    <div className="space-y-4">
      {/* Progress Summary */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Assignment Progress</h3>
          <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-gray-500">Points: {earnedPoints}/{totalPoints}</span>
          <span className="text-gray-500">Remaining: {assignments.filter(a => a.status === 'pending').length}</span>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Assignment Header */}
            <div
              onClick={() => setExpandedAssignment(expandedAssignment === assignment.id ? null : assignment.id)}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                    {assignment.priority && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <div className={`flex items-center text-sm ${isOverdue(assignment.dueDate) && assignment.status === 'pending' ? 'text-red-600' : 'text-gray-500'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(assignment.dueDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      <FileText className="w-4 h-4 inline mr-1" />
                      {assignment.points} points
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {assignment.grade && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Grade</div>
                      <div className="text-lg font-semibold text-green-600">{assignment.grade}/{assignment.points}</div>
                    </div>
                  )}
                  {expandedAssignment === assignment.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedAssignment === assignment.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {/* Description */}
                {assignment.description && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Description</h5>
                    <p className="text-sm text-gray-600">{assignment.description}</p>
                  </div>
                )}

                {/* Attachments */}
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Attachments</h5>
                    <div className="space-y-2">
                      {assignment.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">{file.name}</span>
                          </div>
                          <button className="p-1 text-gray-500 hover:text-gray-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Info */}
                {assignment.submitted && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-green-700 font-medium">Submitted on {new Date(assignment.submittedAt).toLocaleString()}</p>
                        {assignment.submissionNote && (
                          <p className="text-sm text-green-600 mt-1">Note: {assignment.submissionNote}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback */}
                {assignment.feedback && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-700 font-medium">Instructor Feedback</p>
                        <p className="text-sm text-blue-600 mt-1">{assignment.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grade Info */}
                {assignment.grade && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Award className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-purple-700 font-medium">Grade: {assignment.grade}/{assignment.points}</p>
                        <p className="text-sm text-purple-600 mt-1">Percentage: {Math.round((assignment.grade / assignment.points) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {assignment.status === 'pending' && !isOverdue(assignment.dueDate) && (
                  <button
                    onClick={() => setShowSubmitModal(assignment.id)}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </button>
                )}

                {assignment.status === 'pending' && isOverdue(assignment.dueDate) && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm text-red-700">This assignment is overdue. Please contact your instructor.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Assignment</h3>
              
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Submission Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add any comments for your instructor..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSubmitModal(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit(showSubmitModal)}
                  disabled={!submissionFile}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;