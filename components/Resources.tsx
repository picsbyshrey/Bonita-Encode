import React, { useState } from 'react';
import { ArrowLeft, Clock, Activity, Brain, ExternalLink, Map, BookOpen, MessageCircle, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { PillarType } from '../types';
import { RESOURCE_ARTICLES, ResourceArticle } from '../data/resourceContent';

interface ResourcesProps {
  onBack: () => void;
  onStartAssessment: (pillar?: PillarType) => void;
}

const ResourceDetailView: React.FC<{ article: ResourceArticle; onClose: () => void }> = ({ article, onClose }) => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
    <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
      <div>
        <div className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-2">{article.category}</div>
        <h2 className="text-3xl font-bold text-gray-900">{article.title}</h2>
        <p className="text-gray-500 text-lg">{article.subtitle}</p>
      </div>
      <button 
        onClick={onClose}
        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
      >
        <X size={24} />
      </button>
    </div>
    <div className="p-8 prose prose-pink max-w-none text-gray-700">
      <ReactMarkdown
         components={{
            h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-lg font-bold text-pink-700 mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="pl-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
         }}
      >
        {article.content}
      </ReactMarkdown>
    </div>
    <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
      <button 
        onClick={onClose}
        className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"
      >
        Close Article
      </button>
    </div>
  </div>
);

const Resources: React.FC<ResourcesProps> = ({ onBack, onStartAssessment }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const handleArticleSelect = (id: string) => {
    if (RESOURCE_ARTICLES[id]) {
      setSelectedArticleId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedArticle = selectedArticleId ? RESOURCE_ARTICLES[selectedArticleId] : null;

  return (
    <div className="max-w-5xl mx-auto min-h-screen pb-12 animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={selectedArticle ? () => setSelectedArticleId(null) : onBack}
          className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wellness Roadmap</h1>
          <p className="text-gray-500">Curated evidence-based protocols and resources.</p>
        </div>
      </div>

      {selectedArticle ? (
        <ResourceDetailView article={selectedArticle} onClose={() => setSelectedArticleId(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Intro Card */}
          <div className="md:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <Map className="absolute top-8 right-8 text-white/5 w-32 h-32" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-pink-300" />
                Start Here
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                You don't always need an AI analysis to know what feels off. Use this roadmap to navigate directly to the best evidence-based resources for the three pillars of existence.
              </p>
              
              <button 
                onClick={() => handleArticleSelect('bonita-philosophy')}
                className="w-full sm:w-auto flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-pink-300/30 p-4 rounded-xl transition-all group text-left cursor-pointer"
              >
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-3 rounded-lg text-pink-300 group-hover:text-pink-200 transition-colors border border-white/5">
                   <Brain size={24} />
                </div>
                <div>
                  <span className="block text-white font-bold text-lg group-hover:text-pink-200 transition-colors">The Science of Being Bonita</span>
                  <span className="block text-gray-400 text-sm group-hover:text-gray-300">Neuroscience, Physiology & Psychology</span>
                </div>
              </button>
            </div>
          </div>

          {/* TIME Column */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col h-full hover:border-blue-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">TIME Optimization</h3>
                <p className="text-xs text-gray-500">Circadian & Ultradian Rhythms</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                If you struggle with sleep, energy dips, or focus, your biological clock may be misaligned.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-4 mt-auto">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">Primary Resource</h4>
                <a 
                  href="https://hubermanlab.com/neural-network/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="block font-bold text-gray-800 text-sm">Huberman Lab Protocols</span>
                    <span className="text-xs text-gray-500">Neuroscience-based routine design</span>
                  </div>
                  <ExternalLink size={16} className="text-blue-400 group-hover:text-blue-600" />
                </a>
              </div>

              <div className="space-y-2 pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Key Concepts</p>
                  <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleArticleSelect('morning-sunlight')} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded text-gray-600 transition-colors">Morning Sunlight</button>
                      <button onClick={() => handleArticleSelect('90min-cycles')} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded text-gray-600 transition-colors">90min Cycles</button>
                      <button onClick={() => handleArticleSelect('sleep-hygiene')} className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded text-gray-600 transition-colors">Sleep Hygiene</button>
                  </div>
              </div>
            </div>
          </div>

          {/* SPACE Column */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col h-full hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">SPACE Optimization</h3>
                <p className="text-xs text-gray-500">Pain, Fascia & Physicality</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                Mystery aches, limited mobility, or feeling "stuck" in your body often stems from myofascial issues.
              </p>
              
              <div className="bg-emerald-50 rounded-xl p-4 mt-auto">
                <h4 className="font-semibold text-emerald-900 mb-2 text-sm">Primary Resource</h4>
                <a 
                  href="http://www.triggerpoints.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="block font-bold text-gray-800 text-sm">TriggerPoints.net</span>
                    <span className="text-xs text-gray-500">Interactive symptom map</span>
                  </div>
                  <ExternalLink size={16} className="text-emerald-400 group-hover:text-emerald-600" />
                </a>
              </div>

              <div className="space-y-2 pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Key Concepts</p>
                  <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleArticleSelect('fascia-release')} className="text-xs bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 px-2 py-1 rounded text-gray-600 transition-colors">Fascia Release</button>
                      <button onClick={() => handleArticleSelect('zone-2-cardio')} className="text-xs bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 px-2 py-1 rounded text-gray-600 transition-colors">Zone 2 Cardio</button>
                      <button onClick={() => handleArticleSelect('hydration')} className="text-xs bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 px-2 py-1 rounded text-gray-600 transition-colors">Hydration</button>
                  </div>
              </div>
            </div>
          </div>

          {/* SELF Column (Full Width) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-6 hover:border-purple-200 transition-all">
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">SELF Optimization</h3>
                    <p className="text-xs text-gray-500">Mental Clarity & EQ</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Understanding your own mind is the final frontier. Tools for emotional processing, addiction recovery, and cognitive focus.
                </p>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2 text-sm">Mental Health</h4>
                  <a 
                    href="https://www.healthygamer.gg/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-purple-100 hover:shadow-md transition-all"
                  >
                    <div>
                      <span className="block font-bold text-gray-800 text-sm">Healthy Gamer GG</span>
                      <span className="text-xs text-gray-500">Psychiatry for the digital age</span>
                    </div>
                    <ExternalLink size={16} className="text-purple-400 group-hover:text-purple-600" />
                  </a>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2 text-sm">Self-Assessment</h4>
                  <button 
                    onClick={() => onStartAssessment('self')}
                    className="w-full text-left group flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
                  >
                    <div>
                      <span className="block font-bold text-gray-800 text-sm group-hover:text-purple-700">IQ/EQ/KQ Framework</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        Check chat for AI Analysis <MessageCircle size={10} />
                      </span>
                    </div>
                  </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Resources;