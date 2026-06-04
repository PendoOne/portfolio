import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { WorksSection } from './components/sections/WorksSection'
import { ContactSection } from './components/sections/ContactSection'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface dark:bg-primary text-primary dark:text-white transition-colors duration-300">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <WorksSection />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}

export default App
