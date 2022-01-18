import './App.css';
import NavBar from './components/NavBar/NavBar';
import PostsPage from './components/Pages/PostsPage/PostsPage';
import Profile from './components/Pages/Profile/Profile';
import About from './components/Pages/About/About';
import Login from './components/Pages/Login/Login';
import Home from './components/Pages/HomePage/Home';
import SignUp from './components/Pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sticky from 'react-sticky-el';
import { useAuth } from './firebase';

const App = () => {
  const currentUser = useAuth();

  return (
    <Router>
      <div className="App">
        <Sticky>
          <NavBar />
        </Sticky>
        <Switch>
          <Route path="/about" component={About} />
          {!currentUser && (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </>
          )}
          {currentUser && (
            <>
              <Route path="/profile" component={Profile} />
              <Route path="/posts_Page" component={PostsPage} />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
