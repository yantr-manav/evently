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
          'space': ['Orbitron', 'monospace'],
          'mono': ['JetBrains Mono', 'monospace'],
          'sans': ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          cosmic: {
            midnight: '#1a0b2e',
            purple: '#16213e',
            blue: '#0f3460',
            starry: '#e94560',
            magenta: '#f39c12',
            nebula: '#533483',
            void: '#0a0a0a',
            plasma: '#00d4ff',
            aurora: '#7209b7',
            comet: '#ff6b35',
            galaxy: '#2d1b69',
            stardust: '#ffffff',
          }
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
          'drift': 'drift 20s linear infinite',
          'twinkle': 'twinkle 3s ease-in-out infinite',
          'orbit': 'orbit 15s linear infinite',
          'nebula': 'nebula 8s ease-in-out infinite',
          'warp': 'warp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          'constellation': 'constellation 4s ease-in-out infinite',
          'cosmic-pulse': 'cosmicPulse 3s ease-in-out infinite',
          'starfield': 'starfield 50s linear infinite',
          'parallax-slow': 'parallaxSlow 60s linear infinite',
          'parallax-fast': 'parallaxFast 30s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '33%': { transform: 'translateY(-20px) rotate(1deg)' },
            '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
          },
          pulseGlow: {
            '0%': { 
              boxShadow: '0 0 20px rgba(233, 69, 96, 0.5), 0 0 40px rgba(233, 69, 96, 0.3)',
              filter: 'brightness(1)'
            },
            '100%': { 
              boxShadow: '0 0 30px rgba(233, 69, 96, 0.8), 0 0 60px rgba(233, 69, 96, 0.5)',
              filter: 'brightness(1.2)'
            },
          },
          drift: {
            '0%': { transform: 'translateX(-100vw) translateY(0px)' },
            '100%': { transform: 'translateX(100vw) translateY(-50px)' },
          },
          twinkle: {
            '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
            '50%': { opacity: '1', transform: 'scale(1.2)' },
          },
          orbit: {
            '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
            '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
          },
          nebula: {
            '0%, 100%': { 
              background: 'radial-gradient(circle, rgba(114, 9, 183, 0.3) 0%, rgba(26, 11, 46, 0.1) 70%)',
              transform: 'scale(1) rotate(0deg)'
            },
            '50%': { 
              background: 'radial-gradient(circle, rgba(233, 69, 96, 0.4) 0%, rgba(15, 52, 96, 0.2) 70%)',
              transform: 'scale(1.1) rotate(180deg)'
            },
          },
          warp: {
            '0%': { transform: 'scale(0.8) rotateY(-90deg)', opacity: '0' },
            '50%': { transform: 'scale(1.05) rotateY(0deg)', opacity: '0.8' },
            '100%': { transform: 'scale(1) rotateY(0deg)', opacity: '1' },
          },
          constellation: {
            '0%, 100%': { 
              transform: 'translateY(0px)',
              filter: 'brightness(1) hue-rotate(0deg)'
            },
            '25%': { 
              transform: 'translateY(-15px)',
              filter: 'brightness(1.2) hue-rotate(90deg)'
            },
            '75%': { 
              transform: 'translateY(-5px)',
              filter: 'brightness(0.8) hue-rotate(270deg)'
            },
          },
          cosmicPulse: {
            '0%, 100%': { 
              boxShadow: '0 0 0 0 rgba(233, 69, 96, 0.7)',
              transform: 'scale(1)'
            },
            '50%': { 
              boxShadow: '0 0 0 20px rgba(233, 69, 96, 0)',
              transform: 'scale(1.05)'
            },
          },
          starfield: {
            '0%': { transform: 'translateY(0px)' },
            '100%': { transform: 'translateY(-2000px)' },
          },
          parallaxSlow: {
            '0%': { transform: 'translateY(0px) translateX(0px)' },
            '100%': { transform: 'translateY(-1000px) translateX(-200px)' },
          },
          parallaxFast: {
            '0%': { transform: 'translateY(0px) translateX(0px)' },
            '100%': { transform: 'translateY(-2000px) translateX(300px)' },
          },
        },
        backgroundImage: {
          'cosmic-gradient': 'linear-gradient(135deg, #1a0b2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #2d1b69 100%)',
          'nebula-gradient': 'radial-gradient(ellipse at center, rgba(114, 9, 183, 0.3) 0%, rgba(233, 69, 96, 0.2) 50%, transparent 100%)',
          'starfield': `
            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #e94560, transparent),
            radial-gradient(1px 1px at 90px 40px, #00d4ff, transparent),
            radial-gradient(1px 1px at 130px 80px, #7209b7, transparent),
            radial-gradient(2px 2px at 160px 30px, #f39c12, transparent)
          `,
        },
        backgroundSize: {
          'starfield': '200px 100px',
        },
        dropShadow: {
          'cosmic': '0 0 20px rgba(233, 69, 96, 0.5)',
          'nebula': '0 0 30px rgba(114, 9, 183, 0.6)',
        },
      },
    },
    plugins: [],
  }