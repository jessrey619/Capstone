import './App.css';
import { BrowserRouter as Router, Swtih, Route} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';



function App() {
  return (
    <>
    <Router>
      <Header/>
    </Router>
    </>
  );
}

export default App;
