"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Calendar, 
  ListTodo, 
  LayoutGrid,
  ChevronDown,
  Search
} from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import TaskFilters from '@/components/tasks/TaskFilters';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import TaskStats from '@/components/tasks/TaskStats';
import TaskCalendar from '@/components/tasks/TaskCalendar';

const TasksContainer = () => {
  const [view, setView] = useState('list'); // 'list', 'grid', 'calendar'
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    course: 'all',
    dueDate: 'all'
  });
  const [sortBy, setSortBy] = useState('dueDate');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTasks([
        {
          id: 't1',
          title: 'Calculus III - Problem Set 7',
          description: 'Complete problems 1-20 from Chapter 7. Focus on integration techniques and applications.',
          course: 'MATH 301',
          courseColor: 'blue',
          dueDate: '2024-03-25T23:59:00',
          priority: 'high',
          status: 'pending',
          progress: 0,
          subtasks: [
            { id: 'st1', title: 'Review integration formulas', completed: true },
            { id: 'st2', title: 'Complete problems 1-10', completed: false },
            { id: 'st3', title: 'Complete problems 11-20', completed: false }
          ],
          attachments: [],
          comments: 3,
          createdAt: '2024-03-20T10:00:00',
          estimatedTime: 120 // minutes
        },
        {
          id: 't2',
          title: 'Read Chapter 5: Quantum Mechanics',
          description: 'Read and take notes on Chapter 5 covering wave functions and Schrödinger equation.',
          course: 'PHYS 202',
          courseColor: 'green',
          dueDate: '2024-03-23T23:59:00',
          priority: 'medium',
          status: 'in-progress',
          progress: 45,
          subtasks: [
            { id: 'st4', title: 'Read sections 5.1-5.3', completed: true },
            { id: 'st5', title: 'Take notes on key concepts', completed: true },
            { id: 'st6', title: 'Solve practice problems', completed: false }
          ],
          attachments: ['chapter5_notes.pdf'],
          comments: 1,
          createdAt: '2024-03-18T14:30:00',
          estimatedTime: 90
        },
        {
          id: 't3',
          title: 'Submit Research Paper Draft',
          description: 'Submit first draft of research paper on machine learning applications in healthcare.',
          course: 'CS 450',
          courseColor: 'purple',
          dueDate: '2024-03-28T23:59:00',
          priority: 'high',
          status: 'pending',
          progress: 30,
          subtasks: [
            { id: 'st7', title: 'Write introduction', completed: true },
            { id: 'st8', title: 'Complete literature review', completed: true },
            { id: 'st9', title: 'Write methodology section', completed: false },
            { id: 'st10', title: 'Format citations', completed: false }
          ],
          attachments: ['research_draft_v1.docx', 'references.bib'],
          comments: 5,
          createdAt: '2024-03-15T09:15:00',
          estimatedTime: 180
        },
        {
          id: 't4',
          title: 'Group Meeting - Project Alpha',
          description: 'Weekly sync with project team to discuss progress and next steps.',
          course: 'CS 450',
          courseColor: 'purple',
          dueDate: '2024-03-22T15:00:00',
          priority: 'medium',
          status: 'completed',
          progress: 100,
          subtasks: [
            { id: 'st11', title: 'Prepare agenda', completed: true },
            { id: 'st12', title: 'Update progress docs', completed: true },
            { id: 'st13', title: 'Take meeting notes', completed: true }
          ],
          attachments: ['meeting_notes_0322.docx'],
          comments: 2,
          createdAt: '2024-03-19T11:00:00',
          estimatedTime: 60
        },
        {
          id: 't5',
          title: 'Review for Midterm Exam',
          description: 'Comprehensive review for Biology midterm covering chapters 1-8.',
          course: 'BIOL 110',
          courseColor: 'red',
          dueDate: '2024-03-30T09:00:00',
          priority: 'low',
          status: 'pending',
          progress: 10,
          subtasks: [
            { id: 'st14', title: 'Review chapter summaries', completed: true },
            { id: 'st15', title: 'Create flashcards', completed: false },
            { id: 'st16', title: 'Take practice test', completed: false }
          ],
          attachments: [],
          comments: 0,
          createdAt: '2024-03-21T16:45:00',
          estimatedTime: 240
        }
      ]);
      
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const handleCreateTask = (newTask) => {
    const task = {
      id: `t${tasks.length + 1}`,
      ...newTask,
      status: 'pending',
      progress: 0,
      subtasks: [],
      attachments: [],
      comments: 0,
      createdAt: new Date().toISOString()
    };
    setTasks([task, ...tasks]);
    setShowCreateModal(false);
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId, newStatus) => {
    handleUpdateTask(taskId, { status: newStatus });
  };

  const handleProgressUpdate = (taskId, progress) => {
    handleUpdateTask(taskId, { progress });
  };

  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Course filter
    if (filters.course !== 'all' && task.course !== filters.course) {
      return false;
    }
    
    // Due date filter
    if (filters.dueDate !== 'all') {
      const today = new Date();
      const dueDate = new Date(task.dueDate);
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      switch (filters.dueDate) {
        case 'today':
          if (dueDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'tomorrow':
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          if (dueDate.toDateString() !== tomorrow.toDateString()) return false;
          break;
        case 'this-week':
          if (dueDate < today || dueDate > weekFromNow) return false;
          break;
        case 'overdue':
          if (dueDate >= today) return false;
          break;
      }
    }
    
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      case 'createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const uniqueCourses = [...new Set(tasks.map(t => t.course))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and organize your academic tasks
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <ListTodo className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              {/* Create Task Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Search and Filters Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-3">
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
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="createdAt">Sort by Created Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <TaskFilters
            filters={filters}
            setFilters={setFilters}
            courses={uniqueCourses}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Tasks Display */}
        <div className="mt-6">
          {view === 'calendar' ? (
            <TaskCalendar tasks={tasks} />
          ) : (
            <TaskList
              tasks={sortedTasks}
              view={view}
              onStatusChange={handleStatusChange}
              onProgressUpdate={handleProgressUpdate}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTask={handleCreateTask}
        courses={uniqueCourses}
      />
    </div>
  );
};

export default TasksContainer;