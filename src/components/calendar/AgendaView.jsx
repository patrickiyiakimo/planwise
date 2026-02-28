"use client";

import React from 'react';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

const AgendaView = ({ currentDate, events, onEventClick }) => {
  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateStr = new Date(event.start).toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a) - new Date(b)
  );

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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (dateStr) => {
    return dateStr === new Date().toDateString();
  };

  const isTomorrow = (dateStr) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dateStr === tomorrow.toDateString();
  };

  const formatDateHeader = (dateStr) => {
    if (isToday(dateStr)) return 'Today';
    if (isTomorrow(dateStr)) return 'Tomorrow';
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h2>

      {sortedDates.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((dateStr) => (
            <div key={dateStr}>
              {/* Date Header */}
              <h3 className={`text-sm font-medium mb-4 pb-2 border-b border-gray-100 ${
                isToday(dateStr) ? 'text-indigo-600' : 'text-gray-700'
              }`}>
                {formatDateHeader(dateStr)}
                {isToday(dateStr) && (
                  <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </h3>

              {/* Events for this date */}
              <div className="space-y-3">
                {groupedEvents[dateStr]
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
                    >
                      {/* Time */}
                      <div className="w-20 text-center">
                        {event.allDay ? (
                          <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded">
                            All day
                          </span>
                        ) : (
                          <>
                            <div className="text-sm font-medium text-gray-700">
                              {formatTime(event.start)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {formatTime(event.end)}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Event Type Indicator */}
                      <div className={`w-1 h-12 ${getEventColor(event.type)} rounded-full`}></div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getEventIcon(event.type)}</span>
                              <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {event.title}
                              </h4>
                            </div>
                            {event.course && (
                              <p className="text-sm text-gray-500 mt-1">{event.course}</p>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {event.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {event.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 mt-3">
                          {event.location && (
                            <span className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.location}
                            </span>
                          )}
                          {event.attendees && (
                            <span className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.attendees.length} attendees
                            </span>
                          )}
                          {event.priority === 'high' && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              High priority
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgendaView;