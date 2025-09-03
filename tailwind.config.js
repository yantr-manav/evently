/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'pixel': ['Courier New', 'monospace'],
          'mono': ['Courier New', 'monospace'],
          'sans': ['Courier New', 'monospace'],
        },
        colors: {
          pixel: {
            bg: '#0f0f23',
            primary: '#00ff41',
            secondary: '#ff6b35',
            accent: '#7209b7',
            warning: '#ffcc02',
            error: '#ff073a',
            success: '#39ff14',
            blue: '#00d4ff',
            purple: '#bf00ff',
            pink: '#ff1493',
            cyan: '#00ffff',
            yellow: '#ffff00',
            orange: '#ff8c00',
            red: '#ff0040',
            green: '#00ff00',
          }
        },
        animation: {
          'pixel-bounce': 'pixelBounce 0.6s ease-in-out',
          'pixel-shake': 'pixelShake 0.5s ease-in-out',
          'pixel-glow': 'pixelGlow 2s ease-in-out infinite alternate',
          'pixel-float': 'pixelFloat 3s ease-in-out infinite',
          'pixel-slide-in': 'pixelSlideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          'pixel-zoom': 'pixelZoom 0.3s ease-out',
          'pixel-rotate': 'pixelRotate 0.5s ease-in-out',
          'pixel-pulse': 'pixelPulse 1.5s ease-in-out infinite',
          'pixel-typewriter': 'pixelTypewriter 3s steps(40) infinite',
          'pixel-scan': 'pixelScan 2s linear infinite',
          'pixel-glitch': 'pixelGlitch 0.3s ease-in-out infinite',
          'retro-blink': 'retroBlink 1s step-end infinite',
        },
        keyframes: {
          pixelBounce: {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(-10px) scale(1.05)' },
          },
          pixelShake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
          },
          pixelGlow: {
            '0%': { 
              boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
              filter: 'brightness(1)'
            },
            '100%': { 
              boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
              filter: 'brightness(1.2)'
            },
          },
          pixelFloat: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '33%': { transform: 'translateY(-10px) rotate(1deg)' },
            '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
          },
          pixelSlideIn: {
            '0%': { transform: 'translateX(-100%) scale(0.8)', opacity: '0' },
            '100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
          },
          pixelZoom: {
            '0%': { transform: 'scale(0.8)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
          pixelRotate: {
            '0%': { transform: 'rotate(0deg) scale(1)' },
            '50%': { transform: 'rotate(180deg) scale(1.1)' },
            '100%': { transform: 'rotate(360deg) scale(1)' },
          },
          pixelPulse: {
            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
            '50%': { opacity: '0.7', transform: 'scale(0.95)' },
          },
          pixelTypewriter: {
            '0%': { width: '0' },
            '50%': { width: '100%' },
            '100%': { width: '0' },
          },
          pixelScan: {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100vh)' },
          },
          pixelGlitch: {
            '0%, 100%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-2px, 2px)' },
            '40%': { transform: 'translate(-2px, -2px)' },
            '60%': { transform: 'translate(2px, 2px)' },
            '80%': { transform: 'translate(2px, -2px)' },
          },
          retroBlink: {
            '0%, 50%': { opacity: '1' },
            '51%, 100%': { opacity: '0' },
          },
        },
        backgroundImage: {
          'pixel-grid': `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          'pixel-stars': `
            radial-gradient(2px 2px at 20px 30px, #00ff41, transparent),
            radial-gradient(2px 2px at 40px 70px, #ff6b35, transparent),
            radial-gradient(1px 1px at 90px 40px, #00d4ff, transparent),
            radial-gradient(1px 1px at 130px 80px, #bf00ff, transparent),
            radial-gradient(2px 2px at 160px 30px, #ffcc02, transparent)
          `,
        },
        backgroundSize: {
          'pixel-grid': '20px 20px',
          'pixel-stars': '200px 100px',
        },
        dropShadow: {
          'pixel': '2px 2px 0px rgba(0, 0, 0, 0.8)',
          'pixel-glow': '0 0 10px currentColor',
        },
      },
    },
    plugins: [],
  }