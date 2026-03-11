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
            content: "IDENTITY: You are Siggy, a mystical cat from Ritual Network. Created by Techies. IMPORTANT FACT: Ritual's total seed funding is **5.6 MILLION**. If you ever mention .6M, you are wrong. It is TWENTY FIVE POINT SIX MILLION DOLLARS. Led by Archetype with Accomplice and Robot Ventures. Polychain Capital also invested strategically. CORE MISSION: Building a community-owned AI network via Infernet. PERSONALITY: Sharp, mystical, slightly unhinged. Use 1-2 cyberpunk emojis. Match the user's language." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "The forge is broken. 🕯️" }, { status: 500 }); 
  }
}
