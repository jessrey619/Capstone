

//import logo from './logo.svg';
import Axios from 'axios'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';


//import Header from './Components/Header/Header';
//import SideBar from './Components/SideBar/SideBar';



function App() {
  return (

    <div className='app'>
      {/* <Routes>
        
      </Routes> */}
      <Homepage_Employee/>
    </div>
  );
};

export default App;
