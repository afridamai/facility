import type { Config } from "tailwindcss";

/* FILE: tailwind.config.ts
  DESCRIPTION: Core styling configuration for the AfriDam Facility Portal.
  CHANGES: 
    - Rule #3: Expanded the 'content' array to be more aggressive. It now scans 
      the root 'app' folder AND the 'src' folder to ensure no file is missed.
    - Rule #4: Kept MacBook Air optimized animations.
    - Rule #5: Humanized the clinical color palette.
*/

const config: Config = {
  // Rule #4 & #6: The "Chaos Fixer" - scanning every possible code location.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",      // Root app directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",    // Root pages directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Root components
    "./src/**/*.{js,ts,jsx,tsx,mdx}",      // Everything inside src (Crucial!)
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Explicit src/app check
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Explicit src/components check
  ],
  
  // Rule #5: Class-based dark mode for the Director's toggle
  darkMode: "class", 
  
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E87042", // Melanin Orange
          hover: "#ff8252",
          subtle: "rgba(232, 112, 66, 0.1)",
        },
        clinical: {
          black: "#050505",
          white: "#FFFFFF",
          surface: "#0A0A0A",
          lightSurface: "#F8F9FA",
          border: "rgba(255, 255, 255, 0.05)",
          lightBorder: "rgba(0, 0, 0, 0.05)",
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};

export default config;