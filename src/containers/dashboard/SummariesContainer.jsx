"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Upload, 
  FileText, 
  Search, 
  Filter,
  Grid,
  List,
  Clock,
  Sparkles,
  Download,
  Trash2,
  BookOpen
} from 'lucide-react';
import UploadSection from '@/app/(website)/components/summaries/UploadSection';
import SummaryList from '@/app/(website)/components/summaries/SummaryList';
import SummaryFilters from '@/app/(website)/components/summaries/SummaryFilters';
import ProcessingStatus from '@/app/(website)/components/summaries/ProcessingStatus';
import SummaryStats from '@/app/(website)/components/summaries/SummaryStats';
import SummaryViewer from '@/app/(website)/components/summaries/SummaryViewer';

const SummariesContainer = () => {
  const [view, setView] = useState('grid'); // 'grid', 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filters, setFilters] = useState({
    course: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSummaries([
        {
          id: 's1',
          title: 'Machine Learning Fundamentals',
          fileName: 'ml_lecture_notes.pdf',
          originalFile: 'ml_lecture_notes.pdf',
          fileSize: '2.4 MB',
          pages: 24,
          course: 'CS 450',
          courseColor: 'purple',
          date: '2024-03-20T10:30:00',
          summary: 'This document provides a comprehensive overview of machine learning fundamentals. Key topics include supervised learning algorithms (linear regression, decision trees, support vector machines, neural networks), unsupervised learning (clustering, dimensionality reduction), and model evaluation techniques. The notes emphasize practical applications and include mathematical formulations for key algorithms. Special attention is given to gradient descent optimization, overfitting prevention through regularization, and cross-validation methods.',
          keyPoints: [
            'Supervised learning algorithms form the core of predictive modeling',
            'Neural networks excel at capturing complex patterns in data',
            'Regularization techniques prevent overfitting and improve generalization',
            'Cross-validation provides robust model performance estimates'
          ],
          topics: ['Linear Regression', 'Neural Networks', 'SVM', 'Clustering'],
          tokens: 1250,
          readabilityScore: 85,
          confidence: 0.94,
          processingTime: 45,
          starred: true,
          tags: ['AI', 'Machine Learning', 'Lecture Notes']
        },
        {
          id: 's2',
          title: 'Organic Chemistry Reactions',
          fileName: 'ochem_chapter_7.pdf',
          originalFile: 'ochem_chapter_7.pdf',
          fileSize: '1.8 MB',
          pages: 18,
          course: 'CHEM 210',
          courseColor: 'green',
          date: '2024-03-18T14:15:00',
          summary: 'Chapter 7 provides a detailed examination of alkene reactions, including addition, elimination, and substitution mechanisms. The material covers electrophilic addition reactions (halogenation, hydrohalogenation, hydration), stereochemistry considerations, and reaction kinetics. Markovnikov\'s rule and its exceptions are explained with multiple examples. The chapter concludes with synthetic applications and practice problems.',
          keyPoints: [
            'Electrophilic addition reactions are characteristic of alkenes',
            'Markovnikov\'s rule predicts regioselectivity in addition reactions',
            'Stereochemistry plays a crucial role in reaction outcomes',
            'Reaction mechanisms follow carbocation stability principles'
          ],
          topics: ['Alkenes', 'Addition Reactions', 'Stereochemistry', 'Mechanisms'],
          tokens: 980,
          readabilityScore: 78,
          confidence: 0.89,
          processingTime: 32,
          starred: false,
          tags: ['Chemistry', 'Organic', 'Reactions']
        },
        {
          id: 's3',
          title: 'Renaissance Art History',
          fileName: 'arthist_lecture_12.pdf',
          originalFile: 'arthist_lecture_12.pdf',
          fileSize: '3.2 MB',
          pages: 32,
          course: 'ARTH 101',
          courseColor: 'yellow',
          date: '2024-03-15T09:45:00',
          summary: 'This lecture examines the High Renaissance period, focusing on the works of Leonardo da Vinci, Michelangelo, and Raphael. Key artworks analyzed include the Mona Lisa, The Last Supper, the Sistine Chapel ceiling, and The School of Athens. The material covers artistic techniques (sfumato, chiaroscuro, perspective), patronage systems, and the cultural context of 16th-century Italy.',
          keyPoints: [
            'High Renaissance artists mastered naturalism and emotional expression',
            'Leonardo\'s sfumato technique created subtle tonal transitions',
            'Michelangelo\'s work embodies humanist ideals of the period',
            'Raphael synthesized classical and contemporary influences'
          ],
          topics: ['Leonardo', 'Michelangelo', 'Raphael', 'Italian Renaissance'],
          tokens: 1560,
          readabilityScore: 82,
          confidence: 0.91,
          processingTime: 52,
          starred: true,
          tags: ['Art History', 'Renaissance', 'Italian Art']
        },
        {
          id: 's4',
          title: 'Calculus III - Vector Calculus',
          fileName: 'math301_chapter4.pdf',
          originalFile: 'math301_chapter4.pdf',
          fileSize: '1.5 MB',
          pages: 22,
          course: 'MATH 301',
          courseColor: 'blue',
          date: '2024-03-12T16:20:00',
          summary: 'Chapter 4 introduces vector calculus concepts including gradient, divergence, curl, and line integrals. The material covers vector fields, conservative fields, Green\'s theorem, and applications to physics. Multiple examples demonstrate calculations and geometric interpretations.',
          keyPoints: [
            'Gradient measures direction and rate of steepest ascent',
            'Divergence quantifies source strength in vector fields',
            'Curl measures rotation in fluid flow and force fields',
            'Line integrals calculate work done along paths'
          ],
          topics: ['Gradient', 'Divergence', 'Curl', 'Line Integrals'],
          tokens: 890,
          readabilityScore: 72,
          confidence: 0.87,
          processingTime: 38,
          starred: false,
          tags: ['Mathematics', 'Calculus', 'Vector Calculus']
        }
      ]);
      
      setLoading(false);
    };

    fetchSummaries();
  }, []);

  const handleFileUpload = useCallback(async (file) => {
    // Simulate file upload and processing
    setProcessingStatus('uploading');
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setProcessingStatus('processing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create new summary
    const newSummary = {
      id: `s${summaries.length + 1}`,
      title: file.name.replace('.pdf', '').replace(/_/g, ' '),
      fileName: file.name,
      originalFile: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 50) + 10,
      course: 'General',
      courseColor: 'gray',
      date: new Date().toISOString(),
      summary: 'AI-generated summary will appear here once processing is complete. The system analyzes the document structure, extracts key concepts, and generates a coherent summary of the main points.',
      keyPoints: [
        'Key point 1 will be extracted from the document',
        'Key point 2 will be identified by the AI',
        'Key point 3 will summarize important concepts'
      ],
      topics: ['Topic 1', 'Topic 2', 'Topic 3'],
      tokens: 0,
      readabilityScore: 0,
      confidence: 0,
      processingTime: 0,
      starred: false,
      tags: ['New', 'Processing']
    };
    
    setSummaries(prev => [newSummary, ...prev]);
    setProcessingStatus(null);
    setUploadProgress(0);
  }, [summaries]);

  const handleViewSummary = (summary) => {
    setSelectedSummary(summary);
    setShowViewer(true);
  };

  const handleDeleteSummary = (summaryId) => {
    setSummaries(prev => prev.filter(s => s.id !== summaryId));
    if (selectedSummary?.id === summaryId) {
      setShowViewer(false);
      setSelectedSummary(null);
    }
  };

  const handleStarSummary = (summaryId) => {
    setSummaries(prev => prev.map(s => 
      s.id === summaryId ? { ...s, starred: !s.starred } : s
    ));
  };

  const handleDownloadSummary = (summary) => {
    // Create a text file with the summary
    const content = `
Title: ${summary.title}
Course: ${summary.course}
Date: ${new Date(summary.date).toLocaleDateString()}

SUMMARY:
${summary.summary}

KEY POINTS:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

TOPICS:
${summary.topics.join(', ')}

STATISTICS:
Pages: ${summary.pages}
Tokens: ${summary.tokens}
Readability Score: ${summary.readabilityScore}%
Confidence: ${(summary.confidence * 100).toFixed(0)}%
Processing Time: ${summary.processingTime} seconds
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${summary.title.replace(/\s+/g, '_')}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSummaries = summaries.filter(summary => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        summary.title.toLowerCase().includes(query) ||
        summary.summary.toLowerCase().includes(query) ||
        summary.course.toLowerCase().includes(query) ||
        summary.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Course filter
    if (filters.course !== 'all' && summary.course !== filters.course) {
      return false;
    }
    
    // Date range filter
    if (filters.dateRange !== 'all') {
      const summaryDate = new Date(summary.date);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      switch (filters.dateRange) {
        case 'week':
          if (summaryDate < weekAgo) return false;
          break;
        case 'month':
          if (summaryDate < monthAgo) return false;
          break;
      }
    }
    
    return true;
  });

  const sortedSummaries = [...filteredSummaries].sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'course':
        return a.course.localeCompare(b.course);
      default:
        return 0;
    }
  });

  const uniqueCourses = [...new Set(summaries.map(s => s.course))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your summaries...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">AI PDF Summaries</h1>
                <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full">
                  AI POWERED
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload PDFs and get instant AI-generated summaries
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Upload Section */}
        <UploadSection 
          onFileUpload={handleFileUpload}
          processingStatus={processingStatus}
          uploadProgress={uploadProgress}
        />

        {/* Processing Status */}
        {processingStatus && (
          <ProcessingStatus 
            status={processingStatus}
            progress={uploadProgress}
          />
        )}

        {/* Stats */}
        <SummaryStats summaries={summaries} />

        {/* Search and Filters Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search summaries by title, content, or tags..."
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
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <SummaryFilters
            filters={filters}
            setFilters={setFilters}
            courses={uniqueCourses}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Summaries Grid/List */}
        <div className="mt-6">
          <SummaryList
            summaries={sortedSummaries}
            view={view}
            onViewSummary={handleViewSummary}
            onDeleteSummary={handleDeleteSummary}
            onStarSummary={handleStarSummary}
            onDownloadSummary={handleDownloadSummary}
          />
        </div>
      </div>

      {/* Summary Viewer Modal */}
      {showViewer && selectedSummary && (
        <SummaryViewer
          summary={selectedSummary}
          onClose={() => setShowViewer(false)}
          onDelete={handleDeleteSummary}
          onDownload={handleDownloadSummary}
          onStar={handleStarSummary}
        />
      )}
    </div>
  );
};

export default SummariesContainer;