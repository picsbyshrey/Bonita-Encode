import React from 'react';
import { ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface HowToUseProps {
  onBack: () => void;
  onSignup: () => void;
}

const HowToUse: React.FC<HowToUseProps> = ({ onBack, onSignup }) => {
  // Mock data for visualizations
  const progressData = [
    { name: 'Week 1', IQ: 65, EQ: 50, KQ: 40 },
    { name: 'Week 2', IQ: 68, EQ: 55, KQ: 45 },
    { name: 'Week 3', IQ: 72, EQ: 60, KQ: 55 },
    { name: 'Week 4', IQ: 75, EQ: 65, KQ: 62 },
    { name: 'Week 5', IQ: 80, EQ: 70, KQ: 68 },
    { name: 'Week 6', IQ: 82, EQ: 75, KQ: 74 },
  ];

  const sleepData = [
    { day: 'M', hours: 6.5 },
    { day: 'T', hours: 7.2 },
    { day: 'W', hours: 7.0 },
    { day: 'T', hours: 8.1 },
    { day: 'F', hours: 7.8 },
    { day: 'S', hours: 8.5 },
    { day: 'S', hours: 7.5 },
  ];

  const habits = [
    { name: "Morning Sunlight", streak: 12, days: [true, true, true, true, true, false, true] },
    { name: "Zone 2 Cardio", streak: 4, days: [false, true, true, false, true, true, true] },
    { name: "Fascia Rolling", streak: 21, days: [true, true, true, true, true, true, true] },
    { name: "No Caffeine > 2pm", streak: 8, days: [true, true, false, true, true, true, true] },
  ];

  return (
    <div className="max-w-5xl mx-auto min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h1>
            <p className="text-gray-500 text-sm md:text-base">Visualize your potential with Bonita Baddies.</p>
          </div>
        </div>
        <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
            <Lock size={12} /> Preview Mode
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Value Prop */}
        <div className="lg:col-span-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10 max-w-3xl">
             <h2 className="text-3xl font-bold mb-4">Why track your wellness?</h2>
             <p className="text-lg opacity-90 leading-relaxed mb-6">
               Consistency is the language of biology. The Bonita Baddies System isn't just about one-time advice—it's about calibrating your Time, Space, and Self over weeks and months to create sustainable transformation.
             </p>
             <button 
                onClick={onSignup}
                className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg"
             >
                Start Your First Assessment
             </button>
           </div>
        </div>

        {/* Longitudinal Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Wellness Velocity</h3>
                <div className="flex gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> IQ</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div> EQ</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> KQ</span>
                </div>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                        />
                        <Line type="monotone" dataKey="IQ" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
                        <Line type="monotone" dataKey="EQ" stroke="#ec4899" strokeWidth={3} dot={{r: 4}} />
                        <Line type="monotone" dataKey="KQ" stroke="#a855f7" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
                *Mock data showing 6-week progression in cognitive, emotional, and physical metrics.
            </p>
        </div>

        {/* Sleep Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Circadian Consistency</h3>
            <p className="text-xs text-gray-500 mb-6">Sleep duration relative to solar cycles.</p>
            <div className="h-40 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                        <Bar dataKey="hours" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                        <XAxis dataKey="day" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <div className="font-bold text-gray-800 text-sm">7.6h Avg</div>
                    <div className="text-xs text-gray-500">Optimal Range achieved</div>
                </div>
            </div>
        </div>

        {/* Habit Grid */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-6">Protocol Adherence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {habits.map((habit, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-pink-200 transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <span className="font-semibold text-gray-700 text-sm">{habit.name}</span>
                            <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{habit.streak} day streak</span>
                        </div>
                        <div className="flex justify-between gap-1">
                            {habit.days.map((done, dIdx) => (
                                <div 
                                    key={dIdx} 
                                    className={`h-2 flex-1 rounded-full ${done ? 'bg-green-400' : 'bg-gray-200'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default HowToUse;