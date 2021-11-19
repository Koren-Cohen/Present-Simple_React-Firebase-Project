// Font Awesome Source
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './SignUp.css';
import { Alert, Form, Button } from 'react-bootstrap';

const SignUp = () => {
  return (
    <div id="White_background">
      <p id="Main_Title" className="font-effect-shadow-multiple">
        <i id="Main_Title_Icon" class="fas fa-user-plus"></i>
        <b>Registration</b>
      </p>
      <p id="Sub_title">
        Already have an account ? Log In<a href="/login"> here</a>
      </p>
      <Form className="signUpForm">
        {/* <!--First name detail's--> */}
        <p>
          <FontAwesomeIcon icon={faSignature} />
          <label for="inputFirstName"> - Full Name:</label>
          <input type="text" class="form-control" placeholder="Israel israeli" id="NameField" />
        </p>

        {/* <!--Date of Birth detail's--> */}
        <p>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <label for="inputID_Number"> - Date of Birth:</label>
          <input type="date" className="form-control" placeholder="Birthday" id="BirthdayField" />
        </p>

        {/* <!--Email detail's--> */}
        <p>
          <FontAwesomeIcon icon={faAt} />
          <label for="exampleInputEmail1"> - Email address</label>
          <input type="email" className="form-control" id="EmailField" aria-describedby="emailHelp" placeholder="Enter email" required />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </p>

        {/* <!--Password detail's--> */}
        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          <label for="inputPassword"> - Password:</label>
          <input type="password" className="form-control" placeholder="•••••••" id="PasswordField" />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          <label for="inputPassword"> Password Confirmation:</label>
          <input type="password" className="form-control" placeholder="•••••••" />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <Button type="button" className="btn btn-outline-primary btn-block" id="Submit">
          Submit
        </Button>
      </Form>
      <br />
      <br />
      <br />
      <p className="copyright" id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple - Developed by Koren Cohen
      </p>{' '}
    </div>
  );
};

export default SignUp;
