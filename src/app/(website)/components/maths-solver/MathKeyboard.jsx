"use client";

import React from 'react';
import { X } from 'lucide-react';

const MathKeyboard = ({ onInsert, onClose }) => {
  const buttons = [
    ['7', '8', '9', '+', '÷'],
    ['4', '5', '6', '-', '×'],
    ['1', '2', '3', '=', '('],
    ['0', '.', '^', '√', ')'],
    ['sin', 'cos', 'tan', 'log', 'π'],
    ['∫', '∑', 'lim', 'dx', 'dy']
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-2xl z-40 md:hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Math Keyboard</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {row.map((btn, btnIndex) => (
                <button
                  key={`${rowIndex}-${btnIndex}`}
                  onClick={() => onInsert(btn)}
                  className="p-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => onInsert('')}
            className="w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Clear Input
          </button>
        </div>
      </div>
    </div>
  );
};

export default MathKeyboard;