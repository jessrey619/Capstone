import Axios from 'axios'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// Phoebe
import Header from './components/AdminHeader/Header';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './pages/Admin/Dashboard'
import ApplicationList from './pages/Admin/ApplicationList'
import Logs from './pages/Admin/Logs'
import Statistics from './pages/Admin/Statistics'
import ParkingArea from './pages/Admin/ParkingArea'
import Configuration from './pages/Admin/Configuration';
import StickerPricing from './pages/Admin/StickerPricing';
import UserManagement from './pages/Admin/UserManagement';
import ParkingManagement from './pages/Admin/ParkingManagement';
import AccountExpiration from './pages/Admin/AccountExpiration';
 
// Therese
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';

// Jessrey
// import EmailVerification from './pages/EmailVerification';


//Tracy
import ChangePassword from './pages/ChangePassword';

// Reina
import TheHeader from './components/UserHeader/UserHeader';

function App() {
  return (
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
        <Route path="/configuration/*" element={<Configuration />}>
          <Route path="sticker-pricing" element={<StickerPricing />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="parking-management" element={<ParkingManagement />} />
          <Route path="account-expiration" element={<AccountExpiration />} />
        </Route>
        {/* Add other routes as needed */}
      </Routes>
    </>
  );
  
};

export default App;

