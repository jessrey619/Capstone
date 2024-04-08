import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import Main from './Components/Main/Main';



function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Main/>}/>
    </Routes>
  </Router>
  );
};

export default App;
