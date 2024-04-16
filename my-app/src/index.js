import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import TheHeader from './components/Header';

import {BrowserRouter, Route, Routes } from 'react-router-dom';


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
