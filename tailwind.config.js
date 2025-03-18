const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "url('/Backgrounds.svg')",
        'team-pattern': "url('/team-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
        'do-custom-gradient': 'linear-gradient(170deg, #292732 50.24%, #3C2F58 153.54%)',
        'mobile-premium-bg': "url('/mobile-premium-bg.svg')",
        'mobile-normal-bg': "url('/mobile-normal-bg.svg')",
        'footer-bg-gradient': 'radial-gradient(127.87% 50% at 50% 50%, rgba(125, 118, 152, 0.50) 0%, rgba(41, 39, 50, 0.50) 100%)',
        'footer-bg-gradient-solid': 'radial-gradient(127.87% 50% at 50% 50%, rgba(125, 118, 152, 1) 0%, rgba(41, 39, 50, 1) 100%)',
        'services-hero-bg': 'radial-gradient(74.54% 51.35% at 2.82% -13.69%, #AFA8A8 0%, #292732 100%)',
        'service-hero-blob': "url('/service-hero-background-blob.svg')",
        'service-hero-blob-desktop': "url('/service-hero-blob-desktop.svg')",
        'service-mobile-webdev-bg': "url('/service-webdev-mobile-bg.png')",
        'service-mobile-branding-bg': "url('/service-mobile-branding-bg.png')",
        'service-mobile-hosting-bg': "url('/service-mobile-hosting-bg.png')",
        'photo-1': "url('/Image 1.jpg')",
        'photo-2': "url('/Image 2.jpg')",
        'photo-3': "url('/Image 3.jpg')",
        'photo-4': "url('/Image 4.jpg')",
        'photo-5': "url('/Image 5.jpg')",
        'team-blend': "linear-gradient(rgba(211, 211, 211), rgba(211, 211, 211))",
        'services-hero-bg': 'radial-gradient(74.54% 51.35% at 2.82% -13.69%, #AFA8A8 0%, #292732 100%)',
        'login-mobile-bg': 'radial-gradient(118.02% 115.75% at 50% 50%, #C6DDEA 0%, #FFF 100%)',
        'login-button': 'linear-gradient(180deg, #333C4D 0%, #0B0E14 100%)',
        'signup-mobile-bg': "url('/computer-screens-on-desk-in-empty-data-room-and-co-2025-02-20-07-31-16-utc.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluegradient: 'var(--Blue-Gradient, linear-gradient(169deg, #90A6E2 -26.67%, #0096C0 127.92%))',
        babyblueoverlay: 'rgba(128, 216, 254, 0.85)',
        darkblueoverlay: 'rgba(64, 188, 242, 0.85)',
        'normal-card-dark-purple': '#231D4F',
        'normal-card-gray': '#848199',
        green: {
          200: '#D5FEEE',
          300: '#65EDB7',
          500: '#00CF7D',
          700: '#179865',
        },
        neongreen: {
          200: '#EFF88E',
          300: '#BFEE3C',
          500: '#A8DD76',
          700: '#79DD1A',
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
        navy: {
          300: '#C6DDEA',
          500: '#2B5882',
          600: '#2E61A6',
          700: '#002145',
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
          950: '#28272A',
        },
        black: {
          100: '#',
          200: '#',
          300: '#',
          400: '#',
          500: '#181818',
          600: '#',
          700: '#',
          800: '#',
          900: '#000000',
        },
      },
      fontFamily: {
        'maven-pro': ['"Maven Pro"', 'sans-serif'],
        'gentium-book-plus': ['"Gentium Book Plus"', 'serif'],
        'avenir': ['"Avenir LT Std"', 'sans-serif'],
        'source-sans-pro': ['"Source Sans Pro"', 'sans-serif'],
        'roboto': ['"Roboto"', 'sans-serif'],
        'abhaya-libre': ['"Abhaya Libre"', 'serif'],
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
      fontSize: {
        sm: '14px', // Override `text-sm` to be 14px
        base: '16px', // Override `text-base` to be 16px
        md: '18px', // Override `text-md` to be 18px
        md2: '24px',
        lg: '32px', // Override `text-lg` to be 32px
        xl: '36px',
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
      rotate: {
        '-4.961': '-4.961deg',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
    }),
    require('tailwind-scrollbar'),
  ],
};
