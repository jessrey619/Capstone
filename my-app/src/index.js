import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
// import { BrowserRouter } from 'react-router-dom';
=======
import Homepage from './pages/homepage';
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
        <App />
=======
    <Homepage />
>>>>>>> Stashed changes
  </React.StrictMode>
);

reportWebVitals();