"use client";

import React from 'react';

const TopicSelector = ({ topics, selectedTopic, onSelect }) => {
  const getColorClasses = (color, isSelected) => {
    const colors = {
      blue: isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: isSelected ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      purple: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      yellow: isSelected ? 'bg-yellow-600 text-white' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
      red: isSelected ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100',
      indigo: isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Select Topic</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
              getColorClasses(topic.color, selectedTopic === topic.id)
            }`}
          >
            <span className="mr-2">{topic.icon}</span>
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;