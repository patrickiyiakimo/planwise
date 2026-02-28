"use client";

import React from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import AgendaView from './AgendaView';

const CalendarView = ({ view, currentDate, events, onDateClick, onEventClick, onEventDrop }) => {
  switch (view) {
    case 'month':
      return (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
        />
      );
    case 'week':
      return (
        <WeekView
          currentDate={currentDate}
          events={events}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          onEventDrop={onEventDrop}
        />
      );
    case 'day':
      return (
        <DayView
          currentDate={currentDate}
          events={events}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          onEventDrop={onEventDrop}
        />
      );
    case 'agenda':
      return (
        <AgendaView
          currentDate={currentDate}
          events={events}
          onEventClick={onEventClick}
        />
      );
    default:
      return null;
  }
};

export default CalendarView;