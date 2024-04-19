

// import logo from './logo.svg';
// import Axios from 'axios'

import { Route , Routes} from 'react-router-dom';
import './App.css';
// import TheHeader from './Components/OtherHeader';
import LogsEmployee from './pages/LogsEmployee';
// 
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import 'bootstrap-icons/font/bootstrap-icons.css'
// import 'remixicon/fonts/remixicon.css'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// // import Header from './Components/Header/Header';
// // import SideBar from './Components/SideBar/SideBar';


function App() {
  return (

    <div className='app'>
      {/* <TheHeader/> */}
      <Routes>
        <Route index element={<LogsEmployee/>} path='/Employee/Logs'/>
      </Routes>
      
       </div>
  );
};

export default App;
