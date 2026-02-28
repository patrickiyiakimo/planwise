"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

const MonthView = ({ currentDate, events, onDateClick, onEventClick }) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === dateStr;
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

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-32 bg-gray-50 border-b border-r border-gray-200"></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getEventsForDate(day);
          const isCurrentDay = isToday(day);
          
          return (
            <div
              key={day}
              onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              className={`h-32 border-b border-r border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                isCurrentDay ? 'bg-indigo-50' : ''
              }`}
            >
              {/* Day Number */}
              <div className={`flex items-center justify-between mb-1 ${
                isCurrentDay ? 'font-bold text-indigo-600' : 'text-gray-700'
              }`}>
                <span className="text-sm">{day}</span>
                {dayEvents.length > 0 && (
                  <span className="text-xs text-gray-500">{dayEvents.length}</span>
                )}
              </div>

              {/* Events */}
              <div className="space-y-1 overflow-hidden max-h-20">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className="group relative"
                  >
                    <div className={`${getEventColor(event.type)} h-1.5 rounded-full mb-1`}></div>
                    <div className="text-xs truncate text-gray-600 group-hover:text-gray-900">
                      {event.title}
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-400 flex items-center">
                    +{dayEvents.length - 3} more
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;