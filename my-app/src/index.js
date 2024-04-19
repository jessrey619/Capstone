import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import TheHeader from './components/Header';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Registration from './pages/Registration';
import LoginTrial from './pages/LoginTrial';

import {BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)


reportWebVitals();
