// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Filter, 
//   Calendar, 
//   ListTodo, 
//   LayoutGrid,
//   ChevronDown,
//   Search
// } from 'lucide-react';
// import TaskList from '@/app/(website)/components/tasks/TaskList';
// import TaskFilters from '@/app/(website)/components/tasks/TaskFilters';
// import CreateTaskModal from '@/app/(website)/components/tasks/CreateTaskModal';
// import TaskStats from '@/app/(website)/components/tasks/TaskStats';
// import TaskCalendar from '@/app/(website)/components/tasks/TaskCalendar';

// const TasksContainer = () => {
//   const [view, setView] = useState('list'); // 'list', 'grid', 'calendar'
//   const [showFilters, setShowFilters] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     priority: 'all',
//     course: 'all',
//     dueDate: 'all'
//   });
//   const [sortBy, setSortBy] = useState('dueDate');
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Mock data - replace with API call
//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       setTasks([
//         {
//           id: 't1',
//           title: 'Calculus III - Problem Set 7',
//           description: 'Complete problems 1-20 from Chapter 7. Focus on integration techniques and applications.',
//           course: 'MATH 301',
//           courseColor: 'blue',
//           dueDate: '2024-03-25T23:59:00',
//           priority: 'high',
//           status: 'pending',
//           progress: 0,
//           subtasks: [
//             { id: 'st1', title: 'Review integration formulas', completed: true },
//             { id: 'st2', title: 'Complete problems 1-10', completed: false },
//             { id: 'st3', title: 'Complete problems 11-20', completed: false }
//           ],
//           attachments: [],
//           comments: 3,
//           createdAt: '2024-03-20T10:00:00',
//           estimatedTime: 120 // minutes
//         },
//         {
//           id: 't2',
//           title: 'Read Chapter 5: Quantum Mechanics',
//           description: 'Read and take notes on Chapter 5 covering wave functions and Schrödinger equation.',
//           course: 'PHYS 202',
//           courseColor: 'green',
//           dueDate: '2024-03-23T23:59:00',
//           priority: 'medium',
//           status: 'in-progress',
//           progress: 45,
//           subtasks: [
//             { id: 'st4', title: 'Read sections 5.1-5.3', completed: true },
//             { id: 'st5', title: 'Take notes on key concepts', completed: true },
//             { id: 'st6', title: 'Solve practice problems', completed: false }
//           ],
//           attachments: ['chapter5_notes.pdf'],
//           comments: 1,
//           createdAt: '2024-03-18T14:30:00',
//           estimatedTime: 90
//         },
//         {
//           id: 't3',
//           title: 'Submit Research Paper Draft',
//           description: 'Submit first draft of research paper on machine learning applications in healthcare.',
//           course: 'CS 450',
//           courseColor: 'purple',
//           dueDate: '2024-03-28T23:59:00',
//           priority: 'high',
//           status: 'pending',
//           progress: 30,
//           subtasks: [
//             { id: 'st7', title: 'Write introduction', completed: true },
//             { id: 'st8', title: 'Complete literature review', completed: true },
//             { id: 'st9', title: 'Write methodology section', completed: false },
//             { id: 'st10', title: 'Format citations', completed: false }
//           ],
//           attachments: ['research_draft_v1.docx', 'references.bib'],
//           comments: 5,
//           createdAt: '2024-03-15T09:15:00',
//           estimatedTime: 180
//         },
//         {
//           id: 't4',
//           title: 'Group Meeting - Project Alpha',
//           description: 'Weekly sync with project team to discuss progress and next steps.',
//           course: 'CS 450',
//           courseColor: 'purple',
//           dueDate: '2024-03-22T15:00:00',
//           priority: 'medium',
//           status: 'completed',
//           progress: 100,
//           subtasks: [
//             { id: 'st11', title: 'Prepare agenda', completed: true },
//             { id: 'st12', title: 'Update progress docs', completed: true },
//             { id: 'st13', title: 'Take meeting notes', completed: true }
//           ],
//           attachments: ['meeting_notes_0322.docx'],
//           comments: 2,
//           createdAt: '2024-03-19T11:00:00',
//           estimatedTime: 60
//         },
//         {
//           id: 't5',
//           title: 'Review for Midterm Exam',
//           description: 'Comprehensive review for Biology midterm covering chapters 1-8.',
//           course: 'BIOL 110',
//           courseColor: 'red',
//           dueDate: '2024-03-30T09:00:00',
//           priority: 'low',
//           status: 'pending',
//           progress: 10,
//           subtasks: [
//             { id: 'st14', title: 'Review chapter summaries', completed: true },
//             { id: 'st15', title: 'Create flashcards', completed: false },
//             { id: 'st16', title: 'Take practice test', completed: false }
//           ],
//           attachments: [],
//           comments: 0,
//           createdAt: '2024-03-21T16:45:00',
//           estimatedTime: 240
//         }
//       ]);
      
//       setLoading(false);
//     };

//     fetchTasks();
//   }, []);

//   const handleCreateTask = (newTask) => {
//     const task = {
//       id: `t${tasks.length + 1}`,
//       ...newTask,
//       status: 'pending',
//       progress: 0,
//       subtasks: [],
//       attachments: [],
//       comments: 0,
//       createdAt: new Date().toISOString()
//     };
//     setTasks([task, ...tasks]);
//     setShowCreateModal(false);
//   };

//   const handleUpdateTask = (taskId, updates) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, ...updates } : task
//     ));
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   const handleStatusChange = (taskId, newStatus) => {
//     handleUpdateTask(taskId, { status: newStatus });
//   };

//   const handleProgressUpdate = (taskId, progress) => {
//     handleUpdateTask(taskId, { progress });
//   };

//   const filteredTasks = tasks.filter(task => {
//     // Search filter
//     if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
//         !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
//       return false;
//     }
    
//     // Status filter
//     if (filters.status !== 'all' && task.status !== filters.status) {
//       return false;
//     }
    
//     // Priority filter
//     if (filters.priority !== 'all' && task.priority !== filters.priority) {
//       return false;
//     }
    
//     // Course filter
//     if (filters.course !== 'all' && task.course !== filters.course) {
//       return false;
//     }
    
//     // Due date filter
//     if (filters.dueDate !== 'all') {
//       const today = new Date();
//       const dueDate = new Date(task.dueDate);
//       const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
//       switch (filters.dueDate) {
//         case 'today':
//           if (dueDate.toDateString() !== today.toDateString()) return false;
//           break;
//         case 'tomorrow':
//           const tomorrow = new Date(today);
//           tomorrow.setDate(tomorrow.getDate() + 1);
//           if (dueDate.toDateString() !== tomorrow.toDateString()) return false;
//           break;
//         case 'this-week':
//           if (dueDate < today || dueDate > weekFromNow) return false;
//           break;
//         case 'overdue':
//           if (dueDate >= today) return false;
//           break;
//       }
//     }
    
//     return true;
//   });

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     switch (sortBy) {
//       case 'dueDate':
//         return new Date(a.dueDate) - new Date(b.dueDate);
//       case 'priority':
//         const priorityWeight = { high: 3, medium: 2, low: 1 };
//         return priorityWeight[b.priority] - priorityWeight[a.priority];
//       case 'createdAt':
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case 'title':
//         return a.title.localeCompare(b.title);
//       default:
//         return 0;
//     }
//   });

//   const uniqueCourses = [...new Set(tasks.map(t => t.course))];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your tasks...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
//         <div className="px-6 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage and organize your academic tasks
//               </p>
//             </div>
            
//             <div className="flex items-center justify-center space-x-3">
//               {/* View Toggle */}
//               <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setView('list')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <ListTodo className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setView('grid')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <LayoutGrid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setView('calendar')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <Calendar className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Create Task Button */}
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 <span>New Task</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-6">
//         {/* Stats */}
//         <TaskStats tasks={tasks} />

//         {/* Search and Filters Bar */}
//         <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`px-4 py-2 border rounded-lg flex items-center space-x-2 transition-colors ${
//                 showFilters 
//                   ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
//                   : 'border-gray-200 text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <Filter className="w-4 h-4" />
//               <span>Filters</span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             </button>
            
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
//             >
//               <option value="dueDate">Sort by Due Date</option>
//               <option value="priority">Sort by Priority</option>
//               <option value="createdAt">Sort by Created Date</option>
//               <option value="title">Sort by Title</option>
//             </select>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <TaskFilters
//             filters={filters}
//             setFilters={setFilters}
//             courses={uniqueCourses}
//             onClose={() => setShowFilters(false)}
//           />
//         )}

//         {/* Tasks Display */}
//         <div className="mt-6">
//           {view === 'calendar' ? (
//             <TaskCalendar tasks={tasks} />
//           ) : (
//             <TaskList
//               tasks={sortedTasks}
//               view={view}
//               onStatusChange={handleStatusChange}
//               onProgressUpdate={handleProgressUpdate}
//               onDeleteTask={handleDeleteTask}
//               onUpdateTask={handleUpdateTask}
//             />
//           )}
//         </div>
//       </div>

//       {/* Create Task Modal */}
//       <CreateTaskModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onCreateTask={handleCreateTask}
//         courses={uniqueCourses}
//       />
//     </div>
//   );
// };

// export default TasksContainer;



// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Filter, 
//   Calendar, 
//   ListTodo, 
//   LayoutGrid,
//   ChevronDown,
//   Search
// } from 'lucide-react';
// import TaskList from '@/app/(website)/components/tasks/TaskList';
// import TaskFilters from '@/app/(website)/components/tasks/TaskFilters';
// import CreateTaskModal from '@/app/(website)/components/tasks/CreateTaskModal';
// import TaskStats from '@/app/(website)/components/tasks/TaskStats';
// import TaskCalendar from '@/app/(website)/components/tasks/TaskCalendar';

// const TasksContainer = () => {
//   const [view, setView] = useState('list'); // 'list', 'grid', 'calendar'
//   const [showFilters, setShowFilters] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     priority: 'all',
//     course: 'all',
//     dueDate: 'all'
//   });
//   const [sortBy, setSortBy] = useState('dueDate');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [tasks, setTasks] = useState([]);
//   const [stats, setStats] = useState({
//     totalTasks: 0,
//     completedTasks: 0,
//     pendingTasks: 0,
//     inProgressTasks: 0,
//     overdueTasks: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     pages: 0
//   });

//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000/api';

//   // No need for getAuthToken function - cookies are sent automatically!

//   // Fetch tasks from API
//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Build query parameters
//       const queryParams = new URLSearchParams({
//         page: pagination.page,
//         limit: pagination.limit,
//         sort_by: mapSortField(sortBy),
//         order: sortOrder
//       });

//       // Add filters if not 'all'
//       if (filters.status !== 'all') queryParams.append('status', filters.status);
//       if (filters.priority !== 'all') queryParams.append('priority', filters.priority);
//       if (filters.course !== 'all') queryParams.append('course', filters.course);
      
//       // Handle due date filter
//       if (filters.dueDate !== 'all') {
//         if (filters.dueDate === 'overdue') {
//           queryParams.append('due_date', 'overdue');
//         } else if (filters.dueDate === 'today') {
//           queryParams.append('due_date', 'today');
//         } else if (filters.dueDate === 'tomorrow') {
//           queryParams.append('due_date', 'tomorrow');
//         } else if (filters.dueDate === 'this-week') {
//           queryParams.append('due_date', 'this-week');
//         }
//       }

//       // Add search query
//       if (searchQuery) {
//         queryParams.append('search', searchQuery);
//       }

//       const response = await fetch(`${API_ENDPOINT}/task?${queryParams}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include' // This sends cookies automatically!
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           // Unauthorized - redirect to login
//           window.location.href = '/login';
//           return;
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch tasks');
//       }

//       const data = await response.json();
      
//       // Transform API data to match frontend format
//       const transformedTasks = data.data.map(task => ({
//         id: task.id.toString(),
//         title: task.title,
//         description: task.description || '',
//         course: task.course || 'General',
//         courseColor: task.courseColor || 'blue',
//         dueDate: task.due_date || task.dueDate,
//         priority: task.priority,
//         status: task.status,
//         progress: task.progress || 0,
//         subtasks: task.subtasks || [],
//         attachments: task.attachments || [],
//         comments: task.comments || 0,
//         createdAt: task.created_at || task.createdAt,
//         estimatedTime: task.estimated_time || task.estimatedTime || 60
//       }));

//       setTasks(transformedTasks);
      
//       if (data.pagination) {
//         setPagination(data.pagination);
//       }

//     } catch (err) {
//       console.error('Error fetching tasks:', err);
//       setError(err.message || 'Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch task statistics
//   const fetchTaskStats = async () => {
//     try {
//       const response = await fetch(`${API_ENDPOINT}/task/stats`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include' // This sends cookies automatically!
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           // Unauthorized - redirect to login
//           window.location.href = '/login';
//           return;
//         }
//         throw new Error('Failed to fetch stats');
//       }

//       const data = await response.json();
//       setStats(data.data || data); // Adjust based on your API response structure
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//     }
//   };

//   // Map frontend sort field to backend sort field
//   const mapSortField = (field) => {
//     const mapping = {
//       'dueDate': 'due_date',
//       'priority': 'priority',
//       'createdAt': 'created_at',
//       'title': 'title'
//     };
//     return mapping[field] || 'created_at';
//   };

//   // Load tasks when dependencies change
//   useEffect(() => {
//     fetchTasks();
//     fetchTaskStats();
//   }, [filters.status, filters.priority, filters.course, filters.dueDate, searchQuery, sortBy, sortOrder, pagination.page]);

//   const handleCreateTask = async (newTask) => {
//     try {
//       const response = await fetch(`${API_ENDPOINT}/task`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: newTask.title,
//           description: newTask.description,
//           due_date: newTask.dueDate,
//           priority: newTask.priority,
//           estimated_time: newTask.estimatedTime,
//           course: newTask.course
//         }),
//         credentials: 'include' // This sends cookies automatically!
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           window.location.href = '/login';
//           return;
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create task');
//       }

//       const data = await response.json();
      
//       // Refresh tasks list
//       fetchTasks();
//       fetchTaskStats();
//       setShowCreateModal(false);
      
//     } catch (err) {
//       console.error('Error creating task:', err);
//       alert(err.message || 'Failed to create task');
//     }
//   };

//   const handleUpdateTask = async (taskId, updates) => {
//     try {
//       const response = await fetch(`${API_ENDPOINT}/task/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: updates.title,
//           description: updates.description,
//           due_date: updates.dueDate,
//           priority: updates.priority,
//           status: updates.status,
//           progress: updates.progress
//         }),
//         credentials: 'include' // This sends cookies automatically!
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           window.location.href = '/login';
//           return;
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update task');
//       }

//       // Update local state optimistically
//       setTasks(tasks.map(task => 
//         task.id === taskId ? { ...task, ...updates } : task
//       ));
      
//       // Refresh stats
//       fetchTaskStats();
      
//     } catch (err) {
//       console.error('Error updating task:', err);
//       alert(err.message || 'Failed to update task');
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     if (!confirm('Are you sure you want to delete this task?')) return;
    
//     try {
//       const response = await fetch(`${API_ENDPOINT}/task/${id}`, {
//         method: 'DELETE',
//         credentials: 'include' // This sends cookies automatically!
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           window.location.href = '/login';
//           return;
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to delete task');
//       }

//       // Remove from local state
//       setTasks(tasks.filter(task => task.id !== taskId));
      
//       // Refresh stats
//       fetchTaskStats();
      
//     } catch (err) {
//       console.error('Error deleting task:', err);
//       alert(err.message || 'Failed to delete task');
//     }
//   };

//   const handleStatusChange = async (taskId, newStatus) => {
//     await handleUpdateTask(taskId, { status: newStatus });
//   };

//   const handleProgressUpdate = async (taskId, progress) => {
//     await handleUpdateTask(taskId, { progress });
//   };

//   const handleSortChange = (e) => {
//     const value = e.target.value;
//     setSortBy(value);
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//   };

//   const uniqueCourses = [...new Set(tasks.map(t => t.course))];

//   if (loading && tasks.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your tasks...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md p-6 bg-red-50 rounded-lg">
//           <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Tasks</h3>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchTasks}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
//         <div className="px-6 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage and organize your academic tasks
//               </p>
//             </div>
            
//             <div className="flex items-center justify-center space-x-3">
//               {/* View Toggle */}
//               <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                 <button
//                   onClick={() => setView('list')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <ListTodo className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setView('grid')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <LayoutGrid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setView('calendar')}
//                   className={`p-2 rounded-lg transition-colors ${
//                     view === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
//                   }`}
//                 >
//                   <Calendar className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Create Task Button */}
//               <button
//                 onClick={() => setShowCreateModal(true)}
//                 className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center space-x-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 <span>New Task</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-6 py-6">
//         {/* Stats */}
//         <TaskStats tasks={tasks} stats={stats} />

//         {/* Search and Filters Bar */}
//         <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`px-4 py-2 border rounded-lg flex items-center space-x-2 transition-colors ${
//                 showFilters 
//                   ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
//                   : 'border-gray-200 text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <Filter className="w-4 h-4" />
//               <span>Filters</span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//             </button>
            
//             <select
//               value={sortBy}
//               onChange={handleSortChange}
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600"
//             >
//               <option value="dueDate">Sort by Due Date</option>
//               <option value="priority">Sort by Priority</option>
//               <option value="createdAt">Sort by Created Date</option>
//               <option value="title">Sort by Title</option>
//             </select>
//           </div>
//         </div>

//         {/* Filters Panel */}
//         {showFilters && (
//           <TaskFilters
//             filters={filters}
//             setFilters={setFilters}
//             courses={uniqueCourses}
//             onClose={() => setShowFilters(false)}
//           />
//         )}

//         {/* Tasks Display */}
//         <div className="mt-6">
//           {view === 'calendar' ? (
//             <TaskCalendar tasks={tasks} />
//           ) : (
//             <TaskList
//               tasks={tasks}
//               view={view}
//               onStatusChange={handleStatusChange}
//               onProgressUpdate={handleProgressUpdate}
//               onDeleteTask={handleDeleteTask}
//               onUpdateTask={handleUpdateTask}
//             />
//           )}
//         </div>

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="mt-6 flex items-center justify-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pagination.page - 1)}
//               disabled={pagination.page === 1}
//               className="px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             <span className="px-3 py-1 text-gray-600">
//               Page {pagination.page} of {pagination.pages}
//             </span>
//             <button
//               onClick={() => handlePageChange(pagination.page + 1)}
//               disabled={pagination.page === pagination.pages}
//               className="px-3 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Create Task Modal */}
//       <CreateTaskModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onCreateTask={handleCreateTask}
//         courses={uniqueCourses}
//       />
//     </div>
//   );
// };

// export default TasksContainer;





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
      console.log('API Response:', data); // Log to see the structure
      
      // Handle different response structures
      let tasksArray = [];
      
      if (Array.isArray(data)) {
        // If API returns array directly
        tasksArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        // If API returns { data: [...] }
        tasksArray = data.data;
      } else if (data.tasks && Array.isArray(data.tasks)) {
        // If API returns { tasks: [...] }
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

  // Fetch task statistics
  const fetchTaskStats = async () => {
    try {
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
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      console.log('Stats response:', data);
      
      // Handle different response structures
      if (data.data) {
        setStats(data.data);
      } else if (data.stats) {
        setStats(data.stats);
      } else {
        // If API returns stats directly
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
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

      const data = await response.json();
      console.log('Create task response:', data);
      
      // Refresh tasks list
      fetchTasks();
      fetchTaskStats();
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
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      ));
      
      // Refresh stats
      fetchTaskStats();
      
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

      // Remove from local state
      setTasks(tasks.filter(task => task.id !== taskId));
      
      // Refresh stats
      fetchTaskStats();
      
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