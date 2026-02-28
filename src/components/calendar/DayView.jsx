"use client";

import React from 'react';

const DayView = ({ currentDate, events, onDateClick, onEventClick }) => {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.toDateString() === currentDate.toDateString() &&
        eventDate.getHours() === hour &&
        !event.allDay
      );
    });
  };

  const getAllDayEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === currentDate.toDateString() && event.allDay;
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

  const isToday = currentDate.toDateString() === new Date().toDateString();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 ${isToday ? 'bg-indigo-50' : 'bg-gray-50'}`}>
        <h3 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        {isToday && <p className="text-sm text-indigo-600 mt-1">Today</p>}
      </div>

      {/* All Day Events */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-[100px_1fr]">
          <div className="py-3 px-4 text-sm font-medium text-gray-500 bg-gray-50">All day</div>
          <div className="py-3 px-4 border-l border-gray-200">
            {getAllDayEvents().map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`${getEventColor(event.type)} text-white text-sm px-3 py-2 rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity inline-block mr-2`}
              >
                {event.title}
              </div>
            ))}
            {getAllDayEvents().length === 0 && (
              <p className="text-sm text-gray-400">No all-day events</p>
            )}
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);
          const timeLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
          
          return (
            <div
              key={hour}
              onClick={() => {
                const dateTime = new Date(currentDate);
                dateTime.setHours(hour);
                onDateClick(dateTime);
              }}
              className="grid grid-cols-[100px_1fr] border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="py-4 px-4 text-sm text-gray-500 bg-gray-50">
                {timeLabel}
              </div>
              <div className="py-2 px-4 border-l border-gray-100 min-h-[80px] relative">
                {hourEvents.map((event) => {
                  const eventDate = new Date(event.start);
                  const eventEnd = new Date(event.end);
                  const startMin = eventDate.getMinutes();
                  const duration = (eventEnd - eventDate) / (1000 * 60); // minutes
                  
                  return (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`absolute left-2 right-2 ${getEventColor(event.type)} text-white p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}
                      style={{ 
                        top: `${(startMin / 60) * 100}%`,
                        height: `${(duration / 60) * 100}%`,
                        minHeight: '40px'
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-90 mt-1">
                        {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {eventEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;