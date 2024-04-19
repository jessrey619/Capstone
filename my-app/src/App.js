<<<<<<< HEAD


// import logo from './logo.svg';
// import Axios from 'axios'

import './App.css';
import Login from './components/Login/Login';
import ChangePassword from './components/Login/ChangePassword';
import LoginBgm from './components/Login/LoginBgm';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'remixicon/fonts/remixicon.css'
=======
import Axios from 'axios'

import './App.css';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'
>>>>>>> origin/main

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// import Header from './Components/Header/Header';
// import SideBar from './Components/SideBar/SideBar';

<<<<<<< HEAD
=======
// Phoebe
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Dashboard from './pages/admin/Dashboard'
import ApplicationList from './pages/admin/ApplicationList'
import Logs from './pages/admin/Logs'
import Statistics from './pages/admin/Statistics'
import ParkingArea from './pages/admin/ParkingArea'
import Configuration from './pages/admin/Configuration';
 
// Therese
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';
>>>>>>> origin/main

// Jessrey
// import EmailVerification from './pages/EmailVerification';


//Tracy
import ChangePassword from './pages/ChangePassword';

// Reina
import TheHeader from './Components/Header/UserHeader';


function App() {
  return (
<<<<<<< HEAD

    <div className='app'>
      {/* <Routes>
      </Routes> */}

      <LoginBgm/>
    </div>
=======
    <>
      <Header/>
      <SideBar/>
      <Routes>
        {/* Admin */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='/application-list' element={<ApplicationList/>} />
        <Route path='/logs' element={<Logs/>} />
        <Route path='/statistics' element={<Statistics/>} />
        <Route path='/parking-area' element={<ParkingArea/>} />
        <Route path='/configuration' element={<Configuration/>} />
      </Routes>
    </>
>>>>>>> origin/main
  );
  
};

export default App;

