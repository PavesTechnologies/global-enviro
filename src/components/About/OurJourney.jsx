"use client";
import { motion } from "framer-motion";
import { FaFlag, FaWind, FaIndustry, FaBolt } from "react-icons/fa";

export default function OurJourney() {
  const milestones = [
    {
      year: "1999",
      title: "The Beginning",
      description:
        "Global Enviro Air Systems Pvt. Ltd. was established with a clear vision — to deliver world-class air pollution control systems and create a cleaner, healthier industrial environment.",
      icon: <FaFlag className="text-white text-lg" />,
    },
    {
      year: "2003",
      title: "HVAC Division Added",
      description:
        "Expanded capabilities by introducing HVAC Clean Room systems, enabling the company to serve the pharmaceutical and chemical sectors with precision-controlled environments.",
      icon: <FaWind className="text-white text-lg" />,
    },
    {
      year: "2008",
      title: "Material Handling Systems",
      description:
        "Launched a dedicated Material Handling division covering fuel handling, ash handling, and warehouse systems — strengthening our full-spectrum industrial offering.",
      icon: <FaIndustry className="text-white text-lg" />,
    },
    {
      year: "2020",
      title: "Indophil Jettech Energy Pvt. Ltd.",
      description:
        "Established Indophil Jettech Energy Pvt. Ltd., extending the group's expertise into EPC power projects and marking a major milestone in our diversification journey.",
      icon: <FaBolt className="text-white text-lg" />,
    },
  ];

  return (
    <div className="bg-[#1F3A70] py-20 px-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-16 text-white text-center"
      >
        Our Journey
      </motion.h1>

      {/* Timeline Wrapper */}
      <div className="relative max-w-4xl w-full mx-auto">

        {/* 🔥 Animated Line */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute left-[20px] top-0 w-[2px] bg-white/70 origin-top"
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative">

              {/* 🔵 Circle ON LINE */}
              <div className="absolute left-[20px] -translate-x-1/2 w-9 h-9 flex items-center justify-center bg-blue-600 rounded-full border-2 border-white shadow-md z-10">
                {milestone.icon}
              </div>

              {/* 🟦 CARD */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="ml-16 bg-white/15 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-white"
              >
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wide">
                  {milestone.year}
                </span>

                <h2 className="text-xl font-semibold text-white mt-1 mb-2">
                  {milestone.title}
                </h2>

                <p className="text-sm text-blue-100 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 text-center max-w-2xl mx-auto"
      >
        <p className="text-base italic text-blue-100">
          "Every milestone we cross strengthens our commitment to building a sustainable world for generations to come."
        </p>
      </motion.div>
    </div>
  );
}