import React from 'react';
import { Route, Routes } from 'react-router-dom';

import IndexPage from './pages/indexPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import Layout from './layout.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  return (
    <Routes>
      <Route ptah ="/" element={<Layout/>}>
      <Route index element={<IndexPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      </Route>
    </Routes>

  );
}

export default App;