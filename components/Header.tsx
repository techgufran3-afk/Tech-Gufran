
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 tracking-tight">
        TGX Studio
      </h1>
      <p className="text-md sm:text-lg text-gray-400 mt-2">
        Reunite with your younger self through the magic of AI.
      </p>
    </header>
  );
};
