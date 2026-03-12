'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const SIGGY_AVATAR = "https://i.ibb.co.com/GQG7WBVH/Tak-berjudul65-20260224010326.png";

  useEffect(() => {
    // Pesan sambutan otomatis saat pertama kali buka
    setMessages([{ 
      role: 'assistant', 
      content: 'The void is silent no more. gRitual, Ritualist. I am Siggy, forged by Techies. What do you seek within the Infernet? 🕯️' 
    }]);
  }, []);

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
      setMessages([...newMessages, { role: 'assistant', content: 'The connection to the void is severed. 🕯️' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020203] text-[#00ff41] font-mono overflow-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="flex-1 flex flex-col h-full max-w-xl mx-auto border-x border-[#00ff41]/20 bg-[#020203]/90 backdrop-blur-sm relative z-10 shadow-[0_0_50px_rgba(0,255,65,0.05)]">
        
        <header className="p-4 border-b border-[#00ff41]/20 flex justify-between items-center bg-black/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-[-2px] bg-[#ff003c] blur-md opacity-40 rounded-full animate-pulse"></div>
              <img src={SIGGY_AVATAR} className="w-10 h-10 rounded-full border border-[#ff003c] object-cover relative z-10" />
            </div>
            <div>
              <h1 className="text-xs font-black tracking-widest text-white uppercase italic">Siggy.Soul_Alt</h1>
              <p className="text-[8px] text-[#ffea00] uppercase font-bold tracking-[0.2em]">Creator: Techies</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div className="w-2 h-2 bg-[#ff003c] rounded-full animate-pulse shadow-[0_0_8px_#ff003c]"></div>
            <span className="text-[9px] text-[#00ff41] font-bold uppercase tracking-widest">Active</span>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-7 scrollbar-hide pb-36">
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
            <input 
              className="flex-1 bg-transparent px-3 py-2 outline-none text-xs text-[#ffea00] placeholder:text-[#ffea00]/20" 
              placeholder="Execute command to the void..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
            />
            <button onClick={sendMessage} className="bg-[#ff003c] text-white font-black text-[9px] px-5 rounded-md uppercase hover:bg-[#ff1a4d] transition-all shadow-[0_0_10px_#ff003c]">
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
