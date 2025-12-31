
import React from 'react';
import VideoGallery from './components/VideoGallery.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-red-600 selection:text-white">
      <main>
        <VideoGallery />
      </main>
    </div>
  );
};

export default App;
