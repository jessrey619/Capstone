import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import TheHeader from './Components/OtherHeader';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LogsEmployee from './pages/Logs';




ReactDOM.render(
  <React.StrictMode>
    <TheHeader/>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<LogsEmployee/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals();
