"use client";

import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const UpcomingEvents = ({ events, onEventClick }) => {
  const getEventColor = (type) => {
    const colors = {
      assignment: 'bg-red-500',
      exam: 'bg-purple-500',
      'study-group': 'bg-blue-500',
      'study-session': 'bg-green-500',
      'office-hours': 'bg-yellow-500',
      workshop: 'bg-orange-500',
      event: 'bg-gray-500'
    };
    return colors[type] || 'bg-indigo-500';
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
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${date.toLocaleDateString('en-US', { weekday: 'long' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Upcoming</h3>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
      ) : (
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
            >
              {/* Event Type Indicator */}
              <div className={`w-1 h-12 ${getEventColor(event.type)} rounded-full flex-shrink-0`}></div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{getEventIcon(event.type)}</span>
                  <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h4>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatTime(event.start)}
                  </span>
                </div>

                {event.course && (
                  <p className="text-xs text-gray-400 mt-1">{event.course}</p>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {events.length > 5 && (
        <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium text-center">
          View all {events.length} events
        </button>
      )}
    </div>
  );
};

export default UpcomingEvents;