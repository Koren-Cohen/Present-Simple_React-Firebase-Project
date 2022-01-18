// Font Awesome Source
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import './SignUp.css';
import { Form } from 'react-bootstrap';
import { signup, useAuth } from '../../../firebase';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

const SignUp = () => {
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  // const [newEmail, setNewEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const usersCollectionRef = collection(db, 'Users');

  //Authentication process by email and password
  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert('This email is already connected to an account !');
    }
    setLoading(false);
  }

  //Creat user func in firestore
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      fullName: newName,
      dateOfBirth: Timestamp.fromDate(new Date(newDate)).toDate(),
      createdAt: serverTimestamp(),
      // email: newEmail,
    });
  };

  return (
    <div id="White_background">
      <p id="Main_Title" className="font-effect-shadow-multiple">
        <i id="Main_Title_Icon" class="fas fa-user-plus"></i>
        <b>Registration</b>
      </p>
      <p id="Sub_title">
        Already have an account ? Log In<a href="/logi n"> here</a>
      </p>
      .
      <Form className="signUpForm">
        {/* <!--First name detail's--> */}
        <p>
          <FontAwesomeIcon icon={faSignature} />
          <label> Full Name:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Israel israeli"
            id="NameField"
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </p>

        {/* <!--Date of Birth detail's--> */}
        <p>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <label for="inputID_Number"> Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            placeholder="Birthday"
            id="BirthdayField"
            onChange={(event) => {
              setNewDate(event.target.value);
            }}
          />
        </p>

        {/* <!--Email detail's--> */}
        <p>
          <FontAwesomeIcon icon={faAt} />
          <label for="exampleInputEmail1"> Email address</label>
          <input
            type="email"
            className="form-control"
            id="EmailField"
            aria-describedby="emailHelp"
            // onChange={(event) => {
            //   setNewEmail(event.target.value);
            // }}
            placeholder="Enter email"
            ref={emailRef}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </p>

        {/* <!--Password detail's--> */}
        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          <label for="inputPassword"> Password:</label>
          <input type="password" className="form-control" placeholder="•••••••" id="PasswordField" ref={passwordRef} />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          <label for="inputPassword"> Password Confirmation:</label>
          <input type="password" minlength="6" className="form-control" placeholder="•••••••" />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          id="Submit"
          disabled={loading || currentUser}
          onClick={() => {
            handleSignup();
            createUser();
          }}
        >
          Submit
        </button>
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
