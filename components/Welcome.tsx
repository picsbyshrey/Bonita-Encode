import React from 'react';
import { Clock, Activity, Brain, ArrowRight, BookOpen, LayoutDashboard } from 'lucide-react';
import { PillarType } from '../types';

interface WelcomeProps {
  onStart: () => void;
  onResources: () => void;
  onPillarSelect: (pillar: PillarType) => void;
  onHowToUse: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, onResources, onPillarSelect, onHowToUse }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 max-w-4xl mx-auto animate-fade-in-up py-12">
      <div className="mb-8 p-3 rounded-full bg-pink-100 text-pink-600">
        <span className="font-semibold tracking-wider text-sm">BONITA BADDIES INTELLIGENCE SYSTEM</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
        Optimize Your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Lived Experience
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
        An intelligence system backed by holistic frameworks and technology stacks designed to bring structure, control, and rhythm to your self-awareness, helping you place your attention where it's most needed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
        <button 
          onClick={() => onPillarSelect('time')}
          className="p-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl hover:transform hover:-translate-y-1 transition-all duration-300 text-left group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Clock size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">TIME</h3>
          <p className="text-sm text-gray-500">Circadian optimization, ultradian cycles, and seasonal alignment.</p>
        </button>

        <button 
          onClick={() => onPillarSelect('space')}
          className="p-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl hover:transform hover:-translate-y-1 transition-all duration-300 text-left group"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Activity size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">SPACE</h3>
          <p className="text-sm text-gray-500">Fascial health, nutrition, movement, and environmental design.</p>
        </button>

        <button 
          onClick={() => onPillarSelect('self')}
          className="p-6 bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl hover:transform hover:-translate-y-1 transition-all duration-300 text-left group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Brain size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">SELF</h3>
          <p className="text-sm text-gray-500">IQ/EQ/KQ calibration, stress regulation, and mindfulness.</p>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-center mb-16">
        <button 
          onClick={onStart}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl w-full md:w-auto"
        >
          Begin Assessment
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={onResources}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg w-full md:w-auto"
        >
          <BookOpen size={20} />
          Browse Resources
        </button>

        <button 
          onClick={onHowToUse}
          className="group flex items-center justify-center gap-2 px-8 py-4 text-gray-600 hover:text-gray-900 font-medium text-lg hover:bg-white/50 rounded-full transition-all w-full md:w-auto"
        >
          <LayoutDashboard size={20} />
          How it Works
        </button>
      </div>

      <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mt-auto">
        An AI-powered holistic framework designed to harmonize your circadian rhythms, 
        optimize your physical space, and elevate your self-awareness through evidence-based protocols.
      </p>
    </div>
  );
};

export default Welcome;