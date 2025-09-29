import { NextRequest, NextResponse } from "next/server";
import { createSignatureHeader, generateSessionToken } from "@/lib/webhook-security";

// Portfolio data for the AI to reference
const portfolioData = {
  name: "Vittawat Sootawee (Boom)",
  title: "AI & Full-Stack Engineer | Mobile & Cloud Specialist",
  contact: {
    phone: "(+66) 65-251-5665",
    email: "vittawat.soo@gmail.com",
    address: "274 Phutthamonthon Sai 4 Rd., Nakhon Pathom 73170, Thailand"
  },
  summary: "วิศวกรผู้มุ่งเน้นผลลัพธ์ ประสบการณ์กว่า 4 ปีในการออกแบบ สร้าง และส่งมอบผลิตภัณฑ์บนเว็บและมือถือที่ขับเคลื่อนด้วย AI มีประสบการณ์ที่พิสูจน์แล้วในการส่งมอบโซลูชันระดับ Production สำหรับตลาดด้านสุขภาพ การศึกษา เทคโนโลยีเพื่อพลเมือง และตลาดผู้บริโภค เชี่ยวชาญในการดูแลรับผิดชอบงานแบบ End-to-End ตั้งแต่การระดมความคิดและการ Fine-tuning LLM ไปจนถึงการ Deploy บน Cloud และการ Release บนมือถือ มีความมุ่งมั่นในการแปลงงานวิจัยให้เป็นผลิตภัณฑ์ที่ปรับขนาดได้และช่วยพัฒนาคุณภาพชีวิตประจำวัน",
  skills: {
    languages: ["TypeScript", "JavaScript (ES6+)", "Python", "Dart"],
    frameworks: ["React", "Next.js", "Flutter", "FastAPI", "Astro"],
    ai: ["PyTorch", "TensorFlow", "LLM Fine-tuning (Typhoon, Llama 3.1)", "RAG/CAG pipelines", "Prompt Engineering"],
    cloud: ["AWS", "Supabase", "Runpod", "Docker", "CI/CD (GitHub Actions)", "OpenRouter", "Webhooks", "n8n"],
    databases: ["PostgreSQL/PostGIS", "MongoDB", "Redis"],
    other: ["Embedded ESP32", "Blockchain basics", "Git", "Jira", "MCP"]
  },
  experience: [
    {
      company: "EarEssence Co., Ltd.",
      position: "Founder, AI & Full-Stack Engineer",
      period: "January 2023 – Present",
      location: "Bangkok, Thailand",
      description: "Design and deliver end-to-end AI, web, and mobile solutions for clients in health-tech, education, and F&B sectors. Design RAG/CAG architectures and fine-tune Thai language LLMs, reducing inference costs by 30%."
    }
  ],
  projects: [
    {
      name: "Map Analytics Platform",
      client: "Anunda Co., Ltd. & Xlab",
      year: "2024",
      status: "Completed",
      description: "Built spatial data analytics application on Google Maps JS API for location selection and traffic analysis",
      tech: ["Next.js", "FastAPI", "Google API", "PostgreSQL + Prisma ORM"]
    },
    {
      name: "EduBuddy (MU Chat)",
      client: "Mahidol University",
      year: "2025",
      status: "Completed",
      url: "https://edubuddy.mahidol.ac.th",
      description: "AI assistant chatbot for university education matters",
      note: "Requires MU WIFI IP for access"
    },
    {
      name: "AI Agents Course Platform",
      client: "Mahidol University",
      status: "In Progress",
      description: "Developing platform for professors to create and manage university AI Agents courses"
    },
    {
      name: "CRA Landing Page Website",
      client: "Chulabhorn Royal Academy",
      status: "In Progress",
      description: "High-performance marketing website built with Next.js App Router; targeting Lighthouse 95+ in all metrics"
    },
    {
      name: "Salayte Hashery Mobile App",
      platforms: "iOS (under maintenance) & Android (completed)",
      description: "Food ordering and loyalty points app built with Flutter; achieved 5.0-star average rating. Integrated backend with Supabase and Headless CMS; automated CI/CD system via GitHub Actions and TestFlight"
    }
  ],
  education: [
    {
      degree: "MSc Entrepreneurship & Innovation (Onsite)",
      school: "University of Edinburgh",
      period: "2025 – Present (Expected graduation 2026)"
    },
    {
      degree: "B.Eng. Biomedical Engineering, First Class Honours",
      school: "Mahidol University",
      period: "2020 – 2024",
      gpa: "3.57",
      thesis: "Classification of calcified plaque and stenosis from CTCA images on cloud system using AWS",
      scholarships: ["AWS Scholarship (US$ 3,400)", "TEDFUND (US$ 45,000)"]
    }
  ],
  internships: [
    {
      company: "Ilosta",
      position: "Data Science Intern",
      location: "Glasgow",
      year: "2023",
      achievement: "Built AI/ML predictive models that reduced workflow bottlenecks by 18%"
    },
    {
      company: "Bit.studio",
      position: "iOS Developer Intern",
      location: "Bangkok",
      year: "2022",
      achievement: "Delivered real-time image processing mobile application features with Flutter"
    }
  ],
  certifications: [
    "Google Data Analytics Specialization (Coursera)",
    "TryHackMe: Security Principles, Identity Management, Network Architecture"
  ]
};

export async function POST(request: NextRequest) {
  let userMessage = "";
  let sessionId = "";

  try {
    const { message, history, sessionId: clientSessionId } = await request.json();
    userMessage = message || "";
    sessionId = clientSessionId || `session_${Date.now()}`;

    if (!userMessage) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log(`[Chat API] Session: ${sessionId}, Message: ${userMessage.substring(0, 50)}...`);

    // Try to send to n8n webhook first
    try {
      const payload = JSON.stringify({
        message: userMessage,
        history,
        portfolioData,
        sessionId,
        responseUrl: `https://cb5c-223-206-189-83.ngrok-free.app/api/webhook`,
        sessionToken: generateSessionToken(sessionId),
        timestamp: new Date().toISOString()
      });

      const signature = createSignatureHeader(payload);

      const webhookResponse = await fetch("http://localhost:5678/webhook/b19050d0-97ef-4a68-986d-f5575059afdc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId,
          "x-webhook-source": "portfolio-chat",
          "x-signature": signature,
        },
        body: payload,
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });

      if (webhookResponse.ok) {
        const webhookData = await webhookResponse.json();
        console.log(`[Chat API] Webhook success for session ${sessionId}:`, webhookData);

        // Check if n8n will send response via webhook (async mode)
        if (webhookData.useSSE || webhookData.async || webhookData.status === 'processing' ||
            (webhookData.message && webhookData.message.includes('Workflow was started'))) {
          console.log(`[Chat API] Using SSE mode for session ${sessionId} - n8n will send response later`);
          return NextResponse.json({
            success: true,
            useSSE: true,
            sessionId,
            message: "Response will be sent via real-time connection"
          });
        }

        // Handle immediate response formats
        let responseMessage = "";
        if (typeof webhookData === 'string') {
          responseMessage = webhookData;
        } else if (webhookData.response) {
          responseMessage = webhookData.response;
        } else if (webhookData.message) {
          responseMessage = webhookData.message;
        } else if (webhookData.reply) {
          responseMessage = webhookData.reply;
        } else if (webhookData.text) {
          responseMessage = webhookData.text;
        } else {
          // If webhook returns unexpected format, log it and use fallback
          console.log(`[Chat API] Unexpected webhook response format:`, webhookData);
          console.log(`[Chat API] Using fallback response for session ${sessionId}`);
          throw new Error("Unexpected webhook response format");
        }

        console.log(`[Chat API] Immediate response for session ${sessionId}:`, responseMessage);
        return NextResponse.json({ message: responseMessage, useSSE: false });
      } else {
        const errorText = await webhookResponse.text();
        console.log(`[Chat API] Webhook error ${webhookResponse.status}:`, errorText);
        throw new Error(`Webhook returned status: ${webhookResponse.status}`);
      }
    } catch (webhookError) {
      console.log(`[Chat API] Webhook failed for session ${sessionId}, using fallback:`, webhookError);
      // Fallback to local response if webhook fails
      const response = generateResponse(userMessage.toLowerCase());
      console.log(`[Chat API] Fallback response for session ${sessionId}:`, response.substring(0, 100) + "...");
      return NextResponse.json({
        message: response,
        useSSE: false,
        fallback: true
      });
    }
  } catch (error) {
    console.error(`[Chat API] Final error for session ${sessionId}:`, error);
    // Final fallback
    const response = generateResponse(userMessage.toLowerCase() || "");
    console.log(`[Chat API] Final fallback response for session ${sessionId}:`, response.substring(0, 100) + "...");
    return NextResponse.json({
      message: response,
      useSSE: false,
      fallback: true,
      error: "System temporarily unavailable"
    });
  }
}

function generateResponse(message: string): string {
  // Skills-related queries
  if (message.includes("skill") || message.includes("technology") || message.includes("programming")) {
    return `Boom has extensive technical skills including:

**Languages & Frameworks:** ${portfolioData.skills.languages.join(", ")}, ${portfolioData.skills.frameworks.join(", ")}

**AI & ML:** ${portfolioData.skills.ai.join(", ")}

**Cloud & DevOps:** ${portfolioData.skills.cloud.join(", ")}

**Databases:** ${portfolioData.skills.databases.join(", ")}

He's particularly strong in AI/ML, full-stack development, and cloud technologies!`;
  }

  // Experience-related queries
  if (message.includes("experience") || message.includes("work") || message.includes("job")) {
    return `Boom is currently the Founder and AI & Full-Stack Engineer at EarEssence Co., Ltd. since January 2023. He designs and delivers end-to-end AI, web, and mobile solutions for clients in health-tech, education, and F&B sectors.

He has also worked as a Research Engineer at the Brain Computer Interface Lab at Mahidol University (June 2022 – January 2025), where he supervised EEG data collection and developed CNN and Transformer models for CT/MRI and EEG classification.

He has 4+ years of experience in total, with proven expertise in delivering production-level solutions.`;
  }

  // Projects-related queries
  if (message.includes("project") || message.includes("portfolio") || message.includes("work")) {
    return `Boom has worked on several impressive projects:

🗺️ **Map Analytics Platform** (2024) - Spatial data analytics on Google Maps for Anunda Co., Ltd. & Xlab

🤖 **EduBuddy (MU Chat)** (2025) - AI chatbot for Mahidol University education

📱 **Salayte Hashery App** - Food ordering app with 5.0-star rating, built with Flutter

🎓 **AI Agents Course Platform** - Currently developing for Mahidol University

🌐 **CRA Landing Page** - High-performance website targeting Lighthouse 95+ scores

Each project showcases his expertise in AI, full-stack development, and mobile technologies!`;
  }

  // Education-related queries
  if (message.includes("education") || message.includes("study") || message.includes("university") || message.includes("degree")) {
    return `Boom's educational background:

🎓 **Currently pursuing:** MSc Entrepreneurship & Innovation at University of Edinburgh (2025-2026)

🎓 **Completed:** B.Eng. Biomedical Engineering, First Class Honours from Mahidol University (2020-2024)
- GPA: 3.57
- Thesis: Classification of calcified plaque and stenosis from CTCA images using AWS
- Scholarships: AWS Scholarship (US$ 3,400) and TEDFUND (US$ 45,000)

He also has certifications in Google Data Analytics and TryHackMe security courses.`;
  }

  // Contact-related queries
  if (message.includes("contact") || message.includes("email") || message.includes("phone") || message.includes("reach")) {
    return `You can contact Boom through:

📧 **Email:** ${portfolioData.contact.email}
📱 **Phone:** ${portfolioData.contact.phone}
📍 **Location:** ${portfolioData.contact.address}

He's always open to discussing new opportunities, collaborations, or just having a chat about technology!`;
  }

  // AI/ML specific queries
  if (message.includes("ai") || message.includes("machine learning") || message.includes("llm") || message.includes("artificial intelligence")) {
    return `Boom is highly skilled in AI and Machine Learning! He has experience with:

🧠 **Frameworks:** PyTorch, TensorFlow
🤖 **LLM Fine-tuning:** Typhoon, Llama 3.1 models
🔍 **RAG/CAG Pipelines:** Advanced retrieval and generation systems
✍️ **Prompt Engineering:** Optimizing AI model interactions

He's successfully reduced inference costs by 30% through LLM fine-tuning and has built production AI systems for various clients. His work includes everything from chatbots to predictive models!`;
  }

  // General greeting or introduction
  if (message.includes("hello") || message.includes("hi") || message.includes("สวัสดี") || message.includes("who") || message.includes("about") || message.includes("เกี่ยวกับ")) {
    return `สวัสดีครับ! ผมเป็น AI ผู้ช่วยของบูม (วิทวัส สุตาวี) 👋

${portfolioData.summary}

คุณสามารถถามเกี่ยวกับ:
• 💻 ทักษะทางเทคนิคและความเชี่ยวชาญ
• 🏢 ประสบการณ์การทำงานและโครงการ
• 🎓 การศึกษาและใบรับรอง
• 📞 ข้อมูลการติดต่อ
• 🤖 ความเชี่ยวชาญด้าน AI/ML

อยากทราบเรื่องอะไรเพิ่มเติมครับ?`;
  }

  // Thai language queries
  if (message.includes("ทักษะ") || message.includes("เทคโนโลยี") || message.includes("โปรแกรม")) {
    return `บูมมีทักษะทางเทคนิคที่หลากหลายครับ:

**ภาษาและเฟรมเวิร์ก:** ${portfolioData.skills.languages.join(", ")}, ${portfolioData.skills.frameworks.join(", ")}

**AI และ ML:** ${portfolioData.skills.ai.join(", ")}

**Cloud และ DevOps:** ${portfolioData.skills.cloud.join(", ")}

**ฐานข้อมูล:** ${portfolioData.skills.databases.join(", ")}

เขาเก่งเป็นพิเศษในด้าน AI/ML, การพัฒนา full-stack และเทคโนโลยี cloud ครับ!`;
  }

  // Default response
  return `คำถามที่น่าสนใจครับ! ผมยินดีช่วยให้คุณรู้จักบูมมากขึ้น คุณสามารถถามเกี่ยวกับ:

• ทักษะทางเทคนิคและความเชี่ยวชาญในการเขียนโปรแกรม
• ประสบการณ์การทำงานและพื้นฐานทางวิชาชีพ
• โครงการล่าสุดและผลงาน
• พื้นฐานการศึกษาและใบรับรอง
• ข้อมูลการติดต่อ
• ความเชี่ยวชาญด้าน AI และ machine learning

อยากทราบด้านไหนเป็นพิเศษครับ?`;
}
