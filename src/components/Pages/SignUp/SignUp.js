// Font Awesome Source
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faUnlockAlt,
  faCalendarAlt,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import "./SignUp.css";
import { Form } from "react-bootstrap";
import { signup, useAuth, db } from "../../../firebase";
import {
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  doc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const fullNameRef = useRef();
  const dateRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  //1.Sign up process by the func 'signup' (in 'firebase' file).
  const handleSignup = async () => {
    setLoading(true);

    if (fullNameRef.current.value == "" || !fullNameRef.current.value) {
      alert("'Full Name' field is empty.\nPlease input value.");
      return;
    } else if (dateRef.current.value == "" || !dateRef.current.value) {
      alert("'Date of birth' field is empty.\nPlease input value.");
      return;
    } else if (emailRef.current.value == "" || !emailRef.current.value) {
      alert("'Email' field is empty.\nPlease input value.");
      return;
    } else if (passwordRef.current.value == "" || !passwordRef.current.value) {
      alert("'Password' field is empty.\nPlease input value.");
      return;
    } else if (passwordConfRef.current.value != passwordRef.current.value) {
      alert("The password confirmation does not match");
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        createUser();
      })
      .catch((error) => {
        alert(
          "Error Code: " +
            error.code +
            "\nError message: '" +
            error.message +
            "'"
        );
      });
    setLoading(false);
  };

  const createUser = async () => {
    const auth = getAuth();
    //2.The user object has basic properties such as display name, email, uid...
    const user = auth.currentUser;
    const uid = user.uid;
    //2.2.Create a ref of the users list in the DB.
    const usersListRef = doc(db, "Users", uid);

    //2.3.Create user func in firestore
    await setDoc(usersListRef, {
      fullName: newName,
      dateOfBirth: Timestamp.fromDate(new Date(newDate)).toDate(),
      createdAt: serverTimestamp(),
      email: newEmail,
      user_ID: uid,
      joinPlatform: "Web",
    })
      .then(() => {
        alert("User data added successfully!");
      })
      .catch((error) => {
        alert("Unsuccessful operation, error:", error);
      });
  };

  return (
    <div id="White_background">
      <p id="Main_Title" className="font-effect-shadow-multiple">
        <i id="Main_Title_Icon" class="fas fa-user-plus"></i>
        <b>Registration</b>
      </p>
      <p id="Sub_title">
        Already have an account ? Log In&nbsp;<a href="/login">here</a>
      </p>
      <Form className="signUpForm">
        {/* <!--First name detail's--> */}
        <p>
          <FontAwesomeIcon icon={faSignature} />
          &nbsp;
          <label>Full Name:</label>
          <input
            required
            ref={fullNameRef}
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
          &nbsp;
          <label for="inputID_Number"> Date of Birth:</label>
          <input
            required
            ref={dateRef}
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
          &nbsp;
          <label for="exampleInputEmail1"> Email address</label>
          <input
            required
            type="email"
            className="form-control"
            id="EmailField"
            aria-describedby="emailHelp"
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
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
          <label for="inputPassword"> Password:</label>
          <input
            required
            type="password"
            className="form-control"
            placeholder="•••••••"
            id="PasswordField"
            ref={passwordRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>
        <p>
          <FontAwesomeIcon icon={faUnlockAlt} />
          &nbsp;
          <label for="inputPassword"> Password Confirmation:</label>
          <input
            required
            type="password"
            minlength="6"
            className="form-control"
            placeholder="•••••••"
            ref={passwordConfRef}
          />
          <small id="emailHelp" className="form-text text-muted">
            Must be at least 6 characters.
          </small>
        </p>
        <Link to="/about">
          {" "}
          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            id="Submit"
            disabled={loading || currentUser}
            onClick={() => {
              handleSignup();
            }}
          >
            Submit
          </button>
        </Link>
      </Form>
      <br />
      <br />
      <br />
      <p className="copyright" id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple -
        Developed by Koren Cohen
      </p>{" "}
    </div>
  );
};

export default SignUp;
