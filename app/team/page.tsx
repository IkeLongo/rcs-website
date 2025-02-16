import Hero from '@/components/team/hero';
import Footer from '@/components/layout/footer';

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