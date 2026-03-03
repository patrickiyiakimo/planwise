Planwise - AI-Powered Student Planning Application
https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop

📚 Overview
Planwise is a comprehensive, AI-powered student planning application designed to help students organize their academic lives, track progress, and study more efficiently. Built with modern web technologies, Planwise combines intelligent features with an intuitive user interface to create the ultimate study companion.

✨ Key Features
🤖 AI-Powered PDF Summaries: Upload lecture notes and research papers to get instant, intelligent summaries

🧮 AI Math Solver: Solve complex math problems with step-by-step explanations

📅 Smart Calendar: Manage deadlines, exams, and study sessions with multiple views

📊 Course Management: Track courses, assignments, and grades in one place

✅ Task Management: Organize tasks with priorities, due dates, and progress tracking

📈 Analytics Dashboard: Visualize study habits, grade trends, and performance metrics

👥 Study Groups: Collaborate with peers in dedicated study groups

🔔 Smart Notifications: Get reminded of deadlines and important events

📱 Responsive Design: Seamless experience across mobile, tablet, and desktop

🏗️ Architecture
Planwise follows a clean, scalable architecture with clear separation of concerns:

Folder Structure
text
src/
├── app/                    # Next.js App Router
│   ├── (website)/          # Public website routes
│   │   ├── layout.jsx      # Website layout with navbar/footer
│   │   └── page.jsx        # Landing page
│   └── (dashboard)/        # Protected dashboard routes
│       ├── layout.jsx      # Dashboard layout with sidebar
│       └── dashboard/      # Dashboard pages
│           ├── page.jsx    # Main dashboard
│           ├── tasks/      # Task management
│           ├── summaries/  # AI PDF summaries
│           ├── maths-solver/# Math problem solver
│           ├── courses/    # Course management
│           ├── calendar/   # Calendar view
│           ├── analytics/  # Performance analytics
│           ├── settings/   # User settings
│           └── help/       # Help center
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── tasks/              # Task management components
│   ├── summaries/          # PDF summary components
│   └── ...                 # Other feature components
├── containers/             # Container components (logic + state)
│   ├── dashboard/          # Dashboard containers
│   ├── tasks/              # Task containers
│   └── ...                 # Other feature containers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
└── styles/                 # Global styles and Tailwind config

Design Pattern: Container-Component Architecture
Planwise uses the Container-Component pattern to separate business logic from presentation:

Container Components: Handle state management, data fetching, and business logic

Presentational Components: Focus solely on UI rendering with props

Example:

jsx
// Container (handles logic)
const TasksContainer = () => {
  const [tasks, setTasks] = useState([]);
  const handleComplete = (id) => { ... };
  return <TaskList tasks={tasks} onComplete={handleComplete} />;
};

// Component (handles UI)
const TaskList = ({ tasks, onComplete }) => (
  <div>{tasks.map(task => (
    <TaskCard key={task.id} task={task} onComplete={onComplete} />
  ))}</div>
);
      
🚀 Tech Stack
Frontend
Next.js 14 (App Router) - React framework with server-side rendering

React 18 - UI library

Tailwind CSS - Utility-first CSS framework

Lucide React - Beautiful, consistent icons

React Dropzone - File upload functionality

State Management
React Hooks (useState, useEffect, useCallback) - Local state management

Context API (planned) - For global state like user authentication

Authentication & Database (Planned)
NextAuth.js - Authentication

PostgreSQL - Primary database

Prisma - Type-safe ORM

AI Features
OpenAI API - For PDF summarization and math solving

Custom ML Models - For specialized academic tasks

Development Tools
ESLint - Code linting

Prettier - Code formatting

Git - Version control

🎯 Core Features Deep Dive
1. Dashboard
Personalized welcome message with user info

Real-time statistics (courses, tasks, study hours)

Upcoming tasks widget with priority indicators

Recent PDF summaries preview

Study progress visualization

Quick actions for common tasks

2. AI PDF Summarizer
Drag-and-drop file upload

Support for PDF documents up to 50MB

Real-time processing status

AI-generated summaries with key points

Topic extraction and tagging

Summary history with search and filter

Export summaries as text files

3. AI Math Solver
Natural language problem input

Support for algebra, calculus, trigonometry, and more

Step-by-step solutions with explanations

Graph visualization for applicable problems

Practice problem suggestions

Solution history with quick recall

Math keyboard for mobile users

4. Task Management
Create, edit, and delete tasks

Priority levels (high, medium, low)

Due dates with smart formatting

Subtasks and progress tracking

Multiple views (list, grid, calendar)

Advanced filtering and search

Task completion analytics

5. Course Management
Add and manage academic courses

Track assignments and grades

Course schedule with location

Instructor information

Progress tracking per course

GPA calculation and tracking

Grade distribution visualization

6. Calendar
Multiple views (month, week, day, agenda)

Color-coded events by type

Create and manage events

Integration with tasks and assignments

Drag-and-drop event rescheduling

Upcoming events widget

Calendar export functionality

7. Analytics Dashboard
Study time tracking with charts

Grade trends over time

Task completion rates

Subject performance breakdown

Study streak tracking

Peer comparison (percentile)

Productivity insights and recommendations

8. Settings
Profile management

Account security (password, 2FA)

Notification preferences

Privacy controls

Subscription management

Appearance customization

API access and webhooks

Data export and account deletion

📱 Responsive Design
Planwise is built with a mobile-first approach:

Device	Sidebar Behavior	Navigation
Mobile (<768px)	Hidden, hamburger menu	Slide-out sidebar
Tablet (768px-1024px)	Collapsible with icons always visible	Toggle button
Desktop (>1024px)	Full sidebar with collapse option	Persistent navigation
🚦 Getting Started
Prerequisites
Node.js 18+

npm or yarn

Git

Installation
Clone the repository

bash
git clone https://github.com/patrickiyiakimo/planwise.git
cd planwise
Install dependencies

bash
npm install

Set up environment variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your API keys here
OPENAI_API_KEY=your_openai_api_key
Run the development server

bash
npm run dev

Open your browser
Navigate to http://localhost:3000

Build for Production
bash
npm run build
npm start
🧪 Testing
bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Check test coverage
npm run test:coverage
📦 Project Structure Details
text
planwise/
├── public/                 # Static assets
│   ├── images/            # Images and icons
│   └── fonts/             # Custom fonts
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (website)/     # Public routes
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   └── (dashboard)/   # Protected routes
│   │       ├── layout.jsx
│   │       └── dashboard/
│   │           ├── page.jsx
│   │           ├── tasks/
│   │           │   └── page.jsx
│   │           ├── summaries/
│   │           │   └── page.jsx
│   │           ├── maths-solver/
│   │           │   └── page.jsx
│   │           ├── courses/
│   │           │   └── page.jsx
│   │           ├── calendar/
│   │           │   └── page.jsx
│   │           ├── analytics/
│   │           │   └── page.jsx
│   │           ├── settings/
│   │           │   └── page.jsx
│   │           └── help/
│   │               └── page.jsx
│   ├── components/        # UI Components
│   │   ├── dashboard/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── TasksWidget.jsx
│   │   │   ├── SummariesWidget.jsx
│   │   │   ├── ProgressWidget.jsx
│   │   │   ├── CalendarWidget.jsx
│   │   │   ├── ActivityFeed.jsx
│   │   │   └── StudyGroupsWidget.jsx
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   └── CreateTaskModal.jsx
│   │   ├── summaries/
│   │   │   ├── UploadSection.jsx
│   │   │   ├── SummaryList.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── SummaryViewer.jsx
│   │   │   └── SummaryFilters.jsx
│   │   └── ...            # Other feature components
│   ├── containers/        # Container Components
│   │   ├── dashboard/
│   │   │   └── DashboardContainer.jsx
│   │   ├── tasks/
│   │   │   └── TasksContainer.jsx
│   │   └── ...            # Other containers
│   ├── hooks/             # Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useLocalStorage.js
│   │   └── useMediaQuery.js
│   ├── lib/               # Utilities
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── api.js
│   └── styles/            # Global styles
│       └── globals.css
├── .env.local             # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies
├── README.md              # Project documentation
└── tailwind.config.js     # Tailwind configuration
🎨 Design System
Colors
Primary: Indigo (#4f46e5) to Blue (#3b82f6) gradient

Secondary: Gray scale for text and backgrounds

Status Colors:

Success: Green (#10b981)

Warning: Yellow (#f59e0b)

Error: Red (#ef4444)

Info: Blue (#3b82f6)

Typography
Font Family: Geist Sans (default), Geist Mono (code)

Headings: Bold, large sizes with gradients

Body: Regular weight, optimized for readability

Components
Cards: Rounded corners, subtle shadows, hover effects

Buttons: Gradient backgrounds, hover animations

Forms: Clean inputs with focus states

Modals: Centered with backdrop blur

Navigation: Clear active states with icons

🔒 Security Features
Authentication: Secure login/signup flows

2FA Support: Two-factor authentication option

Session Management: Automatic logout on inactivity

Data Encryption: All sensitive data encrypted

API Keys: Secure key management for developers

Privacy Controls: Granular data sharing options

🚀 Performance Optimizations
Code Splitting: Route-based code splitting

Image Optimization: Next.js Image component

Lazy Loading: Components load on demand

Memoization: React.memo for expensive renders

Debouncing: Search inputs to reduce API calls

Caching: Local storage for user preferences

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Contribution Guidelines
Follow the existing code style

Write clear commit messages

Add tests for new features

👥 Team
Project Lead: Patrick Iyiakimo

Frontend Developer: Patrick Iyiakimo

Backend Developer: Patrick Iyiakimo

🙏 Acknowledgments
Unsplash for beautiful images

Lucide for amazing icons

Tailwind CSS for the utility-first framework

Next.js for the incredible React framework

All our contributors and users

📞 Contact & Support
Website: https://planwise-mu.vercel.app

Email: support@planwise.app

GitHub: github.com/patrickiyiakimo/planwise

Built with ❤️ for students everywhere
