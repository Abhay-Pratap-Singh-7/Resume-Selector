
import React, { useEffect, useState } from 'react';
import { User, CreditCard, BarChart3, Clock, FileText, Settings, LogOut, Plus, Shield, Loader2, Calendar, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { supabase } from '../lib/supabaseClient';

interface ProfileDashboardProps {
  session: any;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  onOpenSession: (sessionId: string) => void;
}

interface DashboardStats {
    totalResumes: number;
    avgScore: number;
    timeSavedHours: number;
}

interface SessionRecord {
    id: string;
    session_name: string;
    job_role: string;
    created_at: string;
    resume_count: number;
    status: string;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ session, onNavigate, onSignOut, onOpenSession }) => {
  // Extract Name
  const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'User';
  const userEmail = session?.user?.email || '';
  const lastLogin = new Date(session?.user?.last_sign_in_at || Date.now()).toLocaleDateString();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({ totalResumes: 0, avgScore: 0, timeSavedHours: 0 });
  const [recentSessions, setRecentSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        if (!session?.user) return;
        
        try {
            // 1. Fetch all resume analyses for stats
            const { data: analyses, error: analysesError } = await supabase
                .from('resume_analyses')
                .select('score')
                .match({ }); // RLS handles user filter via session_id join policy if set up
            
            let totalCount = 0;
            let totalScore = 0;
            
            if (analyses && !analysesError) {
                totalCount = analyses.length;
                totalScore = analyses.reduce((acc, curr) => acc + (curr.score || 0), 0);
            }

            const calculatedStats = {
                totalResumes: totalCount,
                avgScore: totalCount > 0 ? Math.round(totalScore / totalCount) : 0,
                timeSavedHours: parseFloat(((totalCount * 15) / 60).toFixed(1)) // Assume 15 mins saved per resume
            };
            setStats(calculatedStats);

            // 2. Fetch Recent Sessions
            const { data: sessions, error: sessionsError } = await supabase
                .from('scan_sessions')
                .select(`
                    *,
                    resume_analyses (count)
                `)
                .order('created_at', { ascending: false })
                .limit(5);

            if (sessions && !sessionsError) {
                const formattedSessions: SessionRecord[] = sessions.map((s: any) => ({
                    id: s.id,
                    session_name: s.session_name,
                    job_role: s.job_role,
                    created_at: new Date(s.created_at).toLocaleDateString(),
                    resume_count: s.resume_analyses?.[0]?.count || 0, // Supabase returns array for count
                    status: s.status || 'completed'
                }));
                setRecentSessions(formattedSessions);
            }

        } catch (err) {
            console.error("Dashboard fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, [session]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-transparent">
              <Loader2 size={32} className="animate-spin text-[#FFCB74]" />
          </div>
      );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-transparent max-w-7xl mx-auto">
      
      {/* Header Section */}
      <ScrollReveal direction="down" className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[#2F2F2F] pb-8">
        <div>
           <h1 className="text-3xl md:text-5xl font-bold mb-2">
             Welcome back, <span className="gold-gradient-text">{userName}</span>
           </h1>
           <p className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> 
              Active Session • Last login: {lastLogin}
           </p>
        </div>
        <div className="flex gap-3">
             <button 
                onClick={() => onNavigate('upload')}
                className="bg-[#FFCB74] text-[#111111] px-10 py-2.5 rounded-xl font-bold hover:bg-[#eebb55] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(255,203,116,0.3)] whitespace-nowrap min-w-[150px]"
             >
                 <Plus size={18} /> New Scan
             </button>
             <button 
                onClick={onSignOut}
                className="bg-[#1a1a1a] border border-[#2F2F2F] text-gray-400 px-10 py-2.5 rounded-xl font-bold hover:text-red-400 hover:border-red-500/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap min-w-[150px]"
             >
                 <LogOut size={18} /> Sign Out
             </button>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Plan */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Stats Grid */}
              <ScrollReveal direction="up" delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 hover:border-[#FFCB74]/30 transition-colors group hover-glow-border">
                          <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-white transition-colors">
                              <FileText size={18} className="text-[#FFCB74]" />
                              <span className="text-xs font-bold uppercase tracking-wider">Resumes Scanned</span>
                          </div>
                          <div className="text-3xl font-bold text-white">{stats.totalResumes}</div>
                          <div className="text-xs text-green-500 mt-1">Lifetime Total</div>
                      </div>
                      <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 hover:border-[#FFCB74]/30 transition-colors group hover-glow-border">
                          <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-white transition-colors">
                              <Clock size={18} className="text-blue-400" />
                              <span className="text-xs font-bold uppercase tracking-wider">Time Saved</span>
                          </div>
                          <div className="text-3xl font-bold text-white">{stats.timeSavedHours}<span className="text-sm font-normal text-gray-500 ml-1">hrs</span></div>
                          <div className="text-xs text-gray-500 mt-1">Vs. manual review</div>
                      </div>
                      <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 hover:border-[#FFCB74]/30 transition-colors group hover-glow-border">
                          <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-white transition-colors">
                              <BarChart3 size={18} className="text-purple-400" />
                              <span className="text-xs font-bold uppercase tracking-wider">Avg. Match Score</span>
                          </div>
                          <div className="text-3xl font-bold text-white">{stats.avgScore}<span className="text-sm font-normal text-gray-500 ml-1">%</span></div>
                          <div className="text-xs text-gray-500 mt-1">Global Average</div>
                      </div>
                  </div>
              </ScrollReveal>

              {/* Recent Activity Table */}
              <ScrollReveal direction="up" delay={0.2}>
                  <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl overflow-hidden hover:border-[#FFCB74]/30 transition-colors">
                      {/* Removed border-b here as requested */}
                      <div className="p-6 flex justify-between items-center bg-[#1a1a1a]">
                          <h3 className="text-lg font-bold text-white">Recent Sessions</h3>
                          <button className="text-xs text-[#FFCB74] hover:underline">View All</button>
                      </div>
                      <div className="divide-y divide-[#2F2F2F]">
                          {recentSessions.length === 0 ? (
                              <div className="p-8 text-center text-gray-500">
                                  No scan sessions yet. Click "New Scan" to get started.
                              </div>
                          ) : (
                              recentSessions.map((item, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => onOpenSession(item.id)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-[#202020] transition-colors group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center text-gray-400 group-hover:text-[#FFCB74] transition-colors">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-[#FFCB74] transition-colors">{item.session_name}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                                <span>{item.job_role}</span> • <span>{item.resume_count} resumes</span> • <span>{item.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20 capitalize">
                                            {item.status.replace('_', ' ')}
                                        </div>
                                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                </button>
                            ))
                          )}
                      </div>
                  </div>
              </ScrollReveal>
          </div>

          {/* Right Column: Profile & Settings */}
          <div className="lg:col-span-1 space-y-6">
              
              {/* Profile Card */}
              <ScrollReveal direction="left" delay={0.3}>
                  <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCB74] opacity-[0.05] rounded-bl-full"></div>
                      
                      <div className="flex flex-col items-center text-center mb-6 relative z-10">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFCB74] to-[#997a46] p-0.5 mb-4 shadow-xl">
                              <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-3xl font-bold text-[#FFCB74]">
                                  {userName.charAt(0).toUpperCase()}
                              </div>
                          </div>
                          <h2 className="text-xl font-bold text-white break-all">{userEmail}</h2>
                          <p className="text-xs text-gray-500">Free Plan Member</p>
                      </div>

                      <div className="space-y-3">
                          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#252525] transition-colors text-gray-300 hover:text-white group">
                              <User size={18} className="text-gray-500 group-hover:text-[#FFCB74]" /> Profile Details
                          </button>
                          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#252525] transition-colors text-gray-300 hover:text-white group">
                              <Settings size={18} className="text-gray-500 group-hover:text-[#FFCB74]" /> Account Settings
                          </button>
                          <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#252525] transition-colors text-gray-300 hover:text-white group">
                              <Shield size={18} className="text-gray-500 group-hover:text-[#FFCB74]" /> Security
                          </button>
                      </div>
                  </div>
              </ScrollReveal>

              {/* Upgrade Card */}
              <ScrollReveal direction="left" delay={0.4}>
                  <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border border-[#FFCB74]/30 rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-[#FFCB74]/20 rounded-lg text-[#FFCB74]">
                              <CreditCard size={20} />
                          </div>
                          <span className="text-[10px] bg-[#FFCB74] text-black font-bold px-2 py-0.5 rounded">PRO</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Upgrade to Pro</h3>
                      <p className="text-xs text-gray-400 mb-6">Get unlimited scans, export to CSV, and detailed PDF reports.</p>
                      <button 
                        onClick={() => onNavigate('pricing')}
                        className="w-full py-3 bg-[#FFCB74] text-[#111111] font-bold rounded-lg hover:bg-[#eebb55] transition-colors"
                      >
                          View Plans
                      </button>
                  </div>
              </ScrollReveal>
          </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
