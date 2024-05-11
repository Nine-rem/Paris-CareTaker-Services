import React from 'react';
import { Route, Routes } from 'react-router-dom';

import IndexPage from './pages/indexPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import StayAll from './pages/stayAll.jsx';
import Layout from './layout.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="stayAll" element={<StayAll />} />
      </Route>
    </Routes>

  );
}

export default App;