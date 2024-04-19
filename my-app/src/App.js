

//import logo from './logo.svg';
import Axios from 'axios'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Homepage_Employee from './pages/homepage_employee';
// import Submit from './pages/submit';


import EmailVerification from './pages/EmailVerification';
// import ViewImages from './components/InsertImageTest/ViewImages';
// import AddImage from './components/InsertImageTest/AddImage';
// import PhotoGallery from './components/InsertImageTest/PhotoGallery';
import ChangePassword from './pages/ChangePassword';
import TheHeader from './Components/Header';



function App() {
  return (

    <div className='app'>
      <TheHeader/>
      <Routes>
        <Route index element={<EmailVerification/>} path='/Register/EmailVerification'/>
        {/* <Route index element={<ViewImages/>} path='/Images/'/>
        <Route index element={<AddImage/>} path='/Images/add'/>
        <Route index element={<PhotoGallery/>} path='/photos/'/> */}
        <Route index element={<ChangePassword/>} path='/Account/ChangePassword' />
        <Route index element={<Homepage_Employee/>} path='/Home/Employee' />
        <Route index element={<Homepage/>} path='/Home/User'/>
          
      </Routes>
    </div>
  );
};

export default App;
