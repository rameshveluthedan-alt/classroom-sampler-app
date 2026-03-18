import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import SamplingForm from './components/SamplingForm';
import ResultsScreen from './components/ResultsScreen';
import { SampleResult } from './types';

type Screen = 'home' | 'form' | 'results';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [sampleResults, setSampleResults] = useState<SampleResult | null>(null);

  const handleStartSampling = () => {
    setScreen('form');
  };

  const handleSampleGenerated = (results: SampleResult) => {
    setSampleResults(results);
    setScreen('results');
  };

  const handleStartNew = () => {
    setSampleResults(null);
    setScreen('form');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onStart={handleStartSampling} />;
      case 'form':
        return <SamplingForm onGenerate={handleSampleGenerated} />;
      case 'results':
        if (sampleResults) {
          return <ResultsScreen results={sampleResults} onStartNew={handleStartNew} />;
        }
        // Fallback in case results are null, go back to form
        setScreen('form');
        return <SamplingForm onGenerate={handleSampleGenerated} />;
      default:
        return <HomeScreen onStart={handleStartSampling} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;