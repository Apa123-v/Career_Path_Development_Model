import React, { useState } from 'react';
import { Lock, CheckCircle, Briefcase, User, Layers, ArrowRight, Loader, Clock, Code, Languages, BookOpen } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);

  const [activeModal, setActiveModal] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icp_type: 'high_wage',
    current_role: '',
    target_role: '',
    urgency_months: 2,
    skills: '',
    language: 'en',
    story: ''
  });

 
  const loadPreset = (type) => {
    if (type === 'high_wage') {
      setFormData({
        name: 'Riya Sharma',
        icp_type: 'high_wage',
        current_role: 'Final year CS student',
        target_role: 'Software Engineer',
        urgency_months: 2,
        skills: 'HTML, CSS, Google Docs, ChatGPT, PUBG',
        language: 'en',
        story: 'No internship, no real project, wants to prove CS degree worth it'
      });
    } else {
      setFormData({
        name: 'Arjun Yadav',
        icp_type: 'low_wage',
        current_role: 'Delivery Gig Worker',
        target_role: 'Data Entry / Office Operations',
        urgency_months: 3,
        skills: 'Basic Computer, Smartphone Usage, Hindi Typing',
        language: 'hi',
        story: 'Wants a stable office desk job to support family and escape delivery routine'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoadmap(null);

  
    const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

    const payload = {
      icp_type: formData.icp_type,
      name: formData.name,
      current_role: formData.current_role,
      target_role: formData.target_role,
      urgency_months: parseInt(formData.urgency_months) || 2,
      skills: skillsArray,
      language: formData.language,
      vision_profile: {
        current_life: formData.current_role || "Not specified",
        main_blocker: formData.story || "Not specified",
        vision_12mo: formData.target_role || "Not specified",
        top_motivation: "Career change implementation"
      }
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'API Server returned an error processing request');
      }
      
      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
 
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold tracking-wider text-sm shadow-lg shadow-indigo-500/20">AI</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Dynamic Journey Platform <span className="text-xs text-indigo-400 font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 ml-2">M01 PoC</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> User Persona Controller
            </h2>
            
        
            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Test Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => loadPreset('high_wage')}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-xl text-xs font-medium transition text-left flex flex-col cursor-pointer"
                >
                  <span className="text-white">Riya Sharma</span>
                  <span className="text-[10px] text-indigo-400">High-Wage Tech Path</span>
                </button>
                <button 
                  type="button"
                  onClick={() => loadPreset('low_wage')}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-xl text-xs font-medium transition text-left flex flex-col cursor-pointer"
                >
                  <span className="text-white">Arjun Yadav</span>
                  <span className="text-[10px] text-emerald-400">Low-Wage Hindi Path</span>
                </button>
              </div>
            </div>

            <hr className="border-slate-800 my-4" />

        
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none transition"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Urgency (Months)</label>
                  <div className="relative">
                    <input 
                      type="number" required min="1"
                      value={formData.urgency_months}
                      onChange={(e) => setFormData({...formData, urgency_months: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-3 pr-8 py-2 text-sm text-slate-200 outline-none transition"
                    />
                    <Clock className="w-4 h-4 text-amber-500 absolute right-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Current Background</label>
                  <input 
                    type="text" required
                    value={formData.current_role}
                    onChange={(e) => setFormData({...formData, current_role: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none transition"
                    placeholder="Current job/status"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Target Role</label>
                  <input 
                    type="text" required
                    value={formData.target_role}
                    onChange={(e) => setFormData({...formData, target_role: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none transition"
                    placeholder="Target occupation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-indigo-400" /> Current Skills (Comma separated)
                </label>
                <input 
                  type="text" required
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none transition"
                  placeholder="e.g. HTML, CSS, PUBG"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-indigo-400" /> Output Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none transition appearance-none"
                  >
                    <option value="en">English (en)</option>
                    <option value="hi">Hindi (hi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">ICP Stream Tier</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, icp_type: 'high_wage'})}
                      className={`py-1 text-[11px] font-medium rounded-lg transition cursor-pointer ${formData.icp_type === 'high_wage' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                    >
                      High Wage
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, icp_type: 'low_wage'})}
                      className={`py-1 text-[11px] font-medium rounded-lg transition cursor-pointer ${formData.icp_type === 'low_wage' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                    >
                      Low Wage
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> User Story / Core Blocker Context
                </label>
                <textarea 
                  rows="2" required
                  value={formData.story}
                  onChange={(e) => setFormData({...formData, story: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none transition resize-none"
                  placeholder="Explain background blockers, missing milestones, objectives..."
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : 'Generate Career Track'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

    
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-red-950/30 border border-red-800/50 text-red-400 p-4 rounded-xl text-sm mb-6">
              ⚠️ <strong>Error:</strong> {error}
            </div>
          )}

          {!roadmap && !loading && (
            <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 flex flex-col items-center justify-center min-h-[450px]">
              <Layers className="w-12 h-12 mb-3 text-slate-700" />
              <p className="text-sm max-w-xs">Select a preset or tweak input metrics on the left engine to trace structured timeline data paths dynamically.</p>
            </div>
          )}

          {loading && (
            <div className="border border-slate-800 bg-slate-900/20 rounded-2xl p-12 text-center text-slate-400 flex flex-col items-center justify-center min-h-[450px]">
              <Loader className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
              <p className="text-sm font-medium animate-pulse text-white">Analyzing User Profile & Target Demographics...</p>
              <p className="text-xs text-slate-500 mt-1">Synthesizing 7-Stage Mathematical Clarity Progression Model</p>
            </div>
          )}

          {roadmap && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950/30 border border-slate-800 rounded-2xl p-6">
                <span className="text-[10px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-semibold">Live Track Metrics</span>
                <h3 className="text-xl font-bold mt-2 text-white">{roadmap.roadmap_title}</h3>
                <p className="text-sm text-slate-400 mt-1">{roadmap.introduction || roadmap.roadmap_description}</p>
              </div>

           
              <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-8">
                {roadmap.milestones?.map((m, index) => {
                  let blurClass = "";
                  let isLocked = false;

                  if (m.blur_level === 1) blurClass = "opacity-85 bg-slate-900/80";
                  if (m.blur_level === 2) blurClass = "opacity-60 bg-slate-900/50 select-none pointer-events-none";
                  if (m.blur_level === 3) {
                    blurClass = "blur-[3px] opacity-20 select-none pointer-events-none";
                    isLocked = true;
                  }

                  const scCount = m.scenario_count !== undefined ? m.scenario_count : 0;
                  const asCount = m.assessment_count !== undefined ? m.assessment_count : 0;
                  const mcCount = m.mock_interview_count !== undefined ? m.mock_interview_count : 0;

                  return (
                    <div key={index} className="relative group">
                      <span className={`absolute -left-[39px] top-1 flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border z-10 ${isLocked ? 'bg-slate-950 border-slate-800 text-slate-600' : 'bg-indigo-600 border-indigo-400 text-white'}`}>
                        {m.code || `M0${index + 1}`}
                      </span>

                      {isLocked && (
                        <div className="absolute inset-0 bg-transparent z-30 flex items-center justify-center">
                          <div className="bg-slate-900/90 border border-slate-700/50 backdrop-blur px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-200 shadow-2xl pointer-events-auto">
                            <Lock className="w-3.5 h-3.5 text-indigo-400" /> Milestone Locked (Blur Level 3)
                          </div>
                        </div>
                      )}

                      <div className={`border border-slate-800 bg-slate-900 rounded-2xl p-5 shadow-xl relative transition-all duration-300 ${blurClass}`}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="text-base font-bold text-white flex-1">{m.title}</h4>
                          {m.salary_tier && (
                            <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                              {m.salary_tier}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-medium text-indigo-300 border-l-2 border-indigo-500/50 pl-3 my-3 py-1 bg-indigo-500/[0.02]">
                          <span className="font-bold text-indigo-400 mr-1">🎯 Target:</span> {m.unlock_statement}
                        </div>

                        <div className="flex gap-2 my-3">
                          <button
                            type="button"
                            onClick={() => setActiveModal({ type: 'Practice Scenarios', count: scCount, title: m.title })}
                            className="text-[10px] bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/50 px-2.5 py-1 rounded transition cursor-pointer active:scale-95"
                          >
                            Scenarios: <span className="font-bold text-indigo-400 font-mono">{scCount}</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setActiveModal({ type: 'Benchmark Assessments', count: asCount, title: m.title })}
                            className="text-[10px] bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded transition cursor-pointer active:scale-95"
                          >
                            Assessments: <span className="font-bold text-emerald-400 font-mono">{asCount}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveModal({ type: 'Simulated Interviews', count: mcCount, title: m.title })}
                            className="text-[10px] bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/50 px-2.5 py-1 rounded transition cursor-pointer active:scale-95"
                          >
                            Mock Interviews: <span className="font-bold text-amber-400 font-mono">{mcCount}</span>
                          </button>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed mb-4">{m.description}</p>

                        {m.key_actions && m.key_actions.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-slate-800/60">
                            <ul className="space-y-1.5">
                              {m.key_actions.map((act, aIdx) => (
                                <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <CheckCircle className="w-3.5 h-3.5 text-indigo-500/70 shrink-0 mt-0.5" />
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="absolute bottom-2 right-3 text-[9px] text-slate-600 font-mono">
                          blur_level: {m.blur_level}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

    
      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl relative border-t-4 border-t-indigo-500 overflow-hidden">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-slate-100">
                  Sandbox Environment Router
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)}
                className="text-slate-500 hover:text-slate-300 text-sm font-bold transition cursor-pointer px-1.5 py-0.5 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-4 mb-4">
              <p className="text-xs text-slate-400 mb-2 font-mono uppercase tracking-wider">Milestone Context</p>
              <p className="text-xs font-medium text-indigo-200 italic mb-3">"{activeModal.title}"</p>
              <hr className="border-slate-900 my-2" />
              <div className="flex items-center gap-4 mt-2">
                <div className="text-4xl font-extrabold font-mono tracking-tight text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-xl">
                  {activeModal.count}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{activeModal.type} Modules Allocated</p>
                  <p className="text-[11px] text-slate-500">Compiling deployment assets live...</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400 mb-6 bg-slate-950/40 p-3 rounded-lg border border-slate-900">
              <p className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Natively mapped via server core engine response schema.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Click event bound dynamically to state variables handlers.</span>
              </p>
            </div>

            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 transition cursor-pointer active:scale-[0.98]"
            >
              Close Context Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
}