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
      setMessages([...newMessages, { role: 'assistant', content: 'Connection Lost.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <div className="flex-1 flex flex-col h-full max-w-lg mx-auto relative">
        <header className="py-10 px-6 flex flex-col items-center gap-4">
          <img src={SIGGY_AVATAR} className="w-16 h-16 rounded-full border border-white/20 p-1" />
          <div className="text-center">
            <h1 className="text-xs uppercase tracking-[0.5em] font-light text-white/50">Siggy Alternative</h1>
            <p className="text-[10px] text-orange-500 tracking-widest mt-1 italic">Soul of Ritual</p>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 space-y-10 pb-40">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}>
              <div className={`max-w-[90%] text-sm ${m.role === 'user' ? 'text-orange-500 font-medium' : 'text-gray-300 font-light'}`}>
                <span className="block text-[8px] uppercase tracking-widest opacity-30 mb-2">{m.role}</span>
                {m.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-[10px] text-white/20 animate-pulse">...INGESTING DATA...</div>}
        </div>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black via-black to-transparent">
          <input 
            className="w-full bg-transparent border-b border-white/10 py-4 outline-none text-sm placeholder:text-white/10 focus:border-orange-500/50 transition-colors" 
            placeholder="Speak to the Void..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
          />
        </div>
      </div>
    </div>
  );
}
