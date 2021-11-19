import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div id="White_background">
      <p id="Main_Title" className="font-effect-shadow-multiple">
        <b>Login</b>
      </p>
      <p id="Sub_title">
        Dont have an account ? sign up
        <a href="/signup"> here</a>
      </p>
      {/* <!--Fill all the Fieldes--> */}
      <form className="logInForm">
        {/* <!--Email detail's--> */}
        <p>
          <i className="fas fa-at"></i>
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="EmailField" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </p>

        {/* <!--Password detail's--> */}
        <p>
          <i className="fas fa-unlock-alt"></i>
          <label for="inputPassword">Password:</label>
          <input type="password" className="form-control" placeholder="•••••••" id="PasswordField" />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <button type="button" className="btn btn-outline-primary btn-block" id="SignIn">
          Sign in
        </button>
        <br />
        <button type="button" className="btn btn-outline-danger btn-block" id="SignOut">
          Sign Out
        </button>
      </form>
      <br />
      <br />
      <br />
      <p class="copyright" id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple - Developed by Koren Cohen
      </p>{' '}
    </div>
  );
};

export default Login;
