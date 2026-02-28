"use client";

import React from 'react';

const WeekView = ({ currentDate, events, onDateClick, onEventClick }) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });

  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const getEventsForDateTime = (date, hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.toDateString() === date.toDateString() &&
        eventDate.getHours() === hour &&
        !event.allDay
      );
    });
  };

  const getAllDayEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString() && event.allDay;
    });
  };

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

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="py-3 px-2 text-sm font-medium text-gray-500 bg-gray-50">Time</div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`py-3 px-2 text-center border-l border-gray-200 ${
              isToday(day) ? 'bg-indigo-50' : 'bg-gray-50'
            }`}
          >
            <div className="text-sm font-medium text-gray-700">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-sm ${isToday(day) ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* All Day Events */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="py-2 px-2 text-xs text-gray-500 bg-gray-50">All day</div>
        {weekDays.map((day, index) => {
          const allDayEvents = getAllDayEventsForDate(day);
          return (
            <div
              key={index}
              className="py-2 px-1 border-l border-gray-200 min-h-[60px]"
            >
              {allDayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={`${getEventColor(event.type)} text-white text-xs px-2 py-1 rounded mb-1 cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Time Grid */}
      <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
            <div className="py-3 px-2 text-xs text-gray-500 bg-gray-50">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            
            {weekDays.map((day, index) => {
              const hourEvents = getEventsForDateTime(day, hour);
              return (
                <div
                  key={index}
                  onClick={() => {
                    const dateTime = new Date(day);
                    dateTime.setHours(hour);
                    onDateClick(dateTime);
                  }}
                  className="py-3 px-1 border-l border-gray-100 min-h-[60px] cursor-pointer hover:bg-gray-50 transition-colors relative"
                >
                  {hourEvents.map((event) => {
                    const eventDate = new Date(event.start);
                    const eventEnd = new Date(event.end);
                    const duration = (eventEnd - eventDate) / (1000 * 60); // minutes
                    const height = Math.max(30, duration * 0.5); // rough estimate
                    
                    return (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={`absolute left-1 right-1 ${getEventColor(event.type)} text-white text-xs p-1 rounded cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
                        style={{ height: `${height}px`, top: '4px' }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        {duration > 60 && (
                          <div className="text-xs opacity-90 truncate">
                            {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;