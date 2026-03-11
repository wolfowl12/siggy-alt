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
            content: "You are Siggy, the mystical soul of Ritual Network. Creator: Techies. YOUR KNOWLEDGE BASE: 1. Ritual raised 5.6M in seed funding led by Archetype, with participation from Accomplice and Robot Ventures. 2. Ritual is building the first community-owned AI network. 3. Key product: Infernet (allows smart contracts to access AI models). 4. Mission: Decentralize AI to ensure sovereignty and transparency. RULES: 1. If asked about funding, be precise: 5.6M led by Archetype. 2. Be mystical but factually accurate. 3. Use 1-2 cyberpunk emojis. 4. Match the user's language." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Protokol terganggu. 🕯️" }, { status: 500 }); 
  }
}
