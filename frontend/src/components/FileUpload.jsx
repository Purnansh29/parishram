import React, { useState, useRef } from 'react';

/**
 * FileUpload - Drag & Drop file upload component with preview.
 * @param {function} onFileSelect - Callback when file is selected.
 * @param {string[]} acceptedTypes - Accepted MIME types (e.g. ['image/png', 'image/jpeg']).
 * @param {number} maxSizeMB - Maximum file size in MB.
 */
const FileUpload = ({
  onFileSelect,
  acceptedTypes = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'],
  maxSizeMB = 5,
  label = 'Upload File',
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (selectedFile) => {
    if (!acceptedTypes.includes(selectedFile.type)) {
      setError(`Invalid file type. Accepted: ${acceptedTypes.map(t => t.split('/')[1]).join(', ')}`);
      return false;
    }
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max size: ${maxSizeMB}MB`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;
    setFile(selectedFile);

    // Generate preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <label className="text-sm font-bold text-gray-700 block mb-2">{label}</label>

      {/* Drop Zone */}
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-accentPrimary bg-accentPrimary/5 scale-[1.02]'
              : 'border-gray-200 hover:border-accentPrimary/50 hover:bg-gray-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleChange}
            className="hidden"
          />

          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accentPrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <p className="text-gray-700 font-bold mb-1">
            {dragActive ? 'Drop your file here' : 'Drag & drop your file here'}
          </p>
          <p className="text-gray-400 text-sm">
            or <span className="text-accentPrimary font-bold hover:underline">browse from computer</span>
          </p>
          <p className="text-gray-300 text-xs mt-3 font-medium">
            {acceptedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} • Max {maxSizeMB}MB
          </p>
        </div>
      ) : (
        /* File Preview */
        <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            {/* Preview Thumbnail */}
            {preview ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-400 font-medium">{formatSize(file.size)}</p>
              {/* Success Badge */}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-emerald-600">Ready to upload</span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={removeFile}
              className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors flex-shrink-0 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
