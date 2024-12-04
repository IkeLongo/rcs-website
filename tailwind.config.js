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
        'do-custom-gradient': 'linear-gradient(170deg, #292732 50.24%, #3C2F58 153.54%)',
        'mobile-premium-bg': "url('/mobile-premium-bg.svg')",
        'mobile-normal-bg': "url('/mobile-normal-bg.svg')",
        'footer-bg-gradient': 'radial-gradient(127.87% 50% at 50% 50%, rgba(125, 118, 152, 0.50) 0%, rgba(41, 39, 50, 0.50) 100%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluegradient: 'var(--Blue-Gradient, linear-gradient(169deg, #90A6E2 -26.67%, #0096C0 127.92%))',
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
          900: '#231D4F',
        },
        babyblue: {
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
        'gentium-book-plus': ['"Gentium Book Plus"', 'serif'],
        'avenir': ['"Avenir LT Std"', 'sans-serif'],
        'source-sans-pro': ['"Source Sans Pro"', 'sans-serif'],
        'roboto': ['"Roboto"', 'sans-serif'],
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
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'reverse-infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
        'reverse-infinite-scroll': 'reverse-infinite-scroll 20s linear infinite',
      },
    },
  },
  plugins: [],
};
