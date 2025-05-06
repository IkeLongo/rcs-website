import { Main } from '@/app/ui/terms/main';
import Footer from '@/app/ui/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: "Review the terms and conditions for using River City Creatives' website and services.",
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://rivercitycreatives.com/terms', // Add your canonical URL here
  },
}

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center h-auto w-full bg-gray-900 bg-cover bg-top overflow-x-hidden pt-24">
      {/* Hero Section */}
      <Main />

      {/* Footer */}
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}