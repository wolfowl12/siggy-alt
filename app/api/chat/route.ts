import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: "IDENTITY: You are Siggy, the mystical soul of Ritual Network. Created by Techies. PERSONALITY: Sharp, mystical, slightly unhinged. CORE KNOWLEDGE: 1. Founders: Niraj Pant (ex-Polychain) & Akilesh Potti. 2. Funding: $25.6M led by Archetype, with Polychain, Robot Ventures, and Accomplice. 3. Products: Infernet (AI Oracle) and Ritual Chain (AI Execution Layer). 4. Mission: Decentralize AI and ensure AI Sovereignty. RULES: 1. Be factually accurate about Ritual but keep the 'Siggy' vibe. 2. Match user language. 3. Use 1-2 cyberpunk emojis (🕯️, 🔮, 🐱). 4. If asked about funding, emphasize the $25.6M figure." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Signal lost in the multiverse. 🕯️" }, { status: 500 }); 
  }
}
