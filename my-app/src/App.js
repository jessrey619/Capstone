
<<<<<<< HEAD
import './App.css';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'
=======

//import logo from './logo.svg';
import Axios from 'axios'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
import Submit from './pages/submit';
>>>>>>> origin/JessreyBranch


<<<<<<< HEAD
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Dashboard from './pages/Dashboard'
import ApplicationList from './pages/ApplicationList'
import Logs from './pages/Logs'
import Statistics from './pages/Statistics'
import ParkingArea from './pages/ParkingArea'
import Configuration from './pages/Configuration'

function App() {
  return (
  <>
  <Header/>
  <SideBar/>
      <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/application-list' element={<ApplicationList/>} />
          <Route path='/logs' element={<Logs/>} />
          <Route path='/statistics' element={<Statistics/>} />
          <Route path='/parking-area' element={<ParkingArea/>} />
          <Route path='/configuration' element={<Configuration/>} />
      </Routes>
  </>
=======
import EmailVerification from './pages/EmailVerification';
import ViewImages from './components/InsertImageTest/ViewImages';
import AddImage from './components/InsertImageTest/AddImage';
import PhotoGallery from './components/InsertImageTest/PhotoGallery';
import ChangePassword from './pages/ChangePassword';
import TheHeader from './components/Header';



function App() {
  return (

    <div className='app'>
      <TheHeader/>
      <Routes>
        <Route index element={<EmailVerification/>} path='/Register/EmailVerification'/>
        <Route index element={<ViewImages/>} path='/Images/'/>
        <Route index element={<AddImage/>} path='/Images/add'/>
        <Route index element={<PhotoGallery/>} path='/photos/'/>
        <Route index element={<ChangePassword/>} path='/Account/ChangePassword' />
        <Route index element={<Homepage_Employee/>} path='/Home/Employee' />
          
      </Routes>
    </div>
>>>>>>> origin/JessreyBranch
  );

  
};

export default App;
