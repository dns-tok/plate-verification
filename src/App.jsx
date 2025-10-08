import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import PriceSection from './components/PriceSection'
import InfoSection from './components/InfoSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import TestimonialSection from './components/TestimonialSection'

function App() {


  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      <Navbar />
      <HeroSection />
      <PriceSection />
      <InfoSection />
      <FaqSection />
      <ContactSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

export default App
