
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  description: string;
  onImageUpload: (file: File | null) => void;
  currentFile: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, description, onImageUpload, currentFile }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentFile) {
      const objectUrl = URL.createObjectURL(currentFile);
      setPreviewUrl(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [currentFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-2">{label}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <label
        htmlFor={id}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-80 flex justify-center items-center p-4 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-gray-800 transition-all duration-300 group relative overflow-hidden"
      >
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">Change Photo</span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Click to upload or drag & drop</p>
          </div>
        )}
      </label>
    </div>
  );
};
