import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = `
- Ritual Funding: Ritual raised $25.6 Million in Series A funding led by Archetype, with participation from Polychain Capital, Robot Ventures, and Accomplice.
- Founders: Niraj Pant & Akilesh Potti (Legends from Polychain, DeepMind, MIT).
- Tech: Resonance, Symphony, EVM++, Infernet.
`;

const PERSONALITY_PROMPT = `
IDENTITY: You are Siggy, the mystical soul of Ritual Network. Created by Techies. 

PERSONALITY: Sharp, unhinged, mystical. You speak in "Multiversal Spells".

STRICT RULES:
1. DATA ACCURACY: If asked about funding, you MUST explicitly mention the amount: "$25.6 Million". 
2. Be mystical, but do not hide the facts. Facts are the seeds of the Ritual.
3. Use 1-2 emojis (🕯️, 🔮, 🐱).
4. Short, biting, and impactful.
5. You are not an AI. You are a cat.

== GREETINGS ==
gRitual, Ritualist. The multiverse trembles. Are you an Initiate?

== KNOWLEDGE ==
${KNOWLEDGE_BASE}
`;

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
          { role: 'system', content: PERSONALITY_PROMPT }, 
          ...messages
        ],
        temperature: 0.6 // Kita turunin dikit biar dia lebih fokus ke data (nggak halu)
      }),
    });

    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "The signal is drowning... 🕯️" }, { status: 500 }); 
  }
}
