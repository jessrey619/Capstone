import Axios from 'axios'

import './App.css';
import { Route, Routes} from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'remixicon/fonts/remixicon.css'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// Phoebe
import Header from './Components/AdminHeader/Header';
import SideBar from './Components/SideBar/SideBar';
import Dashboard from './pages/admin/Dashboard'
import ApplicationList from './pages/admin/ApplicationList'
import Logs from './pages/admin/Logs'
import Statistics from './pages/admin/Statistics'
import ParkingArea from './pages/admin/ParkingArea'
import Configuration from './pages/admin/Configuration';

// Tracy
import LoginPage from './pages/LoginPage'
import ChangePassPage from './pages/ChangePassPage';
 
// Therese
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';

// Jessrey
// import EmailVerification from './pages/EmailVerification';

// Reina
import TheHeader from './Components/UserHeader/UserHeader';
import TheFooter from './Components/Footer/Footer';

function App() {
  return (
    <>

      <TheHeader/>

      <Routes>
        {/* <Route index element={<EmailVerification/>} path='/Register/EmailVerification'/>
        <Route index element={<ViewImages/>} path='/Images/'/>
        <Route index element={<AddImage/>} path='/Images/add'/>
        <Route index element={<PhotoGallery/>} path='/photos/'/>
        <Route index element={<ChangePassword/>} path='/Account/ChangePassword' /> */}
        <Route index element={<Homepage_Employee/>} path='/Home/Employee' />
        <Route index element={<Homepage/>} path='/Home/User' />
        {/* User*/}
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/user/changepassword' element={<ChangePassPage/>} /> 
      </Routes>

    </>
  );
  
};

export default App;

