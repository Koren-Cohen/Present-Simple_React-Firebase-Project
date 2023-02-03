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
import { useAuth, creatUserAndUserDoc } from "../../../firebase";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const fullNameRef = useRef();
  const dateRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const handleSignup = async () => {
    setLoading(true);

    if (fullNameRef.current.value == "" || !fullNameRef.current.value) {
      alert("'Full Name' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    } else if (dateRef.current.value == "" || !dateRef.current.value) {
      alert("'Date of birth' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    } else if (emailRef.current.value == "" || !emailRef.current.value) {
      alert("'Email' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    } else if (passwordRef.current.value == "" || !passwordRef.current.value) {
      alert("'Password' field is empty.\nPlease input value.");
      setLoading(false);
      return;
    } else if (passwordConfRef.current.value != passwordRef.current.value) {
      alert("The password confirmation does not match");
      setLoading(false);
      return;
    }

    try {
      await creatUserAndUserDoc(
        email,
        passwordRef.current.value,
        fullName,
        birthDate
      );
    } catch (error) {
      alert(
        "Error Code: " + error.code + "\nError message: '" + error.message + "'"
      );
    }

    setLoading(false);
  };

  return (
    <div class="customBackground">
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
              setFullName(event.target.value);
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
              setBirthDate(event.target.value);
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
              setEmail(event.target.value);
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

        {loading ? (
          <div class="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary btn-block"
              id="Submit"
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
            id="Submit"
            disabled={loading || currentUser}
            onClick={handleSignup}
          >
            Submit
          </button>
        )}
        
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
