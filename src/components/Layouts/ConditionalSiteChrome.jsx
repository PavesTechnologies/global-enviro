"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";

export default function ConditionalSiteChrome({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
