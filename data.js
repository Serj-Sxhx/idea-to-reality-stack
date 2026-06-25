// data.js — GENERATED FILE. Do not edit by hand.
// Source of truth: ontology/*.ts (TypeScript + Zod). Regenerate with:
//   npm run build:data   (validates the ontology, then rewrites this file)
// app.js reads window.IRS_DATA below; keeping this build-free means GitHub
// Pages can host the site with no bundler.

const DOMAINS = {
  "text": "Text",
  "visual": "Visual",
  "audio": "Audio",
  "software": "Software",
  "physical": "Physical"
};

const STAGES = {
  "generate": "Generate",
  "validate": "Validate",
  "execute": "Execute"
};

const ARTIFACTS = [
  {
    "id": "blog-post",
    "name": "Blog post / essay",
    "domain": "text",
    "completeness": 97,
    "ease": 95,
    "humanTouchpoints": 1,
    "aiReadyYear": 2023,
    "steps": [
      {
        "stage": "generate",
        "name": "Outline + angle",
        "tool": "LLM",
        "fulfillment": 95
      },
      {
        "stage": "validate",
        "name": "Fact-check + edit",
        "tool": "LLM + Human",
        "fulfillment": 85
      },
      {
        "stage": "execute",
        "name": "Publish to web",
        "tool": "Static site / CMS API",
        "fulfillment": 98
      }
    ]
  },
  {
    "id": "ebook",
    "name": "eBook",
    "domain": "text",
    "completeness": 95,
    "ease": 88,
    "humanTouchpoints": 2,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Chapter drafting",
        "tool": "LLM (long-context)",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Cover art",
        "tool": "Text-to-image",
        "fulfillment": 92
      },
      {
        "stage": "validate",
        "name": "Developmental edit",
        "tool": "Human + LLM",
        "fulfillment": 70
      },
      {
        "stage": "execute",
        "name": "EPUB build + distribute",
        "tool": "Pandoc / EPUB build + KDP publishing API",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "newsletter",
    "name": "Newsletter issue",
    "domain": "text",
    "completeness": 96,
    "ease": 94,
    "humanTouchpoints": 1,
    "aiReadyYear": 2023,
    "steps": [
      {
        "stage": "generate",
        "name": "Curate + draft",
        "tool": "LLM + Web search / RSS",
        "fulfillment": 92
      },
      {
        "stage": "validate",
        "name": "Tone + link check",
        "tool": "LLM + Human",
        "fulfillment": 80
      },
      {
        "stage": "execute",
        "name": "Send to list",
        "tool": "Email / newsletter API (Resend/Substack)",
        "fulfillment": 97
      }
    ]
  },
  {
    "id": "research-report",
    "name": "Research report",
    "domain": "text",
    "completeness": 85,
    "ease": 87,
    "humanTouchpoints": 2,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Source gathering",
        "tool": "Deep research agent",
        "fulfillment": 82
      },
      {
        "stage": "generate",
        "name": "Synthesis + draft",
        "tool": "LLM (long-context)",
        "fulfillment": 80
      },
      {
        "stage": "validate",
        "name": "Fact + citation audit",
        "tool": "Human + LLM",
        "fulfillment": 60
      },
      {
        "stage": "execute",
        "name": "Format + publish",
        "tool": "Templated documents",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "novel",
    "name": "Novel (full-length)",
    "domain": "text",
    "completeness": 76,
    "ease": 80,
    "humanTouchpoints": 3,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Plot + character bible",
        "tool": "LLM",
        "fulfillment": 85
      },
      {
        "stage": "generate",
        "name": "Draft chapters",
        "tool": "LLM (long-context)",
        "fulfillment": 72
      },
      {
        "stage": "validate",
        "name": "Coherence + voice edit",
        "tool": "Human",
        "fulfillment": 45
      },
      {
        "stage": "execute",
        "name": "Publish (KDP/EPUB)",
        "tool": "Pandoc / EPUB build + KDP publishing API",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "resume",
    "name": "Resume / CV",
    "domain": "text",
    "completeness": 97,
    "ease": 97,
    "humanTouchpoints": 1,
    "aiReadyYear": 2023,
    "steps": [
      {
        "stage": "generate",
        "name": "Draft from history",
        "tool": "LLM",
        "fulfillment": 95
      },
      {
        "stage": "validate",
        "name": "Truth + tailoring",
        "tool": "Human",
        "fulfillment": 75
      },
      {
        "stage": "execute",
        "name": "Export PDF",
        "tool": "Templated documents",
        "fulfillment": 99
      }
    ]
  },
  {
    "id": "online-course",
    "name": "Online course",
    "domain": "text",
    "completeness": 88,
    "ease": 74,
    "humanTouchpoints": 3,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Curriculum + scripts",
        "tool": "LLM",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Video / avatar lessons",
        "tool": "Avatar video (HeyGen) + Text-to-speech",
        "fulfillment": 72
      },
      {
        "stage": "validate",
        "name": "Pedagogy review",
        "tool": "Human",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "Publish to LMS",
        "tool": "LMS API (Teachable)",
        "fulfillment": 92
      }
    ]
  },
  {
    "id": "social-pack",
    "name": "Social content pack",
    "domain": "visual",
    "completeness": 92,
    "ease": 90,
    "humanTouchpoints": 1,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Copy + captions",
        "tool": "LLM",
        "fulfillment": 93
      },
      {
        "stage": "generate",
        "name": "Graphics + thumbnails",
        "tool": "Text-to-image + Templated documents",
        "fulfillment": 85
      },
      {
        "stage": "execute",
        "name": "Schedule + post",
        "tool": "Social scheduling API",
        "fulfillment": 92
      }
    ]
  },
  {
    "id": "infographic",
    "name": "Infographic / data viz",
    "domain": "visual",
    "completeness": 88,
    "ease": 86,
    "humanTouchpoints": 2,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Data + narrative",
        "tool": "LLM + Agentic coding",
        "fulfillment": 85
      },
      {
        "stage": "generate",
        "name": "Layout + charts",
        "tool": "Charting libraries + Text-to-image",
        "fulfillment": 82
      },
      {
        "stage": "validate",
        "name": "Accuracy check",
        "tool": "Human",
        "fulfillment": 60
      },
      {
        "stage": "execute",
        "name": "Export asset",
        "tool": "Render engine",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "brand-identity",
    "name": "Brand identity",
    "domain": "visual",
    "completeness": 85,
    "ease": 80,
    "humanTouchpoints": 2,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Naming + positioning",
        "tool": "LLM",
        "fulfillment": 88
      },
      {
        "stage": "generate",
        "name": "Logo + system",
        "tool": "Text-to-image + Vector tools",
        "fulfillment": 75
      },
      {
        "stage": "validate",
        "name": "Stakeholder sign-off",
        "tool": "Human",
        "fulfillment": 50
      },
      {
        "stage": "execute",
        "name": "Brand guide export",
        "tool": "Templated documents",
        "fulfillment": 90
      }
    ]
  },
  {
    "id": "illustrated-book",
    "name": "Illustrated book",
    "domain": "visual",
    "completeness": 90,
    "ease": 76,
    "humanTouchpoints": 3,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Story + script",
        "tool": "LLM",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Consistent illustrations",
        "tool": "Text-to-image",
        "fulfillment": 78
      },
      {
        "stage": "validate",
        "name": "Art direction pass",
        "tool": "Human",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "Layout + print-ready PDF",
        "tool": "Layout / typesetting API",
        "fulfillment": 88
      }
    ]
  },
  {
    "id": "3d-asset",
    "name": "3D model / game asset",
    "domain": "visual",
    "completeness": 68,
    "ease": 66,
    "humanTouchpoints": 3,
    "aiReadyYear": 2026,
    "steps": [
      {
        "stage": "generate",
        "name": "Concept",
        "tool": "LLM + Text-to-image",
        "fulfillment": 85
      },
      {
        "stage": "generate",
        "name": "Mesh + texture",
        "tool": "Text-to-3D",
        "fulfillment": 58
      },
      {
        "stage": "validate",
        "name": "Topology cleanup",
        "tool": "Human + 3D DCC tools (Blender)",
        "fulfillment": 45
      },
      {
        "stage": "execute",
        "name": "Export rig-ready",
        "tool": "3D DCC tools (Blender)",
        "fulfillment": 70
      }
    ]
  },
  {
    "id": "explainer-video",
    "name": "Animated explainer",
    "domain": "visual",
    "completeness": 73,
    "ease": 68,
    "humanTouchpoints": 3,
    "aiReadyYear": 2026,
    "steps": [
      {
        "stage": "generate",
        "name": "Script + storyboard",
        "tool": "LLM",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Animation + VO",
        "tool": "Text-to-video + Text-to-speech",
        "fulfillment": 68
      },
      {
        "stage": "validate",
        "name": "Timing + polish",
        "tool": "Human + Video editor (NLE)",
        "fulfillment": 50
      },
      {
        "stage": "execute",
        "name": "Render + upload",
        "tool": "Render engine + Video hosting API (YouTube)",
        "fulfillment": 85
      }
    ]
  },
  {
    "id": "trailer",
    "name": "Short film / trailer",
    "domain": "visual",
    "completeness": 70,
    "ease": 58,
    "humanTouchpoints": 4,
    "aiReadyYear": 2026,
    "steps": [
      {
        "stage": "generate",
        "name": "Script + storyboard",
        "tool": "LLM",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Shots",
        "tool": "Text-to-video",
        "fulfillment": 65
      },
      {
        "stage": "validate",
        "name": "Continuity + edit",
        "tool": "Human + Video editor (NLE)",
        "fulfillment": 45
      },
      {
        "stage": "execute",
        "name": "Sound + final render",
        "tool": "Generative audio (Suno/Udio) + Render engine",
        "fulfillment": 70
      }
    ]
  },
  {
    "id": "feature-film",
    "name": "Feature film",
    "domain": "visual",
    "completeness": 42,
    "ease": 38,
    "humanTouchpoints": 7,
    "aiReadyYear": 2030,
    "steps": [
      {
        "stage": "generate",
        "name": "Screenplay",
        "tool": "LLM",
        "fulfillment": 80
      },
      {
        "stage": "generate",
        "name": "Shots + VFX",
        "tool": "Text-to-video",
        "fulfillment": 45
      },
      {
        "stage": "validate",
        "name": "Direction + edit",
        "tool": "Human",
        "fulfillment": 25
      },
      {
        "stage": "execute",
        "name": "Score + distribution",
        "tool": "Generative audio (Suno/Udio) + Music distribution API (DistroKid)",
        "fulfillment": 40
      }
    ]
  },
  {
    "id": "song",
    "name": "Song (recorded)",
    "domain": "audio",
    "completeness": 88,
    "ease": 82,
    "humanTouchpoints": 2,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Lyrics + melody",
        "tool": "LLM + Generative audio (Suno/Udio)",
        "fulfillment": 88
      },
      {
        "stage": "generate",
        "name": "Full production",
        "tool": "Generative audio (Suno/Udio)",
        "fulfillment": 85
      },
      {
        "stage": "validate",
        "name": "Taste / mix pass",
        "tool": "Human + AI mastering",
        "fulfillment": 65
      },
      {
        "stage": "execute",
        "name": "Distribute (DSPs)",
        "tool": "Music distribution API (DistroKid)",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "podcast",
    "name": "Podcast episode",
    "domain": "audio",
    "completeness": 85,
    "ease": 83,
    "humanTouchpoints": 2,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Research + script",
        "tool": "LLM",
        "fulfillment": 90
      },
      {
        "stage": "generate",
        "name": "Voices",
        "tool": "Text-to-speech",
        "fulfillment": 82
      },
      {
        "stage": "validate",
        "name": "Edit + taste",
        "tool": "Human + Automated edit",
        "fulfillment": 60
      },
      {
        "stage": "execute",
        "name": "Publish to feeds",
        "tool": "RSS / podcast hosting API",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "audiobook",
    "name": "Audiobook",
    "domain": "audio",
    "completeness": 88,
    "ease": 85,
    "humanTouchpoints": 1,
    "aiReadyYear": 2024,
    "steps": [
      {
        "stage": "generate",
        "name": "Narration",
        "tool": "Text-to-speech",
        "fulfillment": 88
      },
      {
        "stage": "validate",
        "name": "Pronunciation pass",
        "tool": "Human + LLM",
        "fulfillment": 65
      },
      {
        "stage": "execute",
        "name": "Master + distribute",
        "tool": "Audiobook distribution API (ACX)",
        "fulfillment": 90
      }
    ]
  },
  {
    "id": "music-album",
    "name": "Music album",
    "domain": "audio",
    "completeness": 80,
    "ease": 76,
    "humanTouchpoints": 3,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Composition + lyrics",
        "tool": "LLM + Generative audio (Suno/Udio)",
        "fulfillment": 85
      },
      {
        "stage": "generate",
        "name": "Production (12 tracks)",
        "tool": "Generative audio (Suno/Udio)",
        "fulfillment": 80
      },
      {
        "stage": "validate",
        "name": "Mix/master + curation",
        "tool": "Human + AI mastering",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "Release to DSPs",
        "tool": "Music distribution API (DistroKid)",
        "fulfillment": 95
      }
    ]
  },
  {
    "id": "chatbot-agent",
    "name": "AI agent / chatbot",
    "domain": "software",
    "completeness": 84,
    "ease": 80,
    "humanTouchpoints": 2,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Prompt + tool design",
        "tool": "LLM",
        "fulfillment": 88
      },
      {
        "stage": "generate",
        "name": "Build + integrate",
        "tool": "Agentic coding",
        "fulfillment": 82
      },
      {
        "stage": "validate",
        "name": "Eval + guardrails",
        "tool": "Automated evals/tests + Human",
        "fulfillment": 65
      },
      {
        "stage": "execute",
        "name": "Deploy",
        "tool": "Serverless / API host",
        "fulfillment": 90
      }
    ]
  },
  {
    "id": "saas-app",
    "name": "SaaS web app",
    "domain": "software",
    "completeness": 80,
    "ease": 70,
    "humanTouchpoints": 4,
    "aiReadyYear": 2026,
    "steps": [
      {
        "stage": "generate",
        "name": "Spec + UX",
        "tool": "LLM + Design / UX tools",
        "fulfillment": 85
      },
      {
        "stage": "generate",
        "name": "Implementation",
        "tool": "Agentic coding",
        "fulfillment": 78
      },
      {
        "stage": "validate",
        "name": "Tests + review",
        "tool": "Automated evals/tests + Human",
        "fulfillment": 70
      },
      {
        "stage": "execute",
        "name": "Deploy + monitor",
        "tool": "Web deploy (Vercel/CI)",
        "fulfillment": 88
      }
    ]
  },
  {
    "id": "mobile-app",
    "name": "Mobile app",
    "domain": "software",
    "completeness": 70,
    "ease": 62,
    "humanTouchpoints": 4,
    "aiReadyYear": 2026,
    "steps": [
      {
        "stage": "generate",
        "name": "Spec + UX",
        "tool": "LLM + Design / UX tools",
        "fulfillment": 82
      },
      {
        "stage": "generate",
        "name": "Build (iOS/Android)",
        "tool": "Agentic coding",
        "fulfillment": 72
      },
      {
        "stage": "validate",
        "name": "Device QA",
        "tool": "Human + Device emulators / QA rigs",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "App store submit",
        "tool": "App store API",
        "fulfillment": 60
      }
    ]
  },
  {
    "id": "indie-game",
    "name": "Indie game (2D)",
    "domain": "software",
    "completeness": 60,
    "ease": 56,
    "humanTouchpoints": 5,
    "aiReadyYear": 2027,
    "steps": [
      {
        "stage": "generate",
        "name": "Design + art + audio",
        "tool": "LLM + Text-to-image + Generative audio (Suno/Udio)",
        "fulfillment": 70
      },
      {
        "stage": "generate",
        "name": "Engine implementation",
        "tool": "Agentic coding",
        "fulfillment": 65
      },
      {
        "stage": "validate",
        "name": "Playtest + balance",
        "tool": "Human",
        "fulfillment": 35
      },
      {
        "stage": "execute",
        "name": "Ship to Steam/itch",
        "tool": "App store API",
        "fulfillment": 70
      }
    ]
  },
  {
    "id": "merch",
    "name": "T-shirt / merch (POD)",
    "domain": "physical",
    "completeness": 80,
    "ease": 70,
    "humanTouchpoints": 2,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Design",
        "tool": "Text-to-image + Vector tools",
        "fulfillment": 88
      },
      {
        "stage": "validate",
        "name": "Mockup approval",
        "tool": "Human",
        "fulfillment": 65
      },
      {
        "stage": "execute",
        "name": "Print-on-demand fulfil",
        "tool": "Merch print-on-demand API (Printful)",
        "fulfillment": 78
      }
    ]
  },
  {
    "id": "physical-book",
    "name": "Physical print book",
    "domain": "physical",
    "completeness": 90,
    "ease": 55,
    "humanTouchpoints": 3,
    "aiReadyYear": 2025,
    "steps": [
      {
        "stage": "generate",
        "name": "Manuscript + cover",
        "tool": "LLM + Text-to-image",
        "fulfillment": 90
      },
      {
        "stage": "validate",
        "name": "Proof copy review",
        "tool": "Human",
        "fulfillment": 60
      },
      {
        "stage": "execute",
        "name": "Print-on-demand order",
        "tool": "Print-on-demand book API (Lulu/KDP)",
        "fulfillment": 80
      },
      {
        "stage": "execute",
        "name": "Ship to reader",
        "tool": "Logistics / shipping",
        "fulfillment": 70
      }
    ]
  },
  {
    "id": "3d-print",
    "name": "3D-printed object",
    "domain": "physical",
    "completeness": 58,
    "ease": 50,
    "humanTouchpoints": 4,
    "aiReadyYear": 2027,
    "steps": [
      {
        "stage": "generate",
        "name": "Parametric model",
        "tool": "LLM + CAD / parametric modelling + Text-to-3D",
        "fulfillment": 70
      },
      {
        "stage": "validate",
        "name": "Printability check",
        "tool": "3D print slicer + Human",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "Print",
        "tool": "3D printer",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "Post-process",
        "tool": "Human",
        "fulfillment": 30
      }
    ]
  },
  {
    "id": "board-game",
    "name": "Board game (physical)",
    "domain": "physical",
    "completeness": 56,
    "ease": 52,
    "humanTouchpoints": 4,
    "aiReadyYear": 2027,
    "steps": [
      {
        "stage": "generate",
        "name": "Rules + art",
        "tool": "LLM + Text-to-image",
        "fulfillment": 78
      },
      {
        "stage": "validate",
        "name": "Playtest balance",
        "tool": "Human",
        "fulfillment": 35
      },
      {
        "stage": "execute",
        "name": "Manufacture + ship",
        "tool": "Print-run manufacturing API",
        "fulfillment": 60
      }
    ]
  },
  {
    "id": "furniture",
    "name": "Furniture (CNC)",
    "domain": "physical",
    "completeness": 55,
    "ease": 45,
    "humanTouchpoints": 5,
    "aiReadyYear": 2028,
    "steps": [
      {
        "stage": "generate",
        "name": "Parametric design",
        "tool": "LLM + CAD / parametric modelling",
        "fulfillment": 75
      },
      {
        "stage": "validate",
        "name": "Structural check",
        "tool": "Simulation / CAE + Human",
        "fulfillment": 55
      },
      {
        "stage": "execute",
        "name": "CNC / fabrication",
        "tool": "CNC machine",
        "fulfillment": 50
      },
      {
        "stage": "execute",
        "name": "Assembly + finish",
        "tool": "Human",
        "fulfillment": 25
      }
    ]
  },
  {
    "id": "house-design",
    "name": "House (design)",
    "domain": "physical",
    "completeness": 65,
    "ease": 35,
    "humanTouchpoints": 5,
    "aiReadyYear": 2029,
    "steps": [
      {
        "stage": "generate",
        "name": "Concept + renders",
        "tool": "LLM + Text-to-image + CAD / parametric modelling",
        "fulfillment": 80
      },
      {
        "stage": "validate",
        "name": "Code / permit compliance",
        "tool": "Human",
        "fulfillment": 45
      },
      {
        "stage": "execute",
        "name": "Construction docs",
        "tool": "BIM",
        "fulfillment": 55
      }
    ]
  },
  {
    "id": "live-event",
    "name": "Live event",
    "domain": "physical",
    "completeness": 45,
    "ease": 40,
    "humanTouchpoints": 6,
    "aiReadyYear": 2030,
    "steps": [
      {
        "stage": "generate",
        "name": "Concept + run-of-show",
        "tool": "LLM",
        "fulfillment": 85
      },
      {
        "stage": "validate",
        "name": "Venue + logistics",
        "tool": "Human + AI agent",
        "fulfillment": 40
      },
      {
        "stage": "execute",
        "name": "Physical production",
        "tool": "Human",
        "fulfillment": 20
      },
      {
        "stage": "execute",
        "name": "Run the event",
        "tool": "Human",
        "fulfillment": 10
      }
    ]
  },
  {
    "id": "gadget",
    "name": "Electronic gadget",
    "domain": "physical",
    "completeness": 38,
    "ease": 30,
    "humanTouchpoints": 6,
    "aiReadyYear": 2030,
    "steps": [
      {
        "stage": "generate",
        "name": "Schematic + firmware",
        "tool": "LLM + EDA / circuit tools",
        "fulfillment": 65
      },
      {
        "stage": "validate",
        "name": "Prototype + test",
        "tool": "Human",
        "fulfillment": 35
      },
      {
        "stage": "execute",
        "name": "PCB fab + assembly",
        "tool": "PCB fab service",
        "fulfillment": 40
      },
      {
        "stage": "execute",
        "name": "Enclosure + QA",
        "tool": "Human",
        "fulfillment": 20
      }
    ]
  },
  {
    "id": "restaurant-meal",
    "name": "Restaurant meal",
    "domain": "physical",
    "completeness": 30,
    "ease": 34,
    "humanTouchpoints": 6,
    "aiReadyYear": 2032,
    "steps": [
      {
        "stage": "generate",
        "name": "Recipe + plating",
        "tool": "LLM",
        "fulfillment": 85
      },
      {
        "stage": "validate",
        "name": "Taste + iterate",
        "tool": "Human",
        "fulfillment": 20
      },
      {
        "stage": "execute",
        "name": "Cook",
        "tool": "Kitchen robotics (early)",
        "fulfillment": 25
      },
      {
        "stage": "execute",
        "name": "Serve",
        "tool": "Human",
        "fulfillment": 15
      }
    ]
  },
  {
    "id": "house-built",
    "name": "House (built)",
    "domain": "physical",
    "completeness": 25,
    "ease": 15,
    "humanTouchpoints": 9,
    "aiReadyYear": 2040,
    "steps": [
      {
        "stage": "generate",
        "name": "Design package",
        "tool": "LLM + CAD / parametric modelling",
        "fulfillment": 70
      },
      {
        "stage": "validate",
        "name": "Permits + inspections",
        "tool": "Human + Regulators / approval bodies",
        "fulfillment": 20
      },
      {
        "stage": "execute",
        "name": "Site build",
        "tool": "Construction robotics (early)",
        "fulfillment": 15
      },
      {
        "stage": "execute",
        "name": "Trades + finishing",
        "tool": "Human",
        "fulfillment": 10
      }
    ]
  },
  {
    "id": "new-drug",
    "name": "New drug",
    "domain": "physical",
    "completeness": 20,
    "ease": 8,
    "humanTouchpoints": 10,
    "aiReadyYear": 2045,
    "steps": [
      {
        "stage": "generate",
        "name": "Candidate discovery",
        "tool": "AI structure prediction (AlphaFold-class)",
        "fulfillment": 70
      },
      {
        "stage": "validate",
        "name": "Clinical trials",
        "tool": "Human + Regulators / approval bodies",
        "fulfillment": 10
      },
      {
        "stage": "execute",
        "name": "Manufacture + approval",
        "tool": "Human + Regulators / approval bodies",
        "fulfillment": 8
      }
    ]
  },
  {
    "id": "car",
    "name": "Car",
    "domain": "physical",
    "completeness": 18,
    "ease": 10,
    "humanTouchpoints": 11,
    "aiReadyYear": 2045,
    "steps": [
      {
        "stage": "generate",
        "name": "Design + engineering",
        "tool": "CAD / parametric modelling + Simulation / CAE",
        "fulfillment": 60
      },
      {
        "stage": "validate",
        "name": "Crash + regulatory",
        "tool": "Human + Regulators / approval bodies",
        "fulfillment": 12
      },
      {
        "stage": "execute",
        "name": "Tooling + assembly line",
        "tool": "Heavy industry / manufacturing",
        "fulfillment": 8
      }
    ]
  },
  {
    "id": "spacecraft",
    "name": "Spacecraft",
    "domain": "physical",
    "completeness": 15,
    "ease": 5,
    "humanTouchpoints": 12,
    "aiReadyYear": 2050,
    "steps": [
      {
        "stage": "generate",
        "name": "Mission + design",
        "tool": "AI-assisted engineering",
        "fulfillment": 60
      },
      {
        "stage": "validate",
        "name": "Qualification testing",
        "tool": "Human",
        "fulfillment": 12
      },
      {
        "stage": "execute",
        "name": "Fabricate + launch",
        "tool": "Human + Heavy industry / manufacturing",
        "fulfillment": 5
      }
    ]
  },
  {
    "id": "skyscraper",
    "name": "Skyscraper",
    "domain": "physical",
    "completeness": 12,
    "ease": 6,
    "humanTouchpoints": 12,
    "aiReadyYear": 2050,
    "steps": [
      {
        "stage": "generate",
        "name": "Design + structure",
        "tool": "LLM + BIM",
        "fulfillment": 55
      },
      {
        "stage": "validate",
        "name": "Permits + engineering sign-off",
        "tool": "Human + Regulators / approval bodies",
        "fulfillment": 12
      },
      {
        "stage": "execute",
        "name": "Construction",
        "tool": "Human + Heavy industry / manufacturing",
        "fulfillment": 6
      }
    ]
  }
];

window.IRS_DATA = { DOMAINS, STAGES, ARTIFACTS };
