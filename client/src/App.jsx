import React from 'react';
import { Route, Routes } from 'react-router-dom';

import IndexPage from './pages/indexPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import StayAll from './pages/stayAll.jsx';
import ServicePage from './pages/servicePage.jsx';
import QuotationPage from './pages/quotationPage.jsx';
import LegalPage from './pages/legalPage.jsx';
import CookiesPage from './pages/cookiesPage.jsx';
import ServiceTermsPage from './pages/serviceTermsPage.jsx';
import ContactPage from './pages/contactPage.jsx';
import Layout from './layout.jsx';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="stayAll" element={<StayAll />} />
        <Route path="service" element={<ServicePage />} />
        <Route path="quotation" element={<QuotationPage />} />
        <Route path="legal" element={<LegalPage />} />
        <Route path="cookies" element={<CookiesPage />} />
        <Route path="serviceTerms" element={<ServiceTermsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>

  );
}

export default App;