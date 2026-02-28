"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter,
  Grid,
  List,
  Calendar,
  BarChart,
  Download,
  Upload
} from 'lucide-react';
import CourseGrid from '@/components/courses/CourseGrid';
import CourseDetails from '@/components/courses/CourseDetails';
import CourseForm from '@/components/courses/CourseForm';
import CourseFilters from '@/components/courses/CourseFilters';
import CourseStats from '@/components/courses/CourseStats';

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
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourses([
        {
          id: 'c1',
          code: 'CS 450',
          name: 'Machine Learning',
          instructor: 'Dr. Sarah Chen',
          instructorEmail: 's.chen@university.edu',
          instructorOffice: 'CS Building 302',
          semester: 'Spring 2024',
          creditHours: 3,
          status: 'in-progress',
          progress: 75,
          grade: 'A-',
          gradePoints: 3.7,
          startDate: '2024-01-15',
          endDate: '2024-05-10',
          schedule: [
            { day: 'Monday', time: '10:00 AM - 11:30 AM', location: 'CS Hall 101' },
            { day: 'Wednesday', time: '10:00 AM - 11:30 AM', location: 'CS Hall 101' }
          ],
          syllabus: 'syllabus_cs450.pdf',
          materials: [
            { id: 'm1', title: 'Introduction to Machine Learning', type: 'textbook', url: '#' },
            { id: 'm2', title: 'Lecture Slides Week 1-4', type: 'slides', url: '#' }
          ],
          assignments: [
            { 
              id: 'a1', 
              title: 'Linear Regression Implementation', 
              dueDate: '2024-03-25T23:59:00', 
              status: 'pending',
              points: 100,
              submitted: false,
              description: 'Implement linear regression from scratch using Python'
            },
            { 
              id: 'a2', 
              title: 'Neural Networks from Scratch', 
              dueDate: '2024-04-05T23:59:00', 
              status: 'pending',
              points: 150,
              submitted: false,
              description: 'Build a simple neural network using NumPy'
            }
          ],
          announcements: [
            { id: 'an1', title: 'Midterm Review Session', date: '2024-03-20', content: 'Review session on Friday at 3 PM' }
          ],
          color: 'purple',
          icon: '🤖',
          description: 'Introduction to machine learning algorithms and their applications'
        },
        {
          id: 'c2',
          code: 'MATH 301',
          name: 'Calculus III',
          instructor: 'Dr. Michael Roberts',
          instructorEmail: 'm.roberts@university.edu',
          instructorOffice: 'Math Building 205',
          semester: 'Spring 2024',
          creditHours: 4,
          status: 'in-progress',
          progress: 60,
          grade: 'B+',
          gradePoints: 3.3,
          startDate: '2024-01-15',
          endDate: '2024-05-10',
          schedule: [
            { day: 'Tuesday', time: '9:00 AM - 10:30 AM', location: 'Math Hall 210' },
            { day: 'Thursday', time: '9:00 AM - 10:30 AM', location: 'Math Hall 210' },
            { day: 'Friday', time: '10:00 AM - 11:00 AM', location: 'Math Hall 210' }
          ],
          syllabus: 'syllabus_math301.pdf',
          materials: [
            { id: 'm3', title: 'Calculus: Early Transcendentals', type: 'textbook', url: '#' }
          ],
          assignments: [
            { 
              id: 'a3', 
              title: 'Problem Set 7 - Vector Calculus', 
              dueDate: '2024-03-22T23:59:00', 
              status: 'pending',
              points: 50,
              submitted: false,
              description: 'Complete problems 1-20 from Chapter 7'
            }
          ],
          announcements: [
            { id: 'an2', title: 'Office Hours Change', date: '2024-03-18', content: 'Office hours moved to Wednesdays 2-4 PM' }
          ],
          color: 'blue',
          icon: '📐',
          description: 'Advanced calculus covering multivariable functions, vector calculus, and theorems'
        },
        {
          id: 'c3',
          code: 'PHYS 202',
          name: 'Physics II',
          instructor: 'Dr. James Wilson',
          instructorEmail: 'j.wilson@university.edu',
          instructorOffice: 'Physics Building 120',
          semester: 'Spring 2024',
          creditHours: 4,
          status: 'in-progress',
          progress: 45,
          grade: 'C+',
          gradePoints: 2.3,
          startDate: '2024-01-15',
          endDate: '2024-05-10',
          schedule: [
            { day: 'Monday', time: '1:00 PM - 2:30 PM', location: 'Physics Lab 105' },
            { day: 'Wednesday', time: '1:00 PM - 2:30 PM', location: 'Physics Lab 105' },
            { day: 'Friday', time: '2:00 PM - 4:00 PM', location: 'Physics Lab 105' }
          ],
          syllabus: 'syllabus_phys202.pdf',
          materials: [
            { id: 'm4', title: 'University Physics Volume 2', type: 'textbook', url: '#' }
          ],
          assignments: [
            { 
              id: 'a4', 
              title: 'Lab Report: Electromagnetism', 
              dueDate: '2024-03-28T23:59:00', 
              status: 'pending',
              points: 75,
              submitted: false,
              description: 'Write lab report on electromagnetism experiment'
            }
          ],
          announcements: [],
          color: 'green',
          icon: '⚡',
          description: 'Electromagnetism, optics, and modern physics'
        },
        {
          id: 'c4',
          code: 'ENGL 210',
          name: 'Technical Writing',
          instructor: 'Prof. Emily Davis',
          instructorEmail: 'e.davis@university.edu',
          instructorOffice: 'Humanities Building 45',
          semester: 'Spring 2024',
          creditHours: 3,
          status: 'completed',
          progress: 100,
          grade: 'A',
          gradePoints: 4.0,
          startDate: '2024-01-15',
          endDate: '2024-05-10',
          schedule: [
            { day: 'Tuesday', time: '2:00 PM - 3:30 PM', location: 'Humanities 210' },
            { day: 'Thursday', time: '2:00 PM - 3:30 PM', location: 'Humanities 210' }
          ],
          syllabus: 'syllabus_engl210.pdf',
          materials: [],
          assignments: [
            { 
              id: 'a5', 
              title: 'Research Paper Final Draft', 
              dueDate: '2024-03-15T23:59:00', 
              status: 'submitted',
              points: 200,
              submitted: true,
              grade: 185,
              feedback: 'Excellent work on the research methodology',
              description: 'Submit final draft of research paper'
            }
          ],
          announcements: [],
          color: 'yellow',
          icon: '✍️',
          description: 'Principles of technical and professional writing'
        },
        {
          id: 'c5',
          code: 'BIOL 110',
          name: 'Biology I',
          instructor: 'Dr. Lisa Thompson',
          instructorEmail: 'l.thompson@university.edu',
          instructorOffice: 'Science Building 340',
          semester: 'Spring 2024',
          creditHours: 4,
          status: 'planned',
          progress: 0,
          grade: null,
          gradePoints: null,
          startDate: '2024-08-25',
          endDate: '2024-12-15',
          schedule: [
            { day: 'Monday', time: '9:00 AM - 10:30 AM', location: 'Science Hall 101' },
            { day: 'Wednesday', time: '9:00 AM - 10:30 AM', location: 'Science Hall 101' },
            { day: 'Friday', time: '10:00 AM - 12:00 PM', location: 'Science Lab 205' }
          ],
          syllabus: null,
          materials: [],
          assignments: [],
          announcements: [],
          color: 'red',
          icon: '🧬',
          description: 'Introduction to cellular and molecular biology'
        }
      ]);
      
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleAddCourse = (newCourse) => {
    const course = {
      id: `c${courses.length + 1}`,
      ...newCourse,
      progress: 0,
      grade: null,
      assignments: [],
      announcements: [],
      color: getRandomColor(),
      icon: getRandomIcon()
    };
    setCourses([...courses, course]);
    setShowCourseForm(false);
  };

  const handleUpdateCourse = (courseId, updates) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, ...updates } : course
    ));
    setShowCourseDetails(false);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setShowCourseDetails(false);
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  const handleAssignmentSubmit = (courseId, assignmentId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedAssignments = course.assignments.map(assignment =>
          assignment.id === assignmentId ? { ...assignment, submitted: true, status: 'submitted' } : assignment
        );
        return { ...course, assignments: updatedAssignments };
      }
      return course;
    }));
  };

  const handleGradeUpdate = (courseId, newGrade) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, grade: newGrade } : course
    ));
  };

  const getRandomColor = () => {
    const colors = ['purple', 'blue', 'green', 'yellow', 'red', 'indigo'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomIcon = () => {
    const icons = ['📚', '🔬', '📐', '✍️', '🧪', '💻', '🌍', '🎨', '🎵', '📊'];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const filteredCourses = courses.filter(course => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        course.code.toLowerCase().includes(query) ||
        course.name.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }
    
    // Semester filter
    if (filters.semester !== 'all' && course.semester !== filters.semester) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && course.status !== filters.status) {
      return false;
    }
    
    // Credit hours filter
    if (filters.creditHours !== 'all') {
      const hours = course.creditHours;
      if (filters.creditHours === '1-2' && (hours < 1 || hours > 2)) return false;
      if (filters.creditHours === '3-4' && (hours < 3 || hours > 4)) return false;
      if (filters.creditHours === '5+' && hours < 5) return false;
    }
    
    return true;
  });

  const semesters = [...new Set(courses.map(c => c.semester))];
  const instructors = [...new Set(courses.map(c => c.instructor))];

  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => c.status === 'in-progress').length,
    completed: courses.filter(c => c.status === 'completed').length,
    planned: courses.filter(c => c.status === 'planned').length,
    totalCredits: courses.reduce((acc, c) => acc + c.creditHours, 0),
    currentGPA: calculateGPA(courses)
  };

  function calculateGPA(courses) {
    const gradedCourses = courses.filter(c => c.gradePoints);
    if (gradedCourses.length === 0) return '0.00';
    const total = gradedCourses.reduce((acc, c) => acc + c.gradePoints, 0);
    return (total / gradedCourses.length).toFixed(2);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <span className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                  {stats.total} Courses
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Manage your academic courses and track your progress
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
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
            </button>
            
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
            courses={filteredCourses}
            view={view}
            onViewCourse={handleViewCourse}
          />
        </div>
      </div>

      {/* Course Form Modal */}
      {showCourseForm && (
        <CourseForm
          onClose={() => setShowCourseForm(false)}
          onSubmit={handleAddCourse}
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