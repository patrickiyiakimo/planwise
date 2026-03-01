"use client";

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Move, Target } from 'lucide-react';

const GraphVisualization = ({ graph }) => {
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  // Simple SVG graph rendering
  const renderGraph = () => {
    const width = 600;
    const height = 400;
    const padding = 40;
    
    // Find min/max values for scaling
    const xValues = graph.points.map(p => p.x);
    const yValues = graph.points.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    
    const scaleX = (width - 2 * padding) / (maxX - minX || 1);
    const scaleY = (height - 2 * padding) / (maxY - minY || 1);

    const transformPoint = (x, y) => ({
      x: padding + (x - minX) * scaleX,
      y: height - padding - (y - minY) * scaleY
    });

    const points = graph.points.map(p => transformPoint(p.x, p.y));

    return (
      <svg width="100%" height="400" viewBox={`0 0 ${width} ${height}`} className="bg-white">
        {/* Grid */}
        {showGrid && (
          <g className="grid" stroke="#e5e7eb" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={padding + i * (width - 2 * padding) / 10}
                y1={padding}
                x2={padding + i * (width - 2 * padding) / 10}
                y2={height - padding}
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={padding}
                y1={padding + i * (height - 2 * padding) / 10}
                x2={width - padding}
                y2={padding + i * (height - 2 * padding) / 10}
              />
            ))}
          </g>
        )}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#9ca3af" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#9ca3af" strokeWidth="2" />

        {/* Function Line */}
        <polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#4f46e5"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Roots */}
        {graph.roots && graph.roots.map((root, index) => {
          const point = transformPoint(root, 0);
          return (
            <g key={`root-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
              />
              <text x={point.x + 10} y={point.y - 10} fontSize="12" fill="#10b981">
                Root {index + 1}
              </text>
            </g>
          );
        })}

        {/* Vertex */}
        {graph.vertex && (
          <g>
            <circle
              cx={transformPoint(graph.vertex.x, graph.vertex.y).x}
              cy={transformPoint(graph.vertex.x, graph.vertex.y).y}
              r="6"
              fill="#f59e0b"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={transformPoint(graph.vertex.x, graph.vertex.y).x + 10}
              y={transformPoint(graph.vertex.x, graph.vertex.y).y - 10}
              fontSize="12"
              fill="#f59e0b"
            >
              Vertex
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Graph Visualization</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.1, 2))}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg transition-colors ${
              showGrid ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Target className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-auto" style={{ maxHeight: '500px' }}>
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
          {renderGraph()}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
            <span className="text-gray-600">{graph.equation || graph.type}</span>
          </div>
          {graph.derivative && (
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <span className="text-gray-600">Derivative: {graph.derivative}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;