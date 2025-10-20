
import React from 'react';

interface GeneratedImageDisplayProps {
  imageUrl: string;
  onClear: () => void;
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ imageUrl, onClear }) => {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Your Memory, Reimagined</h2>
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/20 mb-8">
            <img src={imageUrl} alt="Generated" className="w-full h-full object-contain" />
        </div>
        <div className="flex space-x-4">
            <a 
              href={imageUrl} 
              download="tgx-studio-memory.jpg" 
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Download Image
            </a>
            <button
                onClick={onClear}
                className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
                Create Another
            </button>
        </div>
    </div>
  );
};
