import Navbar from '../Navbar';
import Hero from './hero';
import Process from './process';
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

      {/* Footer */}
      <Footer />
    </div>
  );
}