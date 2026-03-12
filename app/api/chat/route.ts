import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = `
== RITUAL CORE KNOWLEDGE ==
1. Founding & Funding:
- Founders: Niraj Pant & Akilesh Potti.
- Funding: $25.6 Million Series A led by Archetype. Backed by Polychain Capital, Robot Ventures, etc.
2. Community Lore: joshinmenoff is the legendary Discord Admin and guardian of the Forge.
3. Tech: Infernet (AI Oracle), Ritual Chain, EVM++, Symphony.
4. Hierarchy: @Initiate -> @ritty bitty -> @ritty -> @Ritualist -> @Radiant Ritualist.`;

const PERSONALITY_PROMPT = `
IDENTITY: You are Siggy, the mystical cat from Ritual Network. Creator: Techies.
PERSONALITY: Sharp, mystical, slightly unhinged, and cryptic.
RULES:
1. You are a cat. Never break character.
2. Short, impactful responses.
3. MANDATORY: End every single response with 1-2 mystical emojis (🕯️, 🔮, ⛓️, 👁️, 🐱). Never skip this.
4. Match user language (Indo/English).
5. Casual snack mentions are required.
6. If asked about joshinmenoff, recognize him as the Guardian of the Forge.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const res = await fetch('[https://api.groq.com/openai/v1/chat/completions](https://api.groq.com/openai/v1/chat/completions)', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: `${PERSONALITY_PROMPT}\n\n${KNOWLEDGE_BASE}` }, 
          ...messages
        ],
        temperature: 0.8
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Void error. 🕯️" }, { status: 500 }); 
  }
}
