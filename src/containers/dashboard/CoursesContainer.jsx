"use client"

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Grid,
  List,
  Calendar,
  Download,
  ChevronDown
} from 'lucide-react';
import CourseGrid from '@/app/(website)/components/courses/CourseGrid';
import CourseDetails from '@/app/(website)/components/courses/CourseDetails';
import CourseForm from '@/app/(website)/components/courses/CourseForm';
import CourseFilters from '@/app/(website)/components/courses/CourseFilters';
import CourseStats from '@/app/(website)/components/courses/CourseStats';

const CoursesContainer = () => {
  const [view, setView] = useState('grid'); // 'grid', 'list', 'calendar'
  const [showFilters, setShowFilters] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    semester: 'all',
    status: 'all',
    creditHours: 'all',
    instructor: 'all'
  });
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    planned: 0,
    totalCredits: 0,
    currentGPA: '0.00',
    gradedCourses: 0,
    upcomingAssignments: [],
    gradeDistribution: []
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

  // Fetch courses from API
  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      });

      // Add filters if not 'all'
      if (filters.status !== 'all') queryParams.append('status', filters.status);
      if (filters.semester !== 'all') queryParams.append('semester', filters.semester);
      if (filters.instructor !== 'all') queryParams.append('instructor', filters.instructor);
      
      // Handle credit hours filter
      if (filters.creditHours !== 'all') {
        if (filters.creditHours === '1-2') {
          queryParams.append('min_credits', '1');
          queryParams.append('max_credits', '2');
        } else if (filters.creditHours === '3-4') {
          queryParams.append('min_credits', '3');
          queryParams.append('max_credits', '4');
        } else if (filters.creditHours === '5+') {
          queryParams.append('min_credits', '5');
        }
      }

      // Add search query
      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      console.log('Fetching courses from:', `${API_ENDPOINT}/courses?${queryParams}`);
      
      const response = await fetch(`${API_ENDPOINT}/courses?${queryParams}`, {
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
        throw new Error(errorData.message || 'Failed to fetch courses');
      }

      const data = await response.json();
      console.log('Courses API Response:', data);
      
      if (data.success && data.data) {
        setCourses(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } else {
        setCourses([]);
      }

    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  // Fetch course statistics
  const fetchCourseStats = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/courses/stats`, {
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
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      console.log('Stats response:', data);
      
      if (data.success && data.data) {
        setStats(data.data);
      }

    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Load courses when dependencies change
  useEffect(() => {
    fetchCourses();
    fetchCourseStats();
  }, [filters.status, filters.semester, filters.instructor, filters.creditHours, searchQuery, pagination.page]);

  const handleCreateCourse = async (newCourse) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }

      const data = await response.json();
      console.log('Create course response:', data);
      
      // Refresh courses list
      await fetchCourses();
      await fetchCourseStats();
      setShowCourseForm(false);
      
    } catch (err) {
      console.error('Error creating course:', err);
      alert(err.message || 'Failed to create course');
    }
  };

  const handleUpdateCourse = async (courseId, updates) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update course');
      }

      const data = await response.json();
      console.log('Update course response:', data);
      
      // Update local state optimistically
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId ? { ...course, ...updates } : course
        )
      );
      
      // Refresh stats
      await fetchCourseStats();
      setShowCourseDetails(false);
      
    } catch (err) {
      console.error('Error updating course:', err);
      alert(err.message || 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await fetch(`${API_ENDPOINT}/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete course');
      }

      // Remove from local state
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      
      // Refresh stats
      await fetchCourseStats();
      setShowCourseDetails(false);
      
    } catch (err) {
      console.error('Error deleting course:', err);
      alert(err.message || 'Failed to delete course');
    }
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const handleAssignmentSubmit = async (courseId, assignmentId, submission) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/courses/${courseId}/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionNote: submission.note,
          fileUrl: submission.fileUrl
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit assignment');
      }

      const data = await response.json();
      console.log('Submit assignment response:', data);
      
      // Refresh courses to show updated assignment
      await fetchCourses();
      await fetchCourseStats();
      
    } catch (err) {
      console.error('Error submitting assignment:', err);
      alert(err.message || 'Failed to submit assignment');
    }
  };

  const handleGradeUpdate = async (courseId, newGrade) => {
    await handleUpdateCourse(courseId, { grade: newGrade });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    // You can implement sorting logic here
    console.log('Sort by:', value);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Get unique values for filters
  const semesters = [...new Set(courses.map(c => c.semester))];
  const instructors = [...new Set(courses.map(c => c.instructor))];

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Courses</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
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
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <span className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                  {stats.total} Courses
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Manage your academic courses and track your progress
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                  }`}
                >
                  <List className="w-5 h-5" />
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

              {/* Add Course Button */}
              <button
                onClick={() => setShowCourseForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Course</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats Overview */}
        <CourseStats stats={stats} />

        {/* Search and Filters Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses by code, name, or instructor..."
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
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
            >
              <option value="created_at">Sort by Newest</option>
              <option value="code">Sort by Code</option>
              <option value="name">Sort by Name</option>
              <option value="credit_hours">Sort by Credits</option>
              <option value="status">Sort by Status</option>
              <option value="grade_points">Sort by Grade</option>
            </select>

            <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <CourseFilters
            filters={filters}
            setFilters={setFilters}
            semesters={semesters}
            instructors={instructors}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Courses Grid/List */}
        <div className="mt-6">
          <CourseGrid
            courses={courses}
            setShowCourseForm = {setShowCourseForm}
            view={view}
            onViewCourse={handleViewCourse}
          />
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

      {/* Course Form Modal */}
      {showCourseForm && (
        <CourseForm
          onClose={() => setShowCourseForm(false)}
          onSubmit={handleCreateCourse}
          semesters={semesters}
        />
      )}

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          onClose={() => setShowCourseDetails(false)}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
          onAssignmentSubmit={handleAssignmentSubmit}
          onGradeUpdate={handleGradeUpdate}
        />
      )}
    </div>
  );
};

export default CoursesContainer;