import { Hero } from '@/app/ui/team/hero';
import { Footer } from '@/app/ui/layout/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'Get to know the team behind River City Creatives. We’re a San Antonio-based crew of designers and developers passionate about branding and web design.',
  twitter: {
    card: 'summary_large_image',
  },
}
  

export default function Home() {

  return (
    <div className="relative h-auto w-full bg-cover bg-top bg-gray-900 overflow-x-hidden team">
      <Hero />
      <Footer 
        bgGradientClass='bg-footer-bg-gradient-solid'
      />
    </div>
  );
}