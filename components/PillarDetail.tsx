import React from 'react';
import { ArrowLeft, Clock, Activity, Brain, ExternalLink, MessageCircle } from 'lucide-react';
import { PillarType } from '../types';

interface PillarDetailProps {
  pillar: PillarType;
  onBack: () => void;
  onChat: () => void;
}

const PillarDetail: React.FC<PillarDetailProps> = ({ pillar, onBack, onChat }) => {
  const content = {
    time: {
      title: "TIME Optimization",
      subtitle: "Chronobiology & Scheduling",
      description: "Mastering the fourth dimension through circadian alignment and ultradian rhythm management.",
      icon: <Clock size={40} />,
      color: "blue",
      resources: [
        {
          title: "Huberman Lab Protocols",
          desc: "Neuroscience-based routine design",
          link: "https://hubermanlab.com/neural-network/"
        },
        {
          title: "Circadian Code",
          desc: "Understanding your biological clock",
          link: "#" // Placeholder
        }
      ],
      concepts: ["Morning Sunlight", "90min Focus Cycles", "Sleep Architecture", "Adenosine Management"]
    },
    space: {
      title: "SPACE Optimization",
      subtitle: "Physical Body & Environment",
      description: "Enhancing your physical vessel (internal space) and your surroundings (external space).",
      icon: <Activity size={40} />,
      color: "emerald",
      resources: [
        {
          title: "TriggerPoints.net",
          desc: "Interactive symptom map for pain",
          link: "http://www.triggerpoints.net/"
        },
        {
          title: "Fascia Release Techniques",
          desc: "Protocols for structural integrity",
          link: "#" // Placeholder
        }
      ],
      concepts: ["Fascia Release", "Lymphatic Drainage", "Zone 2 Cardio", "Hydration 0.5oz/lb"]
    },
    self: {
      title: "SELF Optimization",
      subtitle: "IQ, EQ, & KQ Calibration",
      description: "Holistic self-awareness spanning cognitive, emotional, and kinesthetic intelligence.",
      icon: <Brain size={40} />,
      color: "purple",
      resources: [
        {
          title: "Healthy Gamer GG",
          desc: "Psychiatry for the digital age",
          link: "https://www.healthygamer.gg/"
        },
        {
          title: "Mindfulness Based Stress Reduction",
          desc: "Clinical standard for awareness",
          link: "#" // Placeholder
        }
      ],
      concepts: ["Cognitive Load", "Emotional Regulation", "Proprioception", "Stress Resilience"]
    }
  };

  const current = content[pillar];
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-300",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200 hover:border-emerald-300",
    purple: "bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-300"
  };

  const btnColorClasses = {
      blue: "bg-blue-600 hover:bg-blue-700",
      emerald: "bg-emerald-600 hover:bg-emerald-700",
      purple: "bg-purple-600 hover:bg-purple-700"
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="uppercase tracking-widest text-xs font-bold text-gray-400">Module: {pillar}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32 opacity-20 bg-${current.color}-500`}></div>
        <div className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${colorClasses[current.color as keyof typeof colorClasses]}`}>
            {current.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{current.title}</h1>
          <p className="text-xl text-gray-500 mb-6">{current.subtitle}</p>
          <p className="text-gray-600 leading-relaxed max-w-2xl text-lg mb-8">
            {current.description}
          </p>
          
          <button 
            onClick={onChat}
            className={`flex items-center gap-3 px-6 py-3 text-white rounded-full font-semibold shadow-lg transition-all transform hover:-translate-y-1 ${btnColorClasses[current.color as keyof typeof btnColorClasses]}`}
          >
            <MessageCircle size={20} />
            Start {pillar.toUpperCase()} Consultation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Concepts */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4">Core Concepts</h3>
           <div className="flex flex-wrap gap-3">
             {current.concepts.map((concept, idx) => (
                <span key={idx} className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm border border-gray-100 font-medium">
                    {concept}
                </span>
             ))}
           </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">External Resources</h3>
            <div className="space-y-3">
                {current.resources.map((res, idx) => (
                    <a 
                        key={idx}
                        href={res.link}
                        target={res.link !== "#" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                    >
                        <div>
                            <div className="font-semibold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">{res.title}</div>
                            <div className="text-xs text-gray-400">{res.desc}</div>
                        </div>
                        <ExternalLink size={16} className="text-gray-300 group-hover:text-pink-400" />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PillarDetail;