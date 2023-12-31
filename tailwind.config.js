/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1400px',
      '3xl': '1520px',
    },
    extend: {
      colors: {
        darkGray: "#1A1A1A",
        spaceGray: "#262627",
        'basic-gray': '#3C3C3D',
        'subtle-gray': '#6D6D6E',
        lightGray: "#BCBCBC", 
      },
      fontSize: {
        '3xl': '1.75rem'
      },
      transitionProperty: {
        'width': 'width',
      },
      flexGrow: {
        2: '2',
        3: '3',
      },
      flexShrink: {
        2: '2',
        3: '3',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      scale: {
        80: '.8',
      }
    },
  },
  plugins: [],
}
