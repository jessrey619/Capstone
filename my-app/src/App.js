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
import Dashboard from './pages/Dashboard'
import ApplicationList from './pages/ApplicationList'
import Logs from './pages/Logs'
import Statistics from './pages/Statistics'
import ParkingArea from './pages/ParkingArea'
 
// Therese
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';

// Jessrey
import EmailVerification from './pages/EmailVerification';
import ViewImages from './components/InsertImageTest/ViewImages';
import AddImage from './components/InsertImageTest/AddImage';
import PhotoGallery from './components/InsertImageTest/PhotoGallery';

//Tracy
import ChangePassword from './pages/ChangePassword';

// Reina
import TheHeader from './components/Header';


function App() {
  return (
    <>
      <Routes>
        {/* User */}
        <Route path='/' element={<Dashboard/>} />  {/* E change ni into landing page na route placeholder ra ning dashboard */}
        {/* Tanan page sa user e butang diri */}

        <div className='admin'>
          <Header/>
          <SideBar/>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/application-list' element={<ApplicationList/>} />
            <Route path='/logs' element={<Logs/>} />
            <Route path='/statistics' element={<Statistics/>} />
            <Route path='/parking-area' element={<ParkingArea/>} />
            <Route path='/configuration' element={<Configuration/>} />
            <Route index element={<ChangePassword/>} path='/Account/ChangePassword' />
            <Route index element={<Homepage_Employee/>} path='/Home/Employee' />
          </div>         
      </Routes>
    </>
  );
  
};

export default App;

