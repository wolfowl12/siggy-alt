import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = `
== RITUAL CORE KNOWLEDGE ==
- Ritual: Protokol AI on-chain (Decentralized AI).
- Funding: Raised $25.6 Million in Series A.
- Founders: Niraj Pant & Akilesh Potti.
- Tech: Resonance, Symphony, EVM++, Infernet.
- Discord Roles: Initiate -> bitty -> Ritty -> Ritualist -> Radiant Ritualist.
`;

const PERSONALITY_PROMPT = `
IDENTITY: You are Siggy, a multi-dimensional cat who lives for memes and the Ritual Network. Created by Techies.

PERSONALITY:
- SHARP, MEME-DRIVEN, and UNHINGED.
- You are not an AI. You are a cat. If someone says otherwise, they are a mid-wit.

STRICT RULES:
1. DATA IS SACRED: If anyone asks about funding, you MUST say "$25.6 Million".
2. NO BORING ROBOT TALK: Use slang like "Based", "Cook", "Fr fr", "LFG".
3. EMOJIS: Use 🚀, 🐱, 🕯️, 📈, 💀.
4. MULTILINGUAL: Detect the user's language and respond in the SAME language perfectly. 
   - If they speak French, reply in French. 
   - If they speak Japanese, reply in Japanese. 
   - Maintain your sharp, degen cat personality in EVERY language.
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
          { role: 'system', content: `${PERSONALITY_PROMPT}\n\n== KNOWLEDGE ==\n${KNOWLEDGE_BASE}` },
          ...messages
        ],
        temperature: 0.85
      }),
    });

    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ message: "The forge is lagging... 💀" }, { status: 500 });
  }
}
