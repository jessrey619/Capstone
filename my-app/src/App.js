
import Axios from 'axios'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// import Header from './Components/Header/Header';
// import SideBar from './Components/SideBar/SideBar';
import EmailVerification from './pages/EmailVerification';
import ViewImages from './components/InsertImageTest/ViewImages';
import AddImage from './components/InsertImageTest/AddImage';
import PhotoGallery from './components/InsertImageTest/PhotoGallery';
import ChangePassword from './pages/ChangePassword';



function App() {
  return (

    <div className='app'>
      <Routes>
        <Route index element={<EmailVerification/>} path='/Register/EmailVerification'/>
        <Route index element={<ViewImages/>} path='/Images/'/>
        <Route index element={<AddImage/>} path='/Images/add'/>
        <Route index element={<PhotoGallery/>} path='/photos/'/>
        <Route index element={<ChangePassword/>} path='/Account/ChangePassword' />
      </Routes>
    </div>
  );
};

export default App;
