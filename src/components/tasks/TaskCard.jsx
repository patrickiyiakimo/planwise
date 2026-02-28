"use client";

import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar, 
  MessageSquare,
  Paperclip,
  MoreVertical,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const TaskCard = ({ task, view, onStatusChange, onProgressUpdate, onDelete, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getCourseColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      red: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== 'completed';
  };

  if (view === 'grid') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Edit className="w-3 h-3 mr-2" /> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 className="w-3 h-3 mr-2" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Course and Priority */}
          <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCourseColor(task.courseColor)}`}>
              {task.course}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-700">{task.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDueDate(task.dueDate)}
              </span>
              {isOverdue() && (
                <span className="text-red-600 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Overdue
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {task.comments > 0 && (
                <span className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {task.comments}
                </span>
              )}
              {task.attachments.length > 0 && (
                <span className="flex items-center">
                  <Paperclip className="w-3 h-3 mr-1" />
                  {task.attachments.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <button
            onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
              task.status === 'completed' 
                ? 'bg-green-600 border-green-600' 
                : 'border-gray-300 hover:border-indigo-600'
            }`}
          >
            {task.status === 'completed' && (
              <CheckCircle className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {expanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-1 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCourseColor(task.courseColor)}`}>
                {task.course}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>

            {/* Due Date */}
            <div className="flex items-center mt-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400 mr-1" />
              <span className={isOverdue() ? 'text-red-600 font-medium' : 'text-gray-500'}>
                {formatDueDate(task.dueDate)}
              </span>
              {isOverdue() && (
                <span className="ml-2 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  Overdue
                </span>
              )}
            </div>

            {/* Expanded Content */}
            {expanded && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {/* Subtasks */}
                {task.subtasks.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Subtasks</h4>
                    <div className="space-y-2">
                      {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => {}}
                            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          />
                          <span className={`text-sm ${subtask.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {task.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {task.attachments.map((file, index) => (
                        <div key={index} className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 flex items-center">
                          <Paperclip className="w-3 h-3 mr-1" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress Update */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Update Progress</h4>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => onProgressUpdate(task.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>0%</span>
                    <span className="font-medium text-indigo-600">{task.progress}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;