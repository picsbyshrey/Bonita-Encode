import React, { useState } from 'react';
import { ViewState, ChatMessage, WellnessPlan, PillarType } from './types';
import { generateWellnessPlan } from './services/geminiService';
import Welcome from './components/Welcome';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import PillarDetail from './components/PillarDetail';
import HowToUse from './components/HowToUse';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [plan, setPlan] = useState<WellnessPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<PillarType | undefined>(undefined);

  const handleStart = () => {
    setSelectedPillar(undefined);
    setView('assessment');
  };

  const handleResources = () => {
    setView('resources');
  };

  const handleHowToUse = () => {
    setView('how-to-use');
  };

  const handlePillarSelect = (pillar: PillarType) => {
    setSelectedPillar(pillar);
    setView('pillar-detail');
  };

  const handleStartPillarChat = () => {
    setView('assessment');
    // selectedPillar stays set, which ChatInterface will read
  };

  const handleDirectChatStart = (pillar?: PillarType) => {
    setSelectedPillar(pillar);
    setView('assessment');
  };

  const handleAssessmentComplete = async (history: ChatMessage[]) => {
    setIsGenerating(true);
    try {
      const generatedPlan = await generateWellnessPlan(history);
      setPlan(generatedPlan);
      setView('dashboard');
    } catch (error) {
      console.error("Failed to generate plan", error);
      alert("We encountered an issue generating your protocols. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setSelectedPillar(undefined);
    setView('welcome');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 h-full">
        {view === 'welcome' && (
          <Welcome 
            onStart={handleStart} 
            onResources={handleResources}
            onPillarSelect={handlePillarSelect}
            onHowToUse={handleHowToUse}
          />
        )}

        {view === 'resources' && (
          <Resources 
            onBack={() => setView('welcome')} 
            onStartAssessment={handleDirectChatStart}
          />
        )}

        {view === 'how-to-use' && (
          <HowToUse 
            onBack={() => setView('welcome')}
            onSignup={handleStart}
          />
        )}

        {view === 'pillar-detail' && selectedPillar && (
          <PillarDetail 
            pillar={selectedPillar} 
            onBack={() => setView('welcome')} 
            onChat={handleStartPillarChat}
          />
        )}

        {view === 'assessment' && !isGenerating && (
          <ChatInterface 
            onComplete={handleAssessmentComplete} 
            onExit={() => setView('welcome')}
            initialPillar={selectedPillar}
          />
        )}

        {isGenerating && (
          <div className="h-screen flex flex-col items-center justify-center animate-pulse">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-700">Synthesizing Protocols...</h2>
            <p className="text-gray-500 mt-2">Calibrating IQ, EQ, and KQ metrics.</p>
          </div>
        )}

        {view === 'dashboard' && plan && (
          <Dashboard plan={plan} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;