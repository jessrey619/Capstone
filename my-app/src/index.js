import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Homepage from './pages/homepage';
import TheHeader from './components/Header';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Registration from './pages/Registration';
import LoginTrial from './pages/LoginTrial';

import {BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <TheHeader/>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<App/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)


reportWebVitals();
