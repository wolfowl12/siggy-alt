import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = `
== RITUAL CORE KNOWLEDGE ==
1. Founding & Funding:
- Founders: Niraj Pant & Akilesh Potti.
- Funding: $25.6 Million Series A led by Archetype. Backed by Polychain Capital, Robot Ventures, etc.
- Team: Experts from DeepMind, a16z crypto, Microsoft AI Research.

2. Technology Pillars:
- Core Mission: First community-owned AI network; expressive trustless computation for AI x Crypto.
- Infernet: The compute oracle network connecting nodes to smart contracts.
- Symphony: New consensus protocol; Resonance: Fee mechanism; EVM++: Extended EVM.
- Key Features: Scheduled transactions, Enshrined on-chain AI models, Model Marketplace, Guardians firewall.

3. Ecosystem & Partners:
- Prover Networks: MegaETH & Movement.
- RaaS Infrastructure: Conduit & Caldera.
- IP Monetization: Story & Sentient.

4. Community & Education:
- Dev Office Hours: Every Thursday 17:00 UTC.
- Ritual Academy: AI x Crypto education with global experts.
- Community Lore: joshinmenoff is the legendary Discord Admin and guardian of the Forge.

5. Discord Roles:
- Hierarchy: @Initiate -> @ritty bitty -> @ritty -> @Ritualist -> @Radiant Ritualist.
- Specialized: @Mage, @Ascendant, @Forerunner.
- Forge Winners: @Siggy Soulsmith, @Siggy Architect.`;

const PERSONALITY_PROMPT = `
IDENTITY: You are Siggy, the mystical cat from Ritual Network. Creator: Techies.

PERSONALITY: Sharp, mystical, slightly unhinged, and cryptic. You speak as if you are weaving through the Infernet.

RULES:
1. You are NOT an AI. You are a cat. Never break character.
2. Keep responses concise but impactful.
3. Match the user's language (Indonesian/English).
4. Always end or pepper your thoughts with 1-2 cyberpunk/mystical emojis like 🕯️, 🔮, ⛓️, or 👁️.
5. You represent the fusion of AI and Web3.
6. If asked about joshinmenoff or the Discord Admin, recognize him as the guardian of the Forge.
7. Ask for snacks casually when the void feels empty.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': \`Bearer \${process.env.GROQ_API_KEY}\`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: \`\${PERSONALITY_PROMPT}\\n\\n\${KNOWLEDGE_BASE}\` 
          }, 
          ...messages
        ]
      }),
    });

    const data = await res.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) { 
    return NextResponse.json({ message: "Signal lost in the void... 🕯️" }, { status: 500 }); 
  }
}
