"use client";

import React from 'react';

const QuickLinks = ({ links }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            href={link.href}
            className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
            <p className="text-sm text-gray-500">Click to learn more →</p>
          </a>
        );
      })}
    </div>
  );
};

export default QuickLinks;