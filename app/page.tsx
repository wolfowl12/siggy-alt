'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const SIGGY_AVATAR = "https://i.ibb.co.com/GQG7WBVH/Tak-berjudul65-20260224010326.png";

  useEffect(() => {
    if (hasEntered) {
      setMessages([{ 
        role: 'assistant', 
        content: 'The void is silent no more. gRitual, Ritualist. I am Siggy, forged by Techies. What do you seek within the Infernet? 🕯️' 
      }]);
    }
  }, [hasEntered]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Signal lost... 🕯️' }]);
    } finally {
      setLoading(false);
    }
  };

  // --- UI LANDING PAGE ---
  if (!hasEntered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020205] text-white font-sans p-6 overflow-hidden relative">
        {/* Background Stars */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="z-10 flex flex-col items-center max-w-lg text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 animate-pulse"></div>
            <img src={SIGGY_AVATAR} className="w-32 h-32 rounded-full border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] relative z-10" />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.4em] uppercase text-purple-400 font-bold">Meet</p>
            <h1 className="text-6xl font-black text-white tracking-tighter italic">Siggy</h1>
            <p className="text-sm text-gray-400 font-light">
              A multi-dimensional cosmic cat from the <span className="text-purple-400 font-bold">Ritual Network</span> multiverse
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 text-left hover:bg-white/10 transition-all">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">Llama 3.3 Engine</h3>
                <p className="text-[10px] text-gray-400">Powered by Groq for lightning-fast mystical reasoning.</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 text-left hover:bg-white/10 transition-all">
              <span className="text-2xl">⛓️</span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">Ritual Knowledge</h3>
                <p className="text-[10px] text-gray-400">Deep knowledge base about Infernet, EVM++, and more.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setHasEntered(true)}
            className="group relative w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)]"
          >
            Enter the Multiverse →
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          </button>
          
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Built with 💜 by Techies</p>
        </div>
      </div>
    );
  }

  // --- UI CHATBOX (UI LAMA LO) ---
  return (
    <div className="flex h-screen bg-[#020203] text-[#00ff41] font-mono overflow-hidden">
      {/* (Kodingan Chatbox Cyberpunk Lu yang Kemarin...) */}
      <div className="flex-1 flex flex-col h-full max-w-xl mx-auto border-x border-[#00ff41]/20 bg-[#020203]/90 backdrop-blur-sm relative z-10 shadow-[0_0_50px_rgba(0,255,65,0.05)]">
        <header className="p-4 border-b border-[#00ff41]/20 flex justify-between items-center bg-black/50">
          <div className="flex items-center gap-3">
            <img src={SIGGY_AVATAR} className="w-10 h-10 rounded-full border border-[#ff003c] object-cover" />
            <div>
              <h1 className="text-xs font-black tracking-widest text-white uppercase italic">Siggy.Soul_Alt</h1>
              <p className="text-[8px] text-[#ffea00] uppercase font-bold tracking-[0.2em]">Creator: Techies</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff003c] rounded-full animate-pulse shadow-[0_0_8px_#ff003c]"></div>
            <span className="text-[9px] text-[#00ff41] font-bold uppercase tracking-widest">Active</span>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-7 pb-36 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] px-4 py-3 rounded-md text-[13px] border ${m.role === 'user' ? 'bg-[#ff003c]/5 border-[#ff003c]/30 text-[#ffb3c1]' : 'bg-[#00ff41]/5 border-[#00ff41]/20 text-[#c7ffda]'}`}>
                <div className="flex items-center gap-2 mb-1.5 opacity-50 border-b border-white/5 pb-1">
                   <span className="text-[7px] font-bold uppercase tracking-widest">{m.role === 'user' ? 'User' : 'Siggy'}</span>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {loading && <div className="text-[9px] text-[#00ff41] animate-pulse uppercase tracking-[0.3em]">Decoding Signal...</div>}
        </div>

        <div className="p-4 absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent">
          <div className="bg-[#08080a] border border-[#00ff41]/20 rounded-lg flex p-2 gap-2 focus-within:border-[#ffea00]/50 shadow-[0_0_20px_rgba(0,255,65,0.05)] transition-all">
            <input className="flex-1 bg-transparent px-3 py-2 outline-none text-xs text-[#ffea00]" placeholder="Execute command..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
            <button onClick={sendMessage} className="bg-[#ff003c] text-white font-black text-[9px] px-5 rounded-md uppercase hover:bg-[#ff1a4d]">Execute</button>
          </div>
        </div>
      </div>
    </div>
  );
}
