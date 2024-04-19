import Axios from 'axios'

import './App.css';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

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
// import Submit from './pages/submit';
import Submit from './pages/submit';

// Jessrey
// import EmailVerification from './pages/EmailVerification';

// Jessrey
// import EmailVerification from './pages/EmailVerification';

import EmailVerification from './pages/EmailVerification';
// import ViewImages from './components/InsertImageTest/ViewImages';
// import AddImage from './components/InsertImageTest/AddImage';
// import PhotoGallery from './components/InsertImageTest/PhotoGallery';
//Tracy
import ChangePassword from './pages/ChangePassword';

// Reina
import TheHeader from './Components/Header/UserHeader';


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
        <Route path='/configuration' element={<Configuration/>} />
      </Routes>
    </>
  );
  
};

export default App;

