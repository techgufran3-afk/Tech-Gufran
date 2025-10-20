
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { Loader } from './components/Loader';
import { generateHuggingImage } from './services/geminiService';

const App: React.FC = () => {
  const [childPhoto, setChildPhoto] = useState<File | null>(null);
  const [adultPhoto, setAdultPhoto] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerateClick = useCallback(async () => {
    if (!childPhoto || !adultPhoto) {
      setError("Please upload both photos before generating.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const [childData, adultData] = await Promise.all([
        fileToBase64(childPhoto),
        fileToBase64(adultPhoto),
      ]);

      const imageB64 = await generateHuggingImage(childData, adultData);
      setGeneratedImage(`data:image/jpeg;base64,${imageB64}`);

    } catch (e) {
      console.error(e);
      setError("Failed to generate image. The model might be unable to process the request. Please try again with different photos.");
    } finally {
      setIsLoading(false);
    }
  }, [childPhoto, adultPhoto]);

  const handleClear = () => {
    setChildPhoto(null);
    setAdultPhoto(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (generatedImage) {
      return <GeneratedImageDisplay imageUrl={generatedImage} onClear={handleClear} />;
    }
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <ImageUploader
            id="child-photo"
            label="Child Photo"
            description="Upload an old photo of yourself."
            onImageUpload={setChildPhoto}
            currentFile={childPhoto}
          />
          <ImageUploader
            id="adult-photo"
            label="Recent Photo"
            description="Upload a recent photo of yourself."
            onImageUpload={setAdultPhoto}
            currentFile={adultPhoto}
          />
        </div>
        <div className="mt-8">
          <button
            onClick={handleGenerateClick}
            disabled={!childPhoto || !adultPhoto || isLoading}
            className="px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            Generate Your Memory
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 text-center">
        {error && <div className="bg-red-500 text-white p-4 rounded-lg mb-6 max-w-4xl w-full">{error}</div>}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
