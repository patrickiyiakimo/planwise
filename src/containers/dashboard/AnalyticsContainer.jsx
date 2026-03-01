"use client";

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  BarChart,
  PieChart,
  LineChart,
  Award
} from 'lucide-react';
import AnalyticsHeader from '@/app/(website)/components/analytics/AnalyticsHeader';
import PerformanceOverview from '@/app/(website)/components/analytics/PerformanceOverview';
import GradeDistribution from '@/app/(website)/components/analytics/GradeDistribution';
import StudyTimeChart from '@/app/(website)/components/analytics/StudyTimeChart';
import TaskCompletionTrend from '@/app/(website)/components/analytics/TaskCompletionTrend';
import SubjectPerformance from '@/app/(website)/components/analytics/SubjectPerformance';
import ProductivityInsights from '@/app/(website)/components/analytics/ProductivityInsights';
import WeeklyActivity from '@/app/(website)/components/analytics/WeeklyActivity';
import GradePredictor from '@/app/(website)/components/analytics/GradePredictor';
import StudyStreak from '@/app/(website)/components/analytics/StudyStreak';
import ComparisonChart from '@/app/(website)/components/analytics/ComparisonChart';
import ExportReports from '@/app/(website)/components/analytics/ExportReports';
import DateRangePicker from '@/app/(website)/components/analytics/DateRangePicker';

const AnalyticsContainer = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState({
    performance: {
      currentGPA: 3.6,
      targetGPA: 3.8,
      cumulativeGPA: 3.4,
      semesterGPA: 3.6,
      creditHours: 15,
      completedCredits: 45,
      totalCredits: 120,
      academicStanding: 'Good Standing'
    },
    grades: {
      distribution: {
        A: 4,
        'A-': 3,
        'B+': 2,
        B: 3,
        'B-': 1,
        'C+': 1,
        C: 1,
        'D': 0,
        F: 0
      },
      bySubject: [
        { subject: 'CS 450', grade: 'A-', percentage: 92, credits: 3 },
        { subject: 'MATH 301', grade: 'B+', percentage: 87, credits: 4 },
        { subject: 'PHYS 202', grade: 'C+', percentage: 78, credits: 4 },
        { subject: 'ENGL 210', grade: 'A', percentage: 95, credits: 3 },
        { subject: 'BIOL 110', grade: 'B', percentage: 84, credits: 4 }
      ],
      trend: [
        { semester: 'Fall 2023', gpa: 3.2 },
        { semester: 'Spring 2023', gpa: 3.3 },
        { semester: 'Fall 2022', gpa: 3.1 },
        { semester: 'Spring 2022', gpa: 3.0 }
      ]
    },
    studyTime: {
      daily: [
        { date: '2024-03-01', hours: 2.5 },
        { date: '2024-03-02', hours: 3.0 },
        { date: '2024-03-03', hours: 1.5 },
        { date: '2024-03-04', hours: 4.0 },
        { date: '2024-03-05', hours: 3.5 },
        { date: '2024-03-06', hours: 2.0 },
        { date: '2024-03-07', hours: 5.0 },
        { date: '2024-03-08', hours: 3.0 },
        { date: '2024-03-09', hours: 2.5 },
        { date: '2024-03-10', hours: 4.5 },
        { date: '2024-03-11', hours: 3.0 },
        { date: '2024-03-12', hours: 2.0 },
        { date: '2024-03-13', hours: 4.0 },
        { date: '2024-03-14', hours: 3.5 }
      ],
      weekly: [
        { week: 'Week 1', hours: 18.5 },
        { week: 'Week 2', hours: 21.0 },
        { week: 'Week 3', hours: 19.5 },
        { week: 'Week 4', hours: 24.0 },
        { week: 'Week 5', hours: 22.5 },
        { week: 'Week 6', hours: 20.0 }
      ],
      bySubject: [
        { subject: 'CS 450', hours: 45 },
        { subject: 'MATH 301', hours: 52 },
        { subject: 'PHYS 202', hours: 38 },
        { subject: 'ENGL 210', hours: 25 },
        { subject: 'BIOL 110', hours: 30 }
      ],
      productivity: {
        mostProductiveDay: 'Thursday',
        averageDaily: 3.2,
        bestTime: 'Morning (8AM - 11AM)',
        consistency: 78
      }
    },
    tasks: {
      completion: [
        { date: '2024-03-01', completed: 3, total: 5 },
        { date: '2024-03-02', completed: 4, total: 6 },
        { date: '2024-03-03', completed: 2, total: 4 },
        { date: '2024-03-04', completed: 5, total: 7 },
        { date: '2024-03-05', completed: 4, total: 5 },
        { date: '2024-03-06', completed: 3, total: 4 },
        { date: '2024-03-07', completed: 6, total: 8 },
        { date: '2024-03-08', completed: 4, total: 5 },
        { date: '2024-03-09', completed: 3, total: 4 },
        { date: '2024-03-10', completed: 5, total: 6 }
      ],
      byPriority: {
        high: { completed: 12, total: 15 },
        medium: { completed: 18, total: 22 },
        low: { completed: 8, total: 12 }
      },
      bySubject: [
        { subject: 'CS 450', completed: 8, total: 10 },
        { subject: 'MATH 301', completed: 6, total: 8 },
        { subject: 'PHYS 202', completed: 5, total: 7 },
        { subject: 'ENGL 210', completed: 4, total: 5 },
        { subject: 'BIOL 110', completed: 3, total: 4 }
      ],
      onTimeRate: 85,
      averageCompletionTime: '2.3 days'
    },
    predictions: {
      finalGPA: 3.5,
      confidence: 85,
      bySubject: [
        { subject: 'CS 450', predicted: 'A-', probability: 90 },
        { subject: 'MATH 301', predicted: 'B+', probability: 75 },
        { subject: 'PHYS 202', predicted: 'C+', probability: 60 },
        { subject: 'ENGL 210', predicted: 'A', probability: 95 },
        { subject: 'BIOL 110', predicted: 'B', probability: 80 }
      ],
      recommendations: [
        'Increase study time for PHYS 202 to improve grade',
        'Complete pending assignments in MATH 301',
        'Maintain current pace in CS 450',
        'Consider forming study group for BIOL 110'
      ]
    },
    comparison: {
      vsClassAverage: [
        { subject: 'CS 450', user: 92, class: 85 },
        { subject: 'MATH 301', user: 87, class: 82 },
        { subject: 'PHYS 202', user: 78, class: 80 },
        { subject: 'ENGL 210', user: 95, class: 88 },
        { subject: 'BIOL 110', user: 84, class: 79 }
      ],
      vsPeers: {
        top25: 12,
        median: 45,
        bottom25: 78
      },
      percentile: 65
    },
    streaks: {
      current: 12,
      longest: 21,
      thisWeek: 5,
      consistency: 78,
      history: [
        { week: 'Week 1', days: 5 },
        { week: 'Week 2', days: 6 },
        { week: 'Week 3', days: 4 },
        { week: 'Week 4', days: 7 },
        { week: 'Week 5', days: 5 },
        { week: 'Week 6', days: 6 }
      ]
    },
    weeklyActivity: {
      monday: { study: 3.5, tasks: 4, focus: 85 },
      tuesday: { study: 4.0, tasks: 5, focus: 90 },
      wednesday: { study: 2.5, tasks: 3, focus: 75 },
      thursday: { study: 5.0, tasks: 6, focus: 95 },
      friday: { study: 3.0, tasks: 4, focus: 80 },
      saturday: { study: 2.0, tasks: 2, focus: 70 },
      sunday: { study: 1.5, tasks: 1, focus: 65 }
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // In a real app, you would fetch new data here
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <AnalyticsHeader
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      <div className="px-6 py-6">
        {/* Performance Overview Cards */}
        <PerformanceOverview data={analyticsData.performance} />

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Streak */}
            <StudyStreak data={analyticsData.streaks} />

            {/* Study Time Chart */}
            <StudyTimeChart 
              daily={analyticsData.studyTime.daily}
              weekly={analyticsData.studyTime.weekly}
              productivity={analyticsData.studyTime.productivity}
            />

            {/* Task Completion Trend */}
            <TaskCompletionTrend 
              data={analyticsData.tasks.completion}
              byPriority={analyticsData.tasks.byPriority}
              onTimeRate={analyticsData.tasks.onTimeRate}
            />

            {/* Weekly Activity Heatmap */}
            <WeeklyActivity data={analyticsData.weeklyActivity} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Grade Distribution */}
            <GradeDistribution 
              distribution={analyticsData.grades.distribution}
              trend={analyticsData.grades.trend}
            />

            {/* Subject Performance */}
            <SubjectPerformance 
              data={analyticsData.grades.bySubject}
              studyHours={analyticsData.studyTime.bySubject}
            />

            {/* Grade Predictor */}
            <GradePredictor 
              predictions={analyticsData.predictions}
            />

            {/* Comparison Chart */}
            <ComparisonChart 
              data={analyticsData.comparison}
            />
          </div>
        </div>

        {/* Bottom Section - Insights and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <ProductivityInsights 
              insights={analyticsData.predictions.recommendations}
              productivity={analyticsData.studyTime.productivity}
            />
          </div>
          <div>
            <ExportReports onExport={handleExport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContainer;