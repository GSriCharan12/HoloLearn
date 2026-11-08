import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HoloLearn — Immersive 3D Educational Learning Platform",
  description:
    "Master STEM subjects through interactive 3D WebGL models, anatomical dissections, planetary mechanics, and quantum simulations.",
  keywords: [
    "3D Education",
    "WebGL",
    "React Three Fiber",
    "Three.js",
    "Anatomy 3D",
    "Space Mechanics",
    "Quantum Simulation",
    "STEM Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#171717] text-[#EDEDED] antialiased selection:bg-[#A31C1B]/35 selection:text-white">
        {children}
      </body>
    </html>
  );
}
