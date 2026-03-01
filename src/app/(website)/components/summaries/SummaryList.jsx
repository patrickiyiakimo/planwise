"use client";

import React from 'react';
import SummaryCard from './SummaryCard';

const SummaryList = ({ 
  summaries, 
  view, 
  onViewSummary, 
  onDeleteSummary, 
  onStarSummary, 
  onDownloadSummary 
}) => {
  if (summaries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No summaries found</h3>
        <p className="text-gray-500 mb-6">Upload your first PDF to get an AI-generated summary</p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="space-y-3">
        {summaries.map((summary) => (
          <SummaryCard
            key={summary.id}
            summary={summary}
            view={view}
            onView={onViewSummary}
            onDelete={onDeleteSummary}
            onStar={onStarSummary}
            onDownload={onDownloadSummary}
          />
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {summaries.map((summary) => (
        <SummaryCard
          key={summary.id}
          summary={summary}
          view={view}
          onView={onViewSummary}
          onDelete={onDeleteSummary}
          onStar={onStarSummary}
          onDownload={onDownloadSummary}
        />
      ))}
    </div>
  );
};

export default SummaryList;