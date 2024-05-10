import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Hero from '../components/hero';
import NewStays from '../components/newStays';
import AboutUs from '../components/aboutUs';
import Reviews from '../components/reviews';
import QuoteRequest from '../components/quoteRequest';
import ServiceProviders from '../components/serviceProviders';
import Footer from '../components/footer';
import Head from '../components/head';

export default function IndexPage() {
  return (
    <>
    <div>
      <Head/>
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