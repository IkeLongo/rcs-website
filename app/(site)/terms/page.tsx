import { Main } from '@/components/terms/main';
import { Footer } from '@/components/layout/footer';

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