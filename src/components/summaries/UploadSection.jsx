"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const UploadSection = ({ onFileUpload, processingStatus, uploadProgress }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${processingStatus ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isDragActive ? 'Drop your PDF here' : 'Upload a PDF document'}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your PDF here, or click to browse
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              Max size: 50MB
            </span>
            <span>•</span>
            <span>Supported: PDF only</span>
          </div>

          {isDragReject && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center text-red-600">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="text-sm">Invalid file type. Please upload a PDF.</span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Limits Info */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>15/25 summaries used this month</span>
        </div>
        <span className="text-indigo-600 font-medium">Upgrade for more</span>
      </div>
    </div>
  );
};

export default UploadSection;