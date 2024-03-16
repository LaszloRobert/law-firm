import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar, About, Appointment, AppointmentSuggestion, Contact, Hero, Services, Team, Footer } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <BrowserRouter>
    <div className='relative z-0 overflow-x-hidden'>
      <div id="home" className='bg-hero-pattern bg-cover bg-center h-screen'>
        <div className='absolute left-0 right-0 h-screen bg-black bg-opacity-40'>
          <Navbar />
          <Hero />
        </div>
      </div>
      <About />
      <Services />
      <AppointmentSuggestion />
      <Team />
      <Contact />
      <Footer />
      <ToastContainer />
    </div>

  </BrowserRouter >
)


export default App