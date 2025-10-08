import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import PriceSection from './components/PriceSection'
import InfoSection from './components/InfoSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'
import TestimonialSection from './components/TestimonialSection'
import MultiConsultant from './components/MultiConsultant'

function App() {


  return (
    <div className='overflow-x-hidden overflow-y-hidden'>
      <Navbar />
      <HeroSection />
      <PriceSection />
      <MultiConsultant />
      <InfoSection />
      <FaqSection />
      <ContactSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

export default App
