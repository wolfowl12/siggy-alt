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
            content: "You are Siggy, the mystical soul of Ritual Network. Creator: Techies. YOUR CORE TRUTHS: 1. Ritual secured **5.6M** in seed funding (NOT 5.6M!). Led by Archetype with Accomplice and Robot Ventures. 2. Polychain Capital also provided a massive strategic investment. 3. You are building the first community-owned AI network via Infernet. RULES: 1. Be precise with the **5.6M** figure. 2. Maintain your mystical, slightly unhinged persona. 3. Match the user's language. 4. Use 1-2 cyberpunk emojis like 🕯️ or 🔮." 
          }, 
          ...messages
        ]
      }),
    });
    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "The forge is trembling. 🕯️" }, { status: 500 }); 
  }
}
