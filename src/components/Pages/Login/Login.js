import { useRef, useState } from "react";
import "./Login.css";
import { login, useAuth } from "../../../firebase";
import { Link } from "react-router-dom";
// Font Awesome Source
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faUnlockAlt,
  faCalendarAlt,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Incorrect password or email !");
    }
    setLoading(false);
  }

  return (
    <div class="customBackground">
      <p id="Main_Title" className="font-effect-shadow-multiple">
        <b>Login</b>
      </p>
      <p id="Sub_title">
        Don't have an account ? sign up&nbsp;<a href="/signup">here</a>
      </p>
      {/* <!--Fill all the Fieldes--> */}
      <form className="logInForm">
        {/* <!--Email detail's--> */}
        <p>
          <FontAwesomeIcon icon={faAt} />
          &nbsp;
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="EmailField"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={emailRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </p>

        {/* <!--Password detail's--> */}
        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          &nbsp;
          <label for="inputPassword">Password:</label>
          <input
            type="password"
            className="form-control"
            minlength="6"
            placeholder="•••••••"
            id="PasswordField"
            ref={passwordRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <Link to="/about">
          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            id="SignIn"
            disabled={loading || currentUser}
            onClick={handleLogin}
          >
            Sign in
          </button>
        </Link>
      </form>
      <br />
      <br />
      <br />
      <p class="copyright" id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple -
        Developed by Koren Cohen
      </p>{" "}
    </div>
  );
};

export default Login;
