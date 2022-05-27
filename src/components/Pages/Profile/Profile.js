import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getAuth, updateProfile, deleteUser } from 'firebase/auth';
import { Row, Col, Container, Button } from 'react-bootstrap';
import CreatePostPopup from '../PostsPage/CreatePostPopup';
import { useId } from 'react';

export default function Profile() {
  //The CreatePostPopup() useState
  const [modalShow, setModalShow] = useState(false);

  // Get the currentUser details
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const uid = user.uid;
  console.log(auth);

  //-------------------GETTING DOCUMENT-------------------//

  const [usersFullName, setUsersFullName] = useState('');
  const [usersDateOfBirth, setUsersDateOfBirth] = useState('');
  const [usersJoinTime, setUsersJoinTime] = useState('');

  const docRef = doc(db, 'Users', uid);

  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      setUsersFullName(docSnap.data().fullName); //Pull the 'NameOfStd' value from the firestore DB -> to the input field: 'NameBox'
      setUsersDateOfBirth(moment(docSnap.data().dateOfBirth.toDate()).format('lll')); //Pull the 'Section' value from the firestore DB -> to the input field: 'SecBox'
      setUsersJoinTime(moment(docSnap.data().createdAt.toDate()).format('lll')); //Pull the 'Gender' value from the firestore DB -> to the input field: 'GenBox'
    } else {
      alert('No such Document');
    }
  });

  return (
    <div>
      <div className="fields">
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                {/* Left Top box - Profile pic and bio*/}
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img src="./images/Avatar.jpg" alt="Admin" width="150" />
                      <div class="mt-3">
                        <h4>{usersFullName}</h4>
                        <footer>
                          <b>Joined at:</b> {usersJoinTime}
                        </footer>
                        <p class="emailDes">{/* {moment(user.dateOfBirth.toDate()).format('ll')} */}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Left Bottom box - Profile actions*/}
                <div class="card mt-3">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h5>Account Actions:</h5>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <Button variant="btn btn-outline-info btn-block" onClick={() => setModalShow(true)}>
                        Share Post
                      </Button>{' '}
                      <CreatePostPopup show={modalShow} onHide={() => setModalShow(false)} />
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <Button variant="btn btn-outline-primary btn-block">Edit Profile</Button>{' '}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <Button variant="btn btn-outline-warning btn-block">Change Password</Button>{' '}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <Button variant="btn btn-outline-danger btn-block">Delete User</Button>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          {' '}
                          <b>Full Name:</b>
                          {usersFullName}
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          {' '}
                          <b>Date of birth:</b>
                          {usersDateOfBirth}
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                          {' '}
                          <b>Email:</b>
                          {email}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="row gutters-sm">
                  <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="d-flex align-items-center mb-3">
                          <ins>Hobbies</ins>
                        </h6>
                        <ul>
                          <li>
                            {' '}
                            <small>Web Design</small>
                          </li>
                          <li>
                            {' '}
                            <small>Website Markup</small>
                          </li>
                          <li>
                            {' '}
                            <small>One Page</small>
                          </li>
                          <li>
                            {' '}
                            <small>Mobile Template</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h6 class="d-flex align-items-center mb-3">
                          <ins>About me (Sizes, favorites and more)</ins>
                        </h6>
                        <ul>
                          <li>
                            {' '}
                            <small>Web Design</small>
                          </li>
                          <li>
                            {' '}
                            <small>Website Markup</small>
                          </li>
                          <li>
                            {' '}
                            <small>One Page</small>
                          </li>
                          <li>
                            {' '}
                            <small>Mobile Template</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
