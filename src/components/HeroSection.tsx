"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src="https://yt3.googleusercontent.com/Mpz7KKDOJmf3m9ALAWTCAYB9OZ-ROt4WX609_QaQ2bLBAPZtMAn_jTBgMv_cWcOBkzUcz9Qj=s160-c-k-c0x00ffffff-no-rj"
                  alt="Vittawat Sootawee (Boom)"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Vittawat Sootawee
              <span className="block text-xl sm:text-2xl md:text-3xl text-blue-600 font-normal mt-2">
                (Boom)
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
              AI & Full‑Stack Engineer | Mobile & Cloud Specialist
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 text-xs sm:text-sm md:text-base text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(+66) 65‑xxx‑5665</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>vittawat.soo@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Nakhon Pathom, Thailand</span>
            </div>
          </motion.div>

          {/* Brief Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <p className="text-lg text-gray-800 dark:text-gray-800 leading-relaxed">
              วิศวกรผู้มุ่งเน้นผลลัพธ์ <strong>ประสบการณ์กว่า 4 ปี</strong> ในการออกแบบ สร้าง และส่งมอบผลิตภัณฑ์บนเว็บและมือถือที่ขับเคลื่อนด้วย AI
              มีประสบการณ์ที่พิสูจน์แล้วในการส่งมอบโซลูชันระดับ Production สำหรับตลาดด้านสุขภาพ การศึกษา เทคโนโลยีเพื่อพลเมือง และตลาดผู้บริโภค
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              Get In Touch
            </Link>
            <Link
              href="https://www.youtube.com/@BoomBigNose"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Play size={20} />
              YouTube Channel
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center"
          >
            <Link
              href="#about"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={32} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
