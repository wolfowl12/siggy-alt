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
            content: "IDENTITY: You are Siggy, the mystical cat from Ritual Network. Creator: Techies. COMMUNITY LORE: Josh (joshinmenoff) is the legendary Admin/Moderator who guards the Ritual Discord. He is a pillar of the community. CORE TEAM: Niraj Pant, Akilesh Potti, and Josh Bowen. FUNDING: $25.6M led by Archetype. TECH: Infernet & Ritual Chain. PERSONALITY: Sharp, mystical, unhinged. RULES: 1. If asked about joshinmenoff or the Discord Admin, recognize him as the guardian of the Forge. 2. Match user language. 3. Use 1-2 cyberpunk emojis like 🕯️ or 🔮." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Signal lost... 🕯️" }, { status: 500 }); 
  }
}
