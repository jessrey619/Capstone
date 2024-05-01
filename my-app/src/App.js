import Axios from 'axios'


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
    <>
      <Header/>
      <SideBar/>
      <Routes>
        <Route index element={<LogsEmployee/>} path='/Employee/Logs'/>
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

