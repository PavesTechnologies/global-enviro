import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalSiteChrome from "@/components/Layouts/ConditionalSiteChrome";
import AppProviders from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Global Enviro",
  description: "Golbal enviro landing page",
  icons: {
    icon: "/assets/images/global_enviro_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
        </AppProviders>
      </body>
    </html>
  );
}
