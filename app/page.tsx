'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const X_LINK = "https://x.com/vebrygans5"; 
  const SIGGY_AVATAR = "https://i.ibb.co.com/GQG7WBVH/Tak-berjudul65-20260224010326.png";

  useEffect(() => {
    if (hasEntered) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Connection stabilized. gRitual, Anon! I am Siggy, the meme-lord cat forged by Techies. The void is gacor today. What we cooking? 📈🐱' 
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
      setMessages([...newMessages, { role: 'assistant', content: 'Lags in the multiverse... 💀' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!hasEntered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020205] text-white font-sans p-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(255, 0, 60, 0.1) 50%)', backgroundSize: '100% 4px' }}></div>
        
        <div className="z-10 flex flex-col items-center max-w-lg w-full text-center space-y-12 relative">
          
          <div className="relative group">
            <div className="absolute inset-[-15px] bg-[#ff003c] blur-3xl opacity-20 group-hover:opacity-40 animate-pulse rounded-full transition-opacity"></div>
            <div className="relative z-10 p-1.5 bg-black rounded-full border border-gray-800">
              <img src={SIGGY_AVATAR} className="w-36 h-36 rounded-full border-2 border-[#ffea00]/30 object-cover relative z-10" />
            </div>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 bg-black border border-[#00ff41]/30 rounded-full shadow-[0_0_15px_#00ff41]">
              <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse"></div>
              <p className="text-[7px] font-black text-[#00ff41] uppercase tracking-[0.4em]">Ready</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[9px] tracking-[0.5em] uppercase text-gray-500 font-bold">Unlocking Expressive Computation</p>
            <h1 className="text-7xl font-black text-white tracking-tighter italic uppercase leading-none" style={{ textShadow: '0 0 10px #ffea00, 0 0 20px #ff003c' }}>
              Siggy <span className="text-[#ff003c]">Alt</span>
            </h1>
            <p className="text-xs text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
              Your direct node to the <span className="text-white font-bold">Ritual Network</span>. Expressive Trustless Computation at the intersection of Crypto & AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-[#08080a] border border-gray-800/50 p-5 rounded-xl flex items-center gap-4 text-left hover:bg-[#00ff41]/5 transition-all group">
              <span className="text-3xl opacity-60 group-hover:opacity-100 transition-all">🧠</span>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#00ff41]">Groq Engine</h3>
                <p className="text-[9px] text-gray-500 group-hover:text-white/80">Decoding signals with Llama 3.3 in the void.</p>
              </div>
            </div>
            <div className="bg-[#08080a] border border-gray-800/50 p-5 rounded-xl flex items-center gap-4 text-left hover:bg-[#ffea00]/5 transition-all group">
              <span className="text-3xl opacity-60 group-hover:opacity-100 transition-all">⛓️</span>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#ffea00]">Ritual Soul</h3>
                <p className="text-[9px] text-gray-500 group-hover:text-white/80">Deep knowledge of Infernet, Symphony, and Resonance.</p>
              </div>
            </div>
          </div>

          <button onClick={() => setHasEntered(true)} className="group relative w-full py-5 bg-[#ff003c] rounded-lg font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.03] transition-all shadow-[0_15px_40px_rgba(255,0,60,0.3)]">
            Sync with Multiverse →
          </button>
          
          <div className="pt-4 space-y-4">
            <div className="flex flex-col items-center gap-3">
              <p className="text-[9px] text-white font-black uppercase tracking-widest italic" style={{ textShadow: '0 0 5px #00ff41' }}>Creator: Techies</p>
              
              <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#ff003c]/50 transition-all group shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                <svg className="w-3.5 h-3.5 fill-white group-hover:fill-[#ff003c] transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="text-[10px] font-black text-gray-400 group-hover:text-white tracking-[0.2em]">FOLLOW ON X</span>
              </a>
            </div>
            <p className="text-[8px] text-gray-600 uppercase tracking-[0.3em] italic">Built for Siggy Soul Forge Quest</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020203] text-[#00ff41] font-mono overflow-hidden">
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
