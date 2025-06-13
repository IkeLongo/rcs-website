const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}", // ✅ include your custom folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-pattern': "url('/Backgrounds.svg')",
        'team-pattern': "url('/team-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
        'do-custom-gradient': 'linear-gradient(170deg, #06407F 50.24%, #002145 153.54%)',
        'mobile-premium-bg': "url('/mobile-premium-bg.svg')",
        'mobile-normal-bg': "url('/mobile-normal-bg.svg')",
        'footer-bg-gradient': 'radial-gradient(127.87% 50% at 50% 50%, rgba(125, 118, 152, 0.50) 0%, rgba(41, 39, 50, 0.50) 100%)',
        'footer-bg-gradient-solid': 'radial-gradient(127.87% 50% at 50% 50%, rgba(125, 118, 152, 1) 0%, rgba(41, 39, 50, 1) 100%)',
        'services-hero-bg': 'radial-gradient(74.54% 51.35% at 2.82% -13.69%, #AFA8A8 0%, #292732 100%)',
        'service-hero-blob-desktop-svg': "url('/service-hero-blob-desktop.svg')",
        'service-hero-blob-svg': "url('/service-hero-background-blob.svg')",
        'service-block-design-bg-image': "url('/website-engineer.webp')",
        'service-block-branding-bg-image': "url('/website-design-tools.webp')",
        'service-block-hosting-bg-image': "url('/computer-networking.webp')",
        'photo-1': "url('/Image 1.jpg')",
        'photo-2': "url('/barbara-profile-image.webp')",
        'photo-3': "url('/caitlyn-profile-image.webp')",
        'photo-4': "url('/Image 4.jpg')",
        'photo-5': "url('/Image 5.jpg')",
        'team-blend': "linear-gradient(rgba(211, 211, 211), rgba(211, 211, 211))",
        'services-hero-bg': 'radial-gradient(74.54% 51.35% at 2.82% -13.69%, #AFA8A8 0%, #292732 100%)',
        'service-hero-bg-blob': "url('/service-hero-bg-blob.webp')",
        'login-mobile-bg': 'radial-gradient(118.02% 115.75% at 50% 50%, #C6DDEA 0%, #FFF 100%)',
        'login-button': 'linear-gradient(180deg, #333C4D 0%, #0B0E14 100%)',
        'signup-mobile-bg': "url('/computer-screens-on-desk-in-empty-data-room-and-co-2025-02-20-07-31-16-utc.jpg')",
        'home-why': 'linear-gradient(90deg, #E4E7ED 21.76%, #F0F1F5 78.24%);',
        'home-do-mountain-range': 'url("/home-landscape-bluegrad.webp")',
        'home-pricing-bg': 'url("/home-pricing-bg.webp")',
        'light-blue-radial-gradient': 'var(--Light-Blue-Radial-Gradient, radial-gradient(50% 50% at 50% 50%, #E9F2F8 0%, #C6DDEA 100%))',
        'dark-blue-radial-gradient': 'var(--Dark-Blue-Light-Blue-Radial-Gradient, radial-gradient(62.99% 62.99% at 50% 37.01%, #0052AB 0%, #002145 100%))',
        'darkblueoverlay': 'radial-gradient(62.99% 62.99% at 50% 37.01%, rgba(0, 82, 171, 0.80) 0%, rgba(0, 33, 69, 0.80) 100%)',
        'lightblueoverlay': 'radial-gradient(50% 50% at 50% 50%, rgba(233,242,248, 0.80) 0%, rgba(198,221,234, 0.80) 100%)',
        'nav-bar-button': 'linear-gradient(105deg, #192E56 -11.82%, #6585C0 89.44%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluegradient: 'var(--Blue-Gradient, linear-gradient(169deg, #90A6E2 -26.67%, #0096C0 127.92%))',
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
        // blue: {
        //   300: '#46C1E3',
        //   500: '#0096C0',
        //   700: '#05708E',
        // },
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
          50: '#e7e9ec',  // Light
          100: '#dbdee3', // Light:hover
          200: '#b4bac5', // Light:active
          500: '#0c2244', // Normal
          600: '#0b1f3d', // Normal:hover
          700: '#0a1b36', // Normal:active
          800: '#091a33', // Dark
          900: '#071429', // Dark:hover
          950: '#050f1f', // Dark:active
          975: '#040c18'  // Darker
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
        blue: {
          50: '#eaeff6',  // Light
          100: '#e0e7f2', // Light:hover
          200: '#becee4', // Light:active
          300: '#8ea8cf',
          400: '#5e82ba',
          500: '#2d62a8', // Normal
          600: '#295897', // Normal:hover
          700: '#244e86', // Normal:active
          800: '#224a7e', // Dark
          900: '#1b3b65', // Dark:hover
          950: '#142c4c', // Dark:active
          975: '#10223b', // Darker
        },
        'alice-blue': {
          50: '#fdfeff',  // Light  
          100: '#fcfdfe', // Light:hover
          200: '#f9fcfd', // Light:active
          500: '#ebf4fa', // Normal
          600: '#d4dce1', // Normal:hover
          700: '#bcc3c8', // Normal:active
          800: '#b0b7bc', // Dark
          900: '#8d9296', // Dark:hover
          950: '#6a6e70', // Dark:active
          975: '#525558', // Darker
        },
        'royal-blue': {
          50: '',  // Light  
          100: '', // Light:hover
          200: '', // Light:active
          500: '#3A88EE', // Normal
          600: '', // Normal:hover
          700: '', // Normal:active
          800: '', // Dark
          900: '', // Dark:hover
          950: '', // Dark:active
          975: '', // Darker
        },
        green: {
          50: '#f3f9ec',  // Light
          100: '#edf6e3', // Light:hover
          200: '#d9edc4', // Light:active
          500: '#84c441', // Normal
          600: '#77b03b', // Normal:hover
          700: '#6a9d34', // Normal:active
          800: '#639331', // Dark
          900: '#4f7627', // Dark:hover
          950: '#3b581d', // Dark:active
          975: '#2e4517', // Darker
        },
        'light-green': {
          50: '#f9fdec',  // Light
          100: '#f5fce2', // Light:hover
          200: '#ebfac3', // Light:active
          500: '#bfee3c', // Normal
          600: '#acd636', // Normal:hover
          700: '#99be30', // Normal:active
          800: '#8fb32d', // Dark
          900: '#738f24', // Dark:hover
          950: '#566b1b', // Dark:active
          975: '#435315', // Darker
        },
        lime: {
          50: '#fbfded',  // Light
          100: '#f9fbe4', // Light:hover
          200: '#f3f7c8', // Light:active
          500: '#d9e64e', // Normal
          600: '#c3cf46', // Normal:hover
          700: '#aeb83e', // Normal:active
          800: '#a3ad3b', // Dark
          900: '#828a2f', // Dark:hover
          950: '#626723', // Dark:active
          975: '#4c511b', // Darker
        },
        gray: {
          50: '#f6f7f7',  // Light
          100: '#f2f3f3', // Light:hover
          200: '#e3e5e6', // Light:active
          500: '#a5acaf', // Normal
          600: '#959b9e', // Normal:hover
          700: '#848a8c', // Normal:active
          800: '#7c8183', // Dark
          900: '#636769', // Dark:hover
          950: '#4a4d4f', // Dark:active
          975: '#3a3c3d', // Darker
        },
      },
      fontFamily: {
        'maven-pro': ['"Maven Pro"', 'sans-serif'],
        'gentium-book-plus': ['"Gentium Book Plus"', 'serif'],
        'avenir': ['"Avenir LT Std"', 'sans-serif'],
        'source-sans-pro': ['"Source Sans Pro"', 'sans-serif'],
        'roboto': ['"Roboto"', 'sans-serif'],
        'abhaya-libre': ['"Abhaya Libre"', 'serif'],
        'passero-one': ['"Passero One"', 'sans-serif'],
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
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Scroll left by 50% of the container width
        },
        "reverse-infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" }, // Scroll right by 50% of the container width
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 20s linear infinite", // 20s duration for left scroll
        "reverse-infinite-scroll": "reverse-infinite-scroll 20s linear infinite", // 20s duration for right scroll
      },
      rotate: {
        '-4.961': '-4.961deg',
      },
      backgroundPosition: {
        'bottom-right': 'right bottom',
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
