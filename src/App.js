import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import PostsPage from "./components/Pages/PostsPage/PostsPage";
import Profile from "./components/Pages/Profile/Profile";
import About from "./components/Pages/About/About";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/HomePage/Home";
import SignUp from "./components/Pages/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sticky from "react-sticky-el";
import { useAuth } from "./firebase";

const App = () => {
  const currentUser = useAuth(); //Uses authentication in all app pages and routers.

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          {/* About page always appears */}
          <Route path="/about" component={About} />
          {/* Home, Login, SignUp pages appears when user still not signed in*/}
          {!currentUser && (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
            </>
          )}
          {/* Profile and Posts Page - pages appears when user signed in*/}
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
