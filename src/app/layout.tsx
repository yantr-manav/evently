import type { Metadata } from "next";
import "./globals.css";
import "./pixel-styles.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { Toaster } from "react-hot-toast";
import { PixelBackground } from "@/components/PixelBackground";

export const metadata: Metadata = {
  title: "🚀 CosmicEvents - Stellar Event Discovery",
  description: "Explore the universe of events! Discover stellar gatherings across the galaxy",
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
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" 
          rel="stylesheet" 
        />

      </head>
      <body className="font-space antialiased bg-cosmic-midnight min-h-screen text-cosmic-stardust overflow-x-hidden">
        <Providers>
          <div className="relative min-h-screen">
            <PixelBackground />
            
            {/* Retro Scanlines Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-20"></div>
            
            {/* Main Content */}
            <div className="relative z-10">
              <Navbar />
              <main className="relative">{children}</main>
              <Chatbot />
            </div>
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#0f0f23',
                  color: '#00ff41',
                  border: '2px solid #00ff41',
                  borderRadius: '0px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '12px',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                },
                success: {
                  iconTheme: {
                    primary: '#39ff14',
                    secondary: '#0f0f23',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff073a',
                    secondary: '#0f0f23',
                  },
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}