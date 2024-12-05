import Navbar from '../Navbar';
import Hero from './hero';
import Process from './process';
import ServiceBlocks from '../Components/Services';
import Footer from '../Footer';

export default function Services() {

  return (
    <div className='overflow-x-hidden'>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Process */}
      <Process />

      {/* Service Block */}
      <ServiceBlocks />

      {/* Footer */}
      <Footer />
    </div>
  );
}