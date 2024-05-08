import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Hero from './components/hero';
import NewStays from './components/newStays';
import AboutUs from './components/aboutUs';
import Reviews from './components/reviews';
import QuoteRequest from './components/quoteRequest';
import ServiceProviders from './components/serviceProviders';
import Footer from './components/footer';
import Header from './components/header';
import Head from './components/head';


function App() {
  return (
    <>
    <div>
      <Head/>
      <Header />
      <Hero />
      <NewStays />
      <AboutUs />
      <Reviews />
      <QuoteRequest />
      <ServiceProviders />
      <Footer />
    </div>
    </>
  );
}

export default App;