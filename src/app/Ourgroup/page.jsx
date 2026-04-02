"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const companies = [
  {
    id: 1,
    name: "Global Enviro Air Systems (P) Ltd",
    description:
      "Global Enviro Air Systems Private Limited is a distinguished designer and manufacturer specializing in a diverse range of air pollution control systems. Our systems are meticulously crafted to reduce or eliminate the emission of pollutants into the atmosphere. Additionally, we serve as turnkey solution providers for HVAC Cleanrooms projects, offering a comprehensive range of solutions such as air handling units, Puff Panels, Doors, and Dust collectors tailored for manufacturing areas. We extend our expertise to provide solutions for cement/fly ash unloading systems from silos and racks. Our systems cater to various industries, including cement, power, steel, pharmaceuticals, paper, distilleries, food, and scientific industries.",
    image: "/assets/images/global image.jpg",
    shape: "rounded-full",
    link: "/about",
  },
  {
    id: 2,
    name: "Indophil Jettech Energy Private Limited",
    description:
      "Indophil Jettech Energy Pvt. Ltd. is a leading player in Engineering, Procurement, and Construction (EPC) services for Biomass Power Plants, Solar Power Plants, Edible Oil Refineries, and Process Boilers. As a rapidly growing entity in the Philippines Energy Sector, our portfolio boasts over 55 MW (Biomass Power Plants) capacity and 15 MW (Solar Power Plants).",
    image: "/assets/images/jettech.jpg",
    shape: "rounded-full",
    link: "https://www.jettechenergy.com/",
  },
  {
    id: 3,
    name: "Global Metallurgicals",
    description:
      "The company specialises in manufacturing Manganese Steel Castings and Hi-Chrome Castings. Cast iron items mainly include Rotary Airlock Valves, Dust Collector Cones, Bearing Housings, Liners, and Beaters, hammers for crushers with induction furnace capacity of 500 kgs, Heat Treatment facility, and in-house machining.",
    image: "/assets/images/metallurgy.jpg",
    shape: "rounded-full",
    link: "/Ourgroup/GlobalMetallurgy",
  },
  {
    id: 4,
    name: "SV Bio Fuels",
    description:
      "SV Bio Fuels focuses on sustainable and eco-friendly fuel solutions, specializing in biomass briquettes and renewable energy alternatives. The company aims to provide efficient fuel systems that reduce environmental impact while supporting industrial energy needs.",
    image: "/assets/images/ash handling.png", 
    shape: "rounded-full",
    link: "/Ourgroup/SVBioFuels", 
  }, 
];

export default function GroupPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900 font-inter">
      
      {/* 🔹 BANNER SECTION */}
      <section className="relative bg-gradient-to-r from-blue-100 to-blue-50 pb-20">
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

        <div className="relative container mx-auto px-6 pt-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-blue-900 tracking-wide"
          >
            Our Group of Companies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto"
          >
            A collective of innovation and engineering excellence driving industrial solutions worldwide.
          </motion.p>
        </div>
      </section>

      {/* 🔹 COMPANY SECTIONS */}
      <div className="max-w-6xl mx-auto px-8 py-16 space-y-20">
        {companies.map((company, index) => (
          <div
            key={company.id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-10`}
          >
            {/* Text Section */}
            <div className="md:w-1/2 space-y-5">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0f172a]">
                {company.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                {company.description}
              </p>
              <Link
                href={company.link}
                target="_blank"
                className="inline-block mt-3 bg-[#0284c7] text-white px-5 py-2 rounded-md hover:bg-[#0369a1] transition"
              >
                View More
              </Link>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 flex justify-center">
              <div
                className={`overflow-hidden w-[360px] h-[360px] shadow-lg border border-gray-200 ${
                  company.shape
                }`}
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional custom clip-paths (if needed later) */}
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
          border-radius: 1rem;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 10%, 90% 100%, 0% 90%);
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}
