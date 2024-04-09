
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Main from './Components/Main/Main';
import Dashboard from './pages/Dashboard';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';



function App() {
  return (
  <>
  <Header/>
  <SideBar/>
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/application-ilst' element={<Dashboard/>} />
        </Route>
      </Routes>
    </Router>
  </>
  );

  
};

export default App;
