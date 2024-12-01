/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "url('/Backgrounds.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: {
          200: '#D5FEEE',
          300: '#65EDB7',
          500: '#00CF7D',
          700: '#179865',
        },
        blue: {
          300: '#46C1E3',
          500: '#0096C0',
          700: '#05708E',
        },
        purple: {
          300: '#D0DBFB',
          500: '#7985CC',
          700: '#4054AD',
          800: '#304089',
        },
        baby_blue: {
          300: '#C3EDFF',
          500: '#80D8FE',
          700: '#40BCF2',
        },
        yellow: {
          300: '#FFF4C7',
          500: '#FFE993',
          700: '#CCBD82',
        },
        gray: {
          100: '#',
          200: '#E3EBED',
          300: '#A4A1AE',
          400: '#928F9F',
          500: '#605E67',
          600: '#',
          700: '#4B4952',
          800: '#37363F',
          900: '#292732',
        },
      },
      fontFamily: {
        'maven-pro': ['"Maven Pro"', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
};
