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
import TaskList from '@/app/(website)/components/tasks/TaskList';
import TaskFilters from '@/app/(website)/components/tasks/TaskFilters';
import CreateTaskModal from '@/app/(website)/components/tasks/CreateTaskModal';
import TaskStats from '@/app/(website)/components/tasks/TaskStats';
import TaskCalendar from '@/app/(website)/components/tasks/TaskCalendar';

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        sort_by: mapSortField(sortBy),
        order: sortOrder
      });

      // Add filters if not 'all'
      if (filters.status !== 'all') queryParams.append('status', filters.status);
      if (filters.priority !== 'all') queryParams.append('priority', filters.priority);
      if (filters.course !== 'all') queryParams.append('course', filters.course);
      
      // Handle due date filter
      if (filters.dueDate !== 'all') {
        if (filters.dueDate === 'overdue') {
          queryParams.append('due_date', 'overdue');
        } else if (filters.dueDate === 'today') {
          queryParams.append('due_date', 'today');
        } else if (filters.dueDate === 'tomorrow') {
          queryParams.append('due_date', 'tomorrow');
        } else if (filters.dueDate === 'this-week') {
          queryParams.append('due_date', 'this-week');
        }
      }

      // Add search query
      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      console.log('Fetching tasks from:', `${API_ENDPOINT}/task?${queryParams}`);
      
      const response = await fetch(`${API_ENDPOINT}/task?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch tasks');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle different response structures
      let tasksArray = [];
      
      if (Array.isArray(data)) {
        tasksArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        tasksArray = data.data;
      } else if (data.tasks && Array.isArray(data.tasks)) {
        tasksArray = data.tasks;
      } else {
        console.error('Unexpected API response structure:', data);
        tasksArray = [];
      }
      
      // Transform API data to match frontend format
      const transformedTasks = tasksArray.map(task => ({
        id: task.id?.toString() || Math.random().toString(),
        title: task.title || '',
        description: task.description || '',
        course: task.course || 'General',
        courseColor: task.courseColor || 'blue',
        dueDate: task.due_date || task.dueDate || new Date().toISOString(),
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        progress: task.progress || 0,
        subtasks: task.subtasks || [],
        attachments: task.attachments || [],
        comments: task.comments || 0,
        createdAt: task.created_at || task.createdAt || new Date().toISOString(),
        estimatedTime: task.estimated_time || task.estimatedTime || 60
      }));

      setTasks(transformedTasks);
      
      // Handle pagination if present
      if (data.pagination) {
        setPagination(data.pagination);
      } else if (data.meta) {
        setPagination({
          page: data.meta.page || 1,
          limit: data.meta.limit || 10,
          total: data.meta.total || transformedTasks.length,
          pages: data.meta.pages || 1
        });
      }

    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskStats = async () => {
    try {
      console.log('Fetching stats from:', `${API_ENDPOINT}/task/stats`);
      
      const response = await fetch(`${API_ENDPOINT}/task/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorText = await response.text();
        console.error('Stats error response:', errorText);
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }

      const data = await response.json();
      console.log('Stats response:', data);
      
      // Handle the response structure from your backend
      if (data.success && data.data) {
        setStats(data.data);
      } else if (data.data) {
        setStats(data.data);
      } else if (data.stats) {
        setStats(data.stats);
      } else {
        // If the response is the stats object directly
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Don't show error to user for stats - it's not critical
    }
  };

  // Map frontend sort field to backend sort field
  const mapSortField = (field) => {
    const mapping = {
      'dueDate': 'due_date',
      'priority': 'priority',
      'createdAt': 'created_at',
      'title': 'title'
    };
    return mapping[field] || 'created_at';
  };

  // Load tasks when dependencies change
  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, [filters.status, filters.priority, filters.course, filters.dueDate, searchQuery, sortBy, sortOrder, pagination.page]);

  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          due_date: newTask.dueDate,
          priority: newTask.priority,
          estimated_time: newTask.estimatedTime,
          course: newTask.course
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create task');
      }

      console.log('Create task response:', await response.json());
      
      // Refresh tasks list
      await fetchTasks();
      await fetchTaskStats();
      setShowCreateModal(false);
      
    } catch (err) {
      console.error('Error creating task:', err);
      alert(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updates.title,
          description: updates.description,
          due_date: updates.dueDate,
          priority: updates.priority,
          status: updates.status,
          progress: updates.progress
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update task');
      }

      // Update local state optimistically
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
      
      // Refresh stats
      await fetchTaskStats();
      
    } catch (err) {
      console.error('Error updating task:', err);
      alert(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`${API_ENDPOINT}/task/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }

      // Remove from local state immediately
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      
      // Refresh stats
      await fetchTaskStats();
      
    } catch (err) {
      console.error('Error deleting task:', err);
      alert(err.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await handleUpdateTask(taskId, { status: newStatus });
  };

  const handleProgressUpdate = async (taskId, progress) => {
    await handleUpdateTask(taskId, { progress });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const uniqueCourses = [...new Set(tasks.map(t => t.course))];

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Tasks</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and organize your academic tasks
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
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
        <TaskStats tasks={tasks} stats={stats} />

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
              onChange={handleSortChange}
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
              tasks={tasks}
              view={view}
              onStatusChange={handleStatusChange}
              onProgressUpdate={handleProgressUpdate}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              setShowCreateModal={setShowCreateModal}
            />
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-600">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
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