import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar, About, Appointment, AppointmentSuggestion, Contact, Hero, Services, Team, Footer } from './components'

const App = () => (
  <BrowserRouter>
    <div className='relative z-0'>
      <div className='bg-hero-pattern bg-cover bg-center h-screen'>
        <div className='absolute left-0 right-0 h-screen bg-black bg-opacity-40'>
          <Navbar />
          <Hero />
        </div>
      </div>
      <About />
      <Services />
      <div className='relative mb-10'>
        <AppointmentSuggestion />
      </div>
      <Team />
      <Contact />
      <Footer />
    </div>

  </BrowserRouter >
)


export default App