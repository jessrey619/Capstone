
import './App.css';
import { Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Dashboard from './pages/Dashboard'



function App() {
  return (
  <>
  <Header/>
  <SideBar/>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        
      </Routes>
  </>
  );

  
};

export default App;
