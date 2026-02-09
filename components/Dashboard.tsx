import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Clock, Activity, Brain, CheckCircle2, RefreshCw } from 'lucide-react';
import { WellnessPlan, Recommendation } from '../types';

interface DashboardProps {
  plan: WellnessPlan;
  onReset: () => void;
}

const ProtocolList: React.FC<{ items: Recommendation[]; icon: React.ReactNode; colorClass: string }> = ({ items, icon, colorClass }) => (
  <div className="space-y-4">
    {items.map((item, idx) => (
      <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-2">
          <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 text-opacity-100`}>
            {icon}
          </div>
          {item.timeEstimate && (
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {item.timeEstimate}
            </span>
          )}
        </div>
        <h4 className="font-bold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">{item.title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
      </div>
    ))}
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ plan, onReset }) => {
  const chartData = [
    { subject: 'IQ (Mind)', A: plan.scores.iq, fullMark: 100 },
    { subject: 'EQ (Emotion)', A: plan.scores.eq, fullMark: 100 },
    { subject: 'KQ (Body)', A: plan.scores.kq, fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-xl border border-white/50 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Wellness Blueprint</h1>
              <p className="text-lg text-gray-600 max-w-2xl">{plan.summary}</p>
            </div>
            <button 
              onClick={onReset}
              className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <RefreshCw size={16} /> Start Over
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-center">Balance Analysis</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="User"
                    dataKey="A"
                    stroke="#db2777"
                    strokeWidth={2}
                    fill="#ec4899"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-blue-50 p-2 rounded-lg">
                <div className="text-xs text-blue-500 font-semibold">IQ</div>
                <div className="text-lg font-bold text-blue-700">{plan.scores.iq}%</div>
              </div>
              <div className="bg-pink-50 p-2 rounded-lg">
                <div className="text-xs text-pink-500 font-semibold">EQ</div>
                <div className="text-lg font-bold text-pink-700">{plan.scores.eq}%</div>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <div className="text-xs text-purple-500 font-semibold">KQ</div>
                <div className="text-lg font-bold text-purple-700">{plan.scores.kq}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" size={20} />
              Daily Commitments
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Consistence beats intensity. Focus on these protocols for 7 days.
            </p>
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm opacity-90">
                 <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                 {plan.pillars.time[0]?.title || "Morning Rhythm"}
               </div>
               <div className="flex items-center gap-3 text-sm opacity-90">
                 <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                 {plan.pillars.space[0]?.title || "Movement"}
               </div>
               <div className="flex items-center gap-3 text-sm opacity-90">
                 <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                 {plan.pillars.self[0]?.title || "Evening Reflection"}
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Protocols */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Time Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Clock size={20} /></div>
              <h2 className="text-xl font-bold text-gray-800">TIME Protocols</h2>
              <span className="text-xs text-gray-400 ml-auto uppercase tracking-widest font-semibold">Chronobiology</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <ProtocolList items={plan.pillars.time} icon={<Clock size={18} />} colorClass="text-blue-600 bg-blue-100" />
            </div>
          </div>

          {/* Space Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Activity size={20} /></div>
              <h2 className="text-xl font-bold text-gray-800">SPACE Protocols</h2>
              <span className="text-xs text-gray-400 ml-auto uppercase tracking-widest font-semibold">Environment & Body</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <ProtocolList items={plan.pillars.space} icon={<Activity size={18} />} colorClass="text-emerald-600 bg-emerald-100" />
            </div>
          </div>

          {/* Self Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Brain size={20} /></div>
              <h2 className="text-xl font-bold text-gray-800">SELF Protocols</h2>
              <span className="text-xs text-gray-400 ml-auto uppercase tracking-widest font-semibold">Internal State</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <ProtocolList items={plan.pillars.self} icon={<Brain size={18} />} colorClass="text-purple-600 bg-purple-100" />
            </div>
          </div>

          <div className="block md:hidden pt-8 text-center">
            <button 
                onClick={onReset}
                className="text-gray-500 underline text-sm"
              >
                Reset Assessment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;