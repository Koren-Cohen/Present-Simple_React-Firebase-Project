import { useRef, useState } from "react";
import "./Login.css";
import { login, useAuth, getLoggedInUser } from "../../../firebase";
import { Link } from "react-router-dom";
// Font Awesome Source
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    setLoading(true);

    if (!emailRef.current.value) {
      alert("'Email' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    } else if (!passwordRef.current.value) {
      alert("'Password' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    }

    await login(emailRef.current.value, passwordRef.current.value);
    setLoading(false);
  };

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
          <label>Email address</label>
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

        {loading ? (
          <div class="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-block"
              id="SignIn"
              type="button"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span>&nbsp; Loading...</span>
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            id="SignIn"
            disabled={loading || currentUser}
            onClick={handleLogin}
          >
            Sign in
          </button>
        )}

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
