"use client";

import { motion } from "framer-motion";

export default function AboutBanner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-110 to-blue-50 pb-20">
      {/* SVG Curve */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#f9fafb"
          d="M0,32 C360,100 1080,0 1440,80 L1440,120 L0,120 Z"
        />
      </svg>

      {/* Banner Text */}
      <div className="relative container mx-auto px-6 pt-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-blue-900 tracking-wide"
        >
          ABOUT US
        </motion.h1>
      </div>
    </section>
  );
}
