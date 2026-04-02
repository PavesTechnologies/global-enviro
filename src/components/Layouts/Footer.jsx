"use client";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="font-sans text-gray-300/80 blur-[0.5px]">

      {/* 🔴 MAIN FOOTER (PURE BLACK) */}
      <div className="bg-black px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

        {/* --- COMPANY INFO --- */}
        <div>
          <img
            src="/assets/images/group-logo.png"
            alt="Global Technologies Logo"
            className="h-14 mb-4 object-contain"
          />

          <p className="text-sm leading-relaxed mb-5 text-gray-200">
            <span className="font-semibold text-white">
              Global Technologies Pvt Ltd
            </span>
            <br />
            Sy. No. 163/A, Gagillapur (Vil),
            <br />
            Dundigal – Gandimaisamma Mandal,
            <br />
            Medchal-Malkajgiri (Dist),
            <br />
            Hyderabad, Telangana
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaPhone className="text-blue-400" />
              +91 98480 31866
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-400" />
              ksr@globalenviro.in
            </li>
          </ul>
        </div>

        {/* --- QUICK NAVIGATION --- */}
        <div>
          <h4 className="text-blue-400 text-lg font-semibold mb-5">
            Quick Navigation
          </h4>

          <ul className="space-y-3 text-sm">
            <li><a href="/about" className="hover:text-blue-400">About Company</a></li>
            <li><a href="/about/management" className="hover:text-blue-400">Leadership Team</a></li>
            <li><a href="/projects-and-products" className="hover:text-blue-400">Projects & Products</a></li>
            <li><a href="/contactUs" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>

        {/* --- OUR SERVICES --- */}
        <div>
          <h4 className="text-blue-400 text-lg font-semibold mb-5">
            Our Services
          </h4>

          <ul className="space-y-3 text-sm">
            <li><a href="/projects-and-products/air-pollution-control" className="hover:text-blue-400">Air Pollution Control Systems</a></li>
            <li><a href="/projects-and-products/hvac-clean-room" className="hover:text-blue-400">HVAC Clean Room Projects</a></li>
            <li><a href="/projects-and-products/material-handling" className="hover:text-blue-400">Material Handling Systems</a></li>
            <li><a href="https://jettech-website-url.com" className="hover:text-blue-400">EPC Power Projects</a></li>
            <li><a href="/Ourgroup/GlobalMetallurgy" className="hover:text-blue-400">Metallurgicals & Briquettes</a></li>
          </ul>

          {/* CONTACT CTA */}
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-4">
              Have a question or want to discuss a project?
            </p>

            <div className="flex items-center gap-4">
              <a
                href="/contactUs"
                className="bg-blue-400 text-black font-semibold px-5 py-2 rounded-full hover:bg-blue-300 transition"
              >
                Contact Us
              </a>

              {/* ✅ FIXED LINKEDIN (NO ERROR) */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-blue-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-white text-base" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🔴 BOTTOM BAR (ALSO BLACK) */}
      <div className="bg-black text-gray-400 py-3 text-sm text-center border-t border-gray-700">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-gray-200 font-medium">
          GLOBAL TECHNOLOGIES PVT LTD
        </span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;