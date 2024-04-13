
import './App.css';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

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
  );

  
};

export default App;
