import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "EventFlow - Discover Amazing Events",
  description: "Connect, discover, and attend incredible events in your city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <Providers>
          <div className="relative">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(156,146,172,0.15) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            <Navbar />
            <main className="relative z-10">{children}</main>
            <Chatbot />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f2937',
                  color: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #374151',
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}