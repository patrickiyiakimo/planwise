"use client";

import React from 'react';
import { MessageCircle, Mail, MessageSquare, ArrowRight } from 'lucide-react';

const ContactSupport = ({ options }) => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Still Need Help?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.method}</h3>
              <p className="text-sm text-gray-600 mb-1">{option.value}</p>
              <p className="text-xs text-gray-500 mb-4">{option.description}</p>
              <a
                href={option.link}
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {option.action}
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSupport;