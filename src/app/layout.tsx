import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "(BoomBigNose) - AI & Full-Stack Engineer",
  description: "Portfolio of Vittawat Sootawee, AI & Full-Stack Engineer specializing in mobile and cloud technologies with 4+ years of experience.",
  keywords: "AI Engineer, Full-Stack Developer, Mobile Development, Cloud Computing, Machine Learning, React, Next.js, Flutter, Python",
  authors: [{ name: "Vittawat Sootawee" }],
  openGraph: {
    title: "Vittawat Sootawee (Boom) - AI & Full-Stack Engineer",
    description: "Portfolio of Vittawat Sootawee, AI & Full-Stack Engineer specializing in mobile and cloud technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
