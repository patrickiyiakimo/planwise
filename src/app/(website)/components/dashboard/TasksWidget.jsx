"use client";

import React from 'react';
// import { CheckCircle, Clock, AlertCircle, Plus, ChevronRight, Calendar } from 'lucide-react';
import { CheckCircle, Clock, AlertCircle, Plus, ChevronRight, Calendar } from 'lucide-react';

const TasksWidget = ({ tasks, onTaskComplete, onViewAll, onAddTask }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
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
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  const getCourseColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      red: 'bg-red-100 text-red-700'
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
          <p className="text-sm text-gray-500">You have {tasks.length} pending tasks</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddTask}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Add new task"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onViewAll}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border-l-4"
            style={{ borderLeftColor: `var(--${task.courseColor}-500)` }}
          >
            <button
              onClick={() => onTaskComplete(task.id)}
              className="mt-0.5 text-gray-400 hover:text-green-600 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadge(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCourseColorClass(task.courseColor)}`}>
                  {task.course}
                </span>
                <span className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No pending tasks. Great job! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default TasksWidget;