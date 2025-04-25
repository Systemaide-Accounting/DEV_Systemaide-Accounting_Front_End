/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import scrollbar from 'tailwind-scrollbar';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      // Define NewGen colors
      colors: {
        newgen: {
          lightBlue: '#E6F0FA', // Background (active nav, matches image)
          darkBlue: '#1E3A8A',  // Primary actions (buttons, headings)
          red: '#EF4444',       // Destructive actions
          green: '#10B981',     // Positive indicators
          gray: '#6B7280',      // Secondary text/icons
          white: '#feffff',     // Fixed typo (##feffff → #feffff)
          navText: '#4a4a4a',   // Inactive text (from image)
          navActiveText: '#0055ff', // Active text (from image)
          navHoverBg: '#e5e5e5', // Hover background (from image)
        },
      },
      // Set Inter as the default font, keep Poppins as an option
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Primary font from image
        poppins: ['Poppins', 'sans-serif'], // Secondary font from your original config
      },
      // Extend spacing for generous padding/margins
      spacing: {
        '10': '2.5rem', // For larger spacing as seen in NewGen
      },
      // Extend border radius for rounded corners
      borderRadius: {
        'xl': '1rem', // Matches NewGen's rounded buttons and cards
        '2xl': '1.5rem',
      },
      // Extend box shadow for subtle card effects
      boxShadow: {
        'newgen': '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards/buttons
      },
      // Add custom animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    scrollbar({ nocompatible: true }),
  ],
};