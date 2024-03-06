import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        'stonks-000': '#f5f5f5',
        'stonks-100': '#dddddd',
        'stonks-200': '#c4c4c4',
        'stonks-300': '#acacac',
        'stonks-400': '#939393',
        'stonks-500': '#7b7b7b',
        'stonks-600': '#626262',
        'stonks-700': '#494949',
        'stonks-800': '#313131',
        'stonks-900': '#181818',

        'danger-100': '#E60000',
        
      },
      animation: {
        'spin-fast': 'spin 0.4s linear infinite',
      },

      screens: {
        'xs': '460px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
};
export default config;
