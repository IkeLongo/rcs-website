
import HomeHero from './Components/home-hero/HomeHero';
import HomeWhy from './Components/home-why/HomeWhy';
import DoContainer from './Components/DoContainer/page';
import ScrollingOptions from './Components/Options/ScrollingOptions';
import Plan from './Components/Plan/page';
import Footer from './Footer/page';

export default function Home() {

  return (
    <div className='relative'>
      <div className="relative h-auto w-full bg-cover bg-top bg-home-pattern overflow-x-hidden">
        <HomeHero />

        {/* Why Section */}
        <HomeWhy />

        {/* Do Section */}
        <div className="relative w-full min-h-[596px] bg-transparent">
          <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
            <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
              What We Do
            </h3>
          </div>
          <DoContainer />
        </div>

        {/* Options Section */}
        <div className="relative w-full h-[450px] bg-transparent md:h-[400px]">
          <div className="relative z-10 p-6 pt-20 flex flex-col items-center justify-start h-full gap-10">
            <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
              Options to Suit<br className='md:hidden'/> Every Vision
            </h3>
            <ScrollingOptions />
          </div>
        </div>

        {/* Plan Section */}
        <div id='plan' className="relative w-full min-h-[450px] bg-transparent">
          <div className="relative z-10 p-6 pt-6 flex flex-col items-center justify-start h-full gap-4">
            <h3 className="w-auto text-[32px] text-white font-gentium-book-plus font-bold text-center drop-shadow-[2px_10px_4.6px_rgba(0,0,0,0.25)]">
              Choose Your Right Plan
            </h3>
            <p className='font-avenir text-center text-[14px] text-white max-w-[500px]'>
              Select from our best plans according to the service you need. Need more or less? Book a call to discuss a custom subscription for a seamless fit. 
            </p>
          </div>
          <Plan />
        </div>

        {/* Footer */}
        <Footer 
          bgGradientClass='bg-footer-bg-gradient'
        />
      </div>
    </div>
  );
}
