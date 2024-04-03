import './App.css';
import { BrowserRouter as Router, Swtih, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      {/* <Switch>
        <Route path="/" exact />
      </Switch> */}
    </Router>
    </>
  );
}

export default App;
