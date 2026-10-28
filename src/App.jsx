import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import BrandIntroduction from './components/BrandIntroduction.jsx'
import Features from './components/Features.jsx'
import RecoverySection from './components/RecoverySection.jsx'
import ProductPreview from './components/ProductPreview.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WhyRepsThrive from './components/WhyRepsThrive.jsx'
import GymPartnerships from './components/GymPartnerships.jsx'
import OurVision from './components/OurVision.jsx'
import FAQ from './components/FAQ.jsx'
import ContactSection from './components/ContactSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import RepsChatbot from './components/RepsChatbot.jsx'

export default function App() {
  return (
    <>
      <a href="#features" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-volt focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <BrandIntroduction />
        <Features />
        <RecoverySection />
        <ProductPreview />
        <HowItWorks />
        <WhyRepsThrive />
        <GymPartnerships />
        <OurVision />
        <FAQ />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
      <RepsChatbot />
    </>
  )
}
