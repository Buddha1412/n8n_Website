"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building, Calendar, MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "EarEssence Co., Ltd.",
      position: "ผู้ก่อตั้ง, AI & Full-Stack Engineer",
      period: "มกราคม 2566 – ปัจจุบัน",
      location: "กรุงเทพฯ, ประเทศไทย",
      type: "เต็มเวลา",
      description: "ออกแบบและส่งมอบโซลูชัน AI, เว็บ, และมือถือแบบ End-to-End สำหรับลูกค้าในกลุ่ม Health-tech, การศึกษา, และ F&B",
      achievements: [
        "ออกแบบสถาปัตยกรรม RAG/CAG และ Fine-tune LLM ภาษาไทย ลดต้นทุนการ Inference ได้ 30%",
        "นำทีมส่งมอบโครงการสำเร็จหลายโครงการสำหรับลูกค้าที่หลากหลาย",
        "สร้างโซลูชันระดับ Production ที่ให้บริการผู้ใช้หลายพันคน",
        "สร้างกระบวนการทำงานและมาตรฐานทางเทคนิคของบริษัท"
      ],
      technologies: ["AI/ML", "React", "Next.js", "Flutter", "FastAPI", "AWS", "Supabase"]
    },
    {
      company: "ห้องปฏิบัติการ Brain Computer Interface, มหาวิทยาลัยมหิดล",
      position: "Research Engineer",
      period: "มิถุนายน 2565 – มกราคม 2568",
      location: "กรุงเทพฯ, ประเทศไทย",
      type: "วิจัย",
      description: "กำกับการวิจัยการเก็บข้อมูล EEG และการประมวลผลเบื้องต้นสำหรับ สสส.",
      achievements: [
        "พัฒนารูปแบบจำลอง CNN และ Transformer สำหรับการจำแนก CT/MRI และ EEG",
        "ช่วยเพิ่ม AUC ในการวินิจฉัยได้ 15% ผ่านสถาปัตยกรรมโมเดลขั้นสูง",
        "จัดการไปป์ไลน์การเก็บข้อมูลและการประมวลผลเบื้องต้นสำหรับงานวิจัย",
        "ร่วมมือกับผู้เชี่ยวชาญทางการแพทย์ในการประยุกต์ใช้ทางคลินิก"
      ],
      technologies: ["PyTorch", "TensorFlow", "CNN", "Transformers", "EEG", "Medical Imaging"]
    }
  ];

  const internships = [
    {
      company: "Ilosta",
      position: "Data Science Intern",
      period: "2023",
      location: "Glasgow, Scotland",
      achievement: "Built AI/ML predictive models that reduced workflow bottlenecks by 18%",
      technologies: ["Python", "Machine Learning", "Data Analysis"]
    },
    {
      company: "Bit.studio",
      position: "iOS Developer Intern",
      period: "2022",
      location: "Bangkok, Thailand",
      achievement: "Delivered real-time image processing mobile application features with Flutter",
      technologies: ["Flutter", "iOS", "Image Processing", "Mobile Development"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ประสบการณ์ทำงาน
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ประสบการณ์กว่า 4 ปีในด้าน AI การพัฒนา Full-stack และการวิจัยในอุตสาหกรรมที่หลากหลาย
          </p>
        </motion.div>

        {/* Main Experience */}
        <div className="space-y-8 lg:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.company}
                    </h3>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {exp.position}
                  </h4>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {exp.type}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {exp.description}
              </p>

              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Key Achievements:
                </h5>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + achIndex * 0.1 }}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies Used:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + techIndex * 0.05 }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Internships */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Internships
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-blue-100 dark:border-gray-600"
              >
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {internship.company}
                  </h4>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  {internship.position}
                </p>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {internship.period}
                  <span className="mx-2">•</span>
                  <MapPin className="w-4 h-4 mr-1" />
                  {internship.location}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {internship.achievement}
                </p>
                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
