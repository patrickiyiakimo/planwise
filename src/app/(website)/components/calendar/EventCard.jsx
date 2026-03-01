"use client";

import React from 'react';
import { 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  Paperclip,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const EventCard = ({ event, variant = 'default', onClick, onReminder, compact = false }) => {
  const getEventColor = (type) => {
    const colors = {
      assignment: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        dot: 'bg-red-500',
        light: 'bg-red-100'
      },
      exam: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        dot: 'bg-purple-500',
        light: 'bg-purple-100'
      },
      'study-group': {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        dot: 'bg-blue-500',
        light: 'bg-blue-100'
      },
      'study-session': {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        dot: 'bg-green-500',
        light: 'bg-green-100'
      },
      'office-hours': {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        dot: 'bg-yellow-500',
        light: 'bg-yellow-100'
      },
      workshop: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        dot: 'bg-orange-500',
        light: 'bg-orange-100'
      },
      event: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-700',
        dot: 'bg-gray-500',
        light: 'bg-gray-100'
      }
    };
    return colors[event.type] || colors.event;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <AlertCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'exam':
        return '📚';
      case 'study-group':
        return '👥';
      case 'study-session':
        return '📖';
      case 'office-hours':
        return '👨‍🏫';
      case 'workshop':
        return '🔧';
      default:
        return '📅';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isOngoing = () => {
    const now = new Date();
    const start = new Date(event.start);
    const end = new Date(event.end);
    return now >= start && now <= end;
  };

  const isPast = () => {
    return new Date(event.end) < new Date();
  };

  const colors = getEventColor(event.type);

  if (compact) {
    return (
      <div
        onClick={() => onClick?.(event)}
        className={`
          flex items-center space-x-3 p-3 rounded-lg cursor-pointer
          transition-all hover:shadow-md border
          ${colors.bg} ${colors.border}
          ${isPast() ? 'opacity-60' : ''}
          ${isOngoing() ? 'ring-2 ring-green-500 ring-opacity-50' : ''}
        `}
      >
        {/* Event Type Icon */}
        <div className={`w-8 h-8 ${colors.light} rounded-lg flex items-center justify-center text-lg`}>
          {getEventIcon(event.type)}
        </div>

        {/* Event Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className={`text-sm font-medium truncate ${colors.text}`}>
              {event.title}
            </h4>
            {event.priority === 'high' && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {formatDate(event.start)} • {formatTime(event.start)}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">{event.location}</span>
            </div>
          )}
        </div>

        {/* Priority Indicator */}
        {event.priority === 'high' && !compact && (
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        )}
      </div>
    );
  }

  // Default variant (full card)
  return (
    <div
      onClick={() => onClick?.(event)}
      className={`
        bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer
        border-l-4 overflow-hidden
        ${isPast() ? 'opacity-60' : ''}
        ${isOngoing() ? 'ring-2 ring-green-500 ring-opacity-50' : ''}
      `}
      style={{ borderLeftColor: colors.dot.replace('bg-', '') }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${colors.light} rounded-lg flex items-center justify-center text-xl`}>
              {getEventIcon(event.type)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                {event.priority === 'high' && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    High Priority
                  </span>
                )}
              </div>
              {event.course && (
                <p className="text-sm text-gray-500">{event.course}</p>
              )}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Time Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-600">
              {event.allDay ? (
                'All day'
              ) : (
                <>
                  {formatTime(event.start)} - {formatTime(event.end)}
                </>
              )}
            </span>
            {isOngoing() && (
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Ongoing
              </span>
            )}
          </div>

          {event.location && (
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{event.location}</span>
            </div>
          )}
        </div>

        {/* Description (if available) */}
        {event.description && !compact && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Attendees & Attachments */}
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          {event.attendees && event.attendees.length > 0 && (
            <span className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'}
            </span>
          )}
          {event.attachments && event.attachments.length > 0 && (
            <span className="flex items-center">
              <Paperclip className="w-3 h-3 mr-1" />
              {event.attachments.length} {event.attachments.length === 1 ? 'file' : 'files'}
            </span>
          )}
          {event.reminders && event.reminders.length > 0 && (
            <span className="flex items-center">
              <Bell className="w-3 h-3 mr-1" />
              {event.reminders.length} reminder{event.reminders.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Reminder Button (if needed) */}
        {onReminder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReminder(event.id);
            }}
            className="mt-3 w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            Set Reminder
          </button>
        )}
      </div>

      {/* Status Bar for Ongoing/Past Events */}
      {(isOngoing() || isPast()) && (
        <div className={`h-1 ${isOngoing() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      )}
    </div>
  );
};

export default EventCard;