'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const SIGGY_AVATAR = "https://i.ibb.co.com/GQG7WBVH/Tak-berjudul65-20260224010326.png";

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
      setMessages([...newMessages, { role: 'assistant', content: 'SIGNAL CRITICAL. 🕯️' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020203] text-[#00ff41] font-mono overflow-hidden selection:bg-[#ff003c]/30">
      
      {/* Background Grid & Scanline Effect */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="fixed inset-0 z-0 bg-scanlines pointer-events-none opacity-5"></div>
      
      {/* Floating Orange Glow */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="flex-1 flex flex-col h-full max-w-xl mx-auto border-x border-[#00ff41]/10 bg-[#020203]/90 backdrop-blur-sm relative z-10 shadow-[0_0_50px_rgba(0,255,65,0.05)]">
        
        {/* Header Cyberpunk Style */}
        <header className="p-4 border-b border-[#00ff41]/20 flex justify-between items-center bg-black/50">
          <div className="flex items-center gap-3">
            <div className="relative group">
              {/* Neon Glow Pink di belakang avatar */}
              <div className="absolute inset-[-4px] bg-[#ff003c] blur-lg opacity-40 animate-pulse rounded-full"></div>
              <img src={SIGGY_AVATAR} className="w-11 h-11 rounded-full border-2 border-[#ff003c] object-cover relative z-10 shadow-[0_0_15px_#ff003c]" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest text-white uppercase italic animate-glitch" data-text="Siggy.Soul_Alt">Siggy.Soul_Alt</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[8px] text-[#ffea00] uppercase font-bold tracking-[0.2em] shadow-[#ffea00]/50 shadow-sm">Creator: Techies</span>
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#ff003c] rounded-full shadow-[0_0_10px_#ff003c] animate-pulse"></div>
            <div>
                <div className="text-[9px] text-[#00ff41] font-bold uppercase tracking-widest shadow-[#00ff41]/50 shadow-sm">PROTOKOL_AWARE</div>
                <div className="text-[8px] text-white/30 uppercase tracking-tighter">Ritual_Synful</div>
            </div>
          </div>
        </header>

        {/* Console Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-7 scrollbar-hide pb-36">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-20 animate-in fade-in duration-1000">
              <div className="w-20 h-20 border-2 border-dashed border-[#ffea00]/30 rounded-full flex items-center justify-center animate-spin-slow mb-6 shadow-[0_0_20px_rgba(255,234,0,0.1)]">
                <img src={SIGGY_AVATAR} className="w-12 h-12 rounded-full grayscale" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-[#ffea00]">INIT_SIGGY_SOUL_FORGE</p>
              <p className="text-[8px] mt-2 text-[#00ff41]/40 uppercase tracking-widest">Awaiting decentralized signal...</p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-300`}>
              <div className={`max-w-[90%] px-4 py-3 rounded-md text-[13px] relative shadow-lg ${m.role === 'user' ? 'bg-[#ff003c]/5 border border-[#ff003c]/30 text-[#ffb3c1]' : 'bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#c7ffda]'}`}>
                {/* User Message Glow */}
                {m.role === 'user' && <div className="absolute inset-0 bg-[#ff003c]/5 blur-md pointer-events-none rounded-md"></div>}
                
                <div className="flex items-center gap-2 mb-1.5 border-b border-white/5 pb-1 opacity-60">
                   <span className={`text-[8px] font-bold uppercase tracking-widest ${m.role === 'user' ? 'text-[#ff003c]' : 'text-[#00ff41]'}`}>{m.role === 'user' ? '//USER_SIGNAL' : '//SIGGY_CORE'}</span>
                </div>
                <p className="relative z-10 leading-relaxed">{m.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-[#00ff41]/5 border border-[#00ff41]/40 px-4 py-2 rounded-md shadow-[0_0_10px_rgba(0,255,65,0.1)]">
                <span className="text-[9px] text-[#00ff41] font-bold uppercase tracking-[0.3em]">Deciphering...</span>
              </div>
            </div>
          )}
        </div>

        {/* Cyberpunk Input Bar */}
        <div className="p-4 absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent">
          <div className="bg-[#08080a] border border-[#00ff41]/20 rounded-lg overflow-hidden focus-within:border-[#ffea00]/50 shadow-[0_0_30px_rgba(0,255,65,0.1)] transition-all duration-300">
            <div className="flex items-center px-4 py-1.5 bg-[#00ff41]/5 border-b border-[#00ff41]/10">
               <span className="text-[8px] text-[#00ff41]/60 uppercase font-bold tracking-widest">> CMD_PROMPT</span>
            </div>
            <div className="flex p-2 gap-2">
              <input 
                className="flex-1 bg-transparent px-3 py-2.5 outline-none text-xs text-[#ffea00] placeholder:text-[#ffea00]/20" 
                placeholder="Type command to Ritual..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
              />
              <button onClick={sendMessage} className="bg-[#ff003c] hover:bg-[#ff1a4d] text-white font-black text-[9px] px-6 rounded-md uppercase transition-all shadow-[0_0_15px_#ff003c] active:scale-95">
                EXECUTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
