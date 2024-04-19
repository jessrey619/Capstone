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
<<<<<<< HEAD
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginTrial />
  </React.StrictMode>
);
=======
>>>>>>> 85e91f9c12ec6383ae9896bf222d507eaae39491


import {BrowserRouter, Route, Routes } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <TheHeader/>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<App/>} />
          <Route path='/Account/ChangePassword' element={<ChangePassword/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals();
