import './App.css';
import NavBar from './components/NavBar/NavBar';
import About from './components/Pages/About/About';
import Login from './components/Pages/Login/Login';
import Home from './components/Pages/HomePage/Home';
import SignUp from './components/Pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sticky from 'react-sticky-el';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sticky>
          <NavBar />
        </Sticky>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
