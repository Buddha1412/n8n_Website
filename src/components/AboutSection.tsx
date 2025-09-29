"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Smartphone, Cloud, Award, Users, AArrowUp} from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Expert in LLM fine-tuning, RAG/CAG pipelines, and reducing inference costs by 30%"
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in React, Next.js, Flutter, FastAPI with end-to-end project ownership"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Built award-winning mobile apps with 5.0-star ratings using Flutter"
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS certified with experience in Supabase, Docker, and CI/CD pipelines"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Delivered production solutions for health-tech, education, and consumer markets"
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Founded EarEssence Co., Ltd. and led multiple successful project deliveries"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            เกี่ยวกับฉัน
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            มีความมุ่งมั่นในการแปลงงานวิจัยให้เป็นผลิตภัณฑ์ที่ปรับขนาดได้และช่วยพัฒนาคุณภาพชีวิตประจำวัน
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              เส้นทางการทำงาน
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                ด้วยประสบการณ์กว่า 4 ปีในอุตสาหกรรมเทคโนโลยี ผมได้อุทิศอาชีพในการเชื่อมโยงงานวิจัย AI ที่ล้ำสมัย
                กับโซลูชันที่ใช้งานได้จริงและปรับขนาดได้ การเดินทางของผมเริ่มต้นจากวิศวกรรมชีวการแพทย์
                ซึ่งทำให้ผมเข้าใจลึกซึ้งว่าเทคโนโลยีสามารถส่งผลกระทบต่อชีวิตมนุษย์ได้อย่างไร
              </p>
              <p>
                ในฐานะผู้ก่อตั้ง EarEssence Co., Ltd. ผมได้มีโอกาสทำงานกับลูกค้าที่หลากหลาย
                ในกลุ่ม Health-tech การศึกษา และตลาดผู้บริโภค ความเชี่ยวชาญของผมครอบคลุมวงจรการพัฒนาทั้งหมด
                ตั้งแต่การระดมความคิดและการ Fine-tuning โมเดล AI ไปจนถึงการ Deploy บน Cloud และการ Release บนมือถือ
              </p>
              <p>
                ปัจจุบันผมกำลังศึกษาต่อระดับปริญญาโท MSc Entrepreneurship & Innovation ที่ University of Edinburgh
                และมุ่งมั่นที่จะสำรวจวิธีการใหม่ๆ ในการแปลงไอเดียที่นวัตกรรมให้เป็นผลิตภัณฑ์ที่สร้างความแตกต่างในชีวิตประจำวัน
              </p>
              <p>
                สิ่งที่ขับเคลื่อนผมมากที่สุดคือโอกาสในการทำงานที่จุดตัดของ AI การพัฒนา Full-stack
                และเทคโนโลยีมือถือ เพื่อสร้างโซลูชันที่ไม่เพียงแต่น่าประทับใจทางเทคนิค แต่ยังมีประโยชน์และเข้าถึงได้จริง
              </p>
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-4 lg:p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                    <highlight.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {highlight.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4+</div>
            <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
            <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">30%</div>
            <div className="text-gray-600 dark:text-gray-300">Cost Reduction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5.0★</div>
            <div className="text-gray-600 dark:text-gray-300">App Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
