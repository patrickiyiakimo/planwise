"use client";

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Grid,
  List,
  Clock,
  Bell,
  Download
} from 'lucide-react';
import CalendarView from '@/app/(website)/components/calendar/CalendarView';
import EventModal from '@/app/(website)/components/calendar/EventModal';
import CalendarFilters from '@/app/(website)/components/calendar/CalendarFilters';
import MiniCalendar from '@/app/(website)/components/calendar/MiniCalendar';
import UpcomingEvents from '@/app/(website)/components/calendar/UpcomingEvents';

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day', 'agenda'
  const [showFilters, setShowFilters] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    course: 'all',
    priority: 'all'
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setEvents([
        {
          id: 'e1',
          title: 'Calculus III - Problem Set 7 Due',
          type: 'assignment',
          course: 'MATH 301',
          courseColor: 'blue',
          start: '2024-03-25T23:59:00',
          end: '2024-03-25T23:59:00',
          allDay: true,
          priority: 'high',
          description: 'Complete problems 1-20 from Chapter 7',
          location: 'Online Submission',
          attachments: ['problem_set_7.pdf'],
          reminders: ['1 day before', '1 hour before']
        },
        {
          id: 'e2',
          title: 'Machine Learning Study Group',
          type: 'study-group',
          course: 'CS 450',
          courseColor: 'purple',
          start: '2024-03-22T15:00:00',
          end: '2024-03-22T17:00:00',
          allDay: false,
          priority: 'medium',
          description: 'Weekly study group meeting to discuss neural networks',
          location: 'CS Building 205',
          attendees: ['Alex J.', 'Sarah K.', 'Mike T.'],
          reminders: ['1 hour before']
        },
        {
          id: 'e3',
          title: 'Physics Lab Report',
          type: 'assignment',
          course: 'PHYS 202',
          courseColor: 'green',
          start: '2024-03-28T23:59:00',
          end: '2024-03-28T23:59:00',
          allDay: true,
          priority: 'medium',
          description: 'Write lab report on electromagnetism experiment',
          location: 'Online Submission',
          attachments: ['lab_template.docx']
        },
        {
          id: 'e4',
          title: 'Office Hours - Dr. Chen',
          type: 'office-hours',
          course: 'CS 450',
          courseColor: 'purple',
          start: '2024-03-20T14:00:00',
          end: '2024-03-20T15:00:00',
          allDay: false,
          priority: 'low',
          description: 'Discuss final project ideas',
          location: 'CS Building 302'
        },
        {
          id: 'e5',
          title: 'Midterm Exam - Biology',
          type: 'exam',
          course: 'BIOL 110',
          courseColor: 'red',
          start: '2024-03-30T09:00:00',
          end: '2024-03-30T11:00:00',
          allDay: false,
          priority: 'high',
          description: 'Chapters 1-8. Bring calculator and pencil.',
          location: 'Science Hall 101',
          reminders: ['1 week before', '1 day before', '1 hour before']
        },
        {
          id: 'e6',
          title: 'Technical Writing Workshop',
          type: 'workshop',
          course: 'ENGL 210',
          courseColor: 'yellow',
          start: '2024-03-23T13:00:00',
          end: '2024-03-23T15:30:00',
          allDay: false,
          priority: 'medium',
          description: 'Workshop on academic writing and citations',
          location: 'Humanities 210'
        },
        {
          id: 'e7',
          title: 'Career Fair',
          type: 'event',
          course: null,
          courseColor: 'gray',
          start: '2024-03-26T10:00:00',
          end: '2024-03-26T16:00:00',
          allDay: false,
          priority: 'medium',
          description: 'Spring Career Fair - meet with tech companies',
          location: 'Student Union Ballroom'
        },
        {
          id: 'e8',
          title: 'Study Session - Calculus',
          type: 'study-session',
          course: 'MATH 301',
          courseColor: 'blue',
          start: '2024-03-24T18:00:00',
          end: '2024-03-24T20:00:00',
          allDay: false,
          priority: 'medium',
          description: 'Group study for upcoming exam',
          location: 'Library Room 204',
          attendees: ['David L.', 'Emma W.', 'Chris P.']
        }
      ]);
      
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handlePrevPeriod = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCreateEvent = (newEvent) => {
    const event = {
      id: `e${events.length + 1}`,
      ...newEvent,
      createdAt: new Date().toISOString()
    };
    setEvents([...events, event]);
    setShowEventModal(false);
  };

  const handleUpdateEvent = (eventId, updates) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, ...updates } : event
    ));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleReminderSet = (eventId) => {
    // Implement reminder logic
    console.log('Set reminder for event:', eventId);
  };

  const filteredEvents = events.filter(event => {
    // Type filter
    if (filters.type !== 'all' && event.type !== filters.type) {
      return false;
    }
    
    // Course filter
    if (filters.course !== 'all' && event.course !== filters.course) {
      return false;
    }
    
    // Priority filter
    if (filters.priority !== 'all' && event.priority !== filters.priority) {
      return false;
    }
    
    return true;
  });

  const uniqueCourses = [...new Set(events.filter(e => e.course).map(e => e.course))];
  const eventTypes = ['assignment', 'exam', 'study-group', 'study-session', 'office-hours', 'workshop', 'event'];

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const getUpcomingEvents = (days = 7) => {
    const now = new Date();
    const future = new Date(now);
    future.setDate(future.getDate() + days);
    
    return filteredEvents
      .filter(event => new Date(event.start) >= now && new Date(event.start) <= future)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                <span className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                  {events.length} Events
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Manage your schedule and stay on top of deadlines
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('month')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'month' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'week' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'day' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setView('agenda')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    view === 'agenda' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  Agenda
                </button>
              </div>

              {/* Add Event Button */}
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  setSelectedDate(new Date());
                  setShowEventModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Calendar Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToday}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Today
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPeriod}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextPeriod}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric',
                ...(view === 'week' && { day: 'numeric' }),
                ...(view === 'day' && { weekday: 'long', day: 'numeric', month: 'long' })
              })}
            </h2>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg flex items-center space-x-2 transition-colors ${
                showFilters 
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <CalendarFilters
            filters={filters}
            setFilters={setFilters}
            courses={uniqueCourses}
            eventTypes={eventTypes}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Main Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Mini Calendar & Upcoming Events */}
          <div className="lg:col-span-1 space-y-6">
            <MiniCalendar
              currentDate={currentDate}
              events={events}
              onDateSelect={setCurrentDate}
            />
            <UpcomingEvents
              events={getUpcomingEvents(7)}
              onEventClick={handleEventClick}
            />
          </div>

          {/* Main Calendar View */}
          <div className="lg:col-span-3">
            <CalendarView
              view={view}
              currentDate={currentDate}
              events={filteredEvents}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              onEventDrop={(eventId, newDate) => {
                handleUpdateEvent(eventId, { start: newDate, end: newDate });
              }}
            />
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          selectedDate={selectedDate}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
            setSelectedDate(null);
          }}
          onCreate={handleCreateEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
          onReminderSet={handleReminderSet}
          courses={uniqueCourses}
        />
      )}
    </div>
  );
};

export default CalendarContainer;