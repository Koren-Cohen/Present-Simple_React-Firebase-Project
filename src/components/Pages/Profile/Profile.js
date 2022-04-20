import { useAuth, db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getAuth, updateProfile } from 'firebase/auth';

export default function Profile() {
  const currentUser = useAuth();
  const [users, setUsers] = useState([]);
  //imports the 'Users' collection from the db
  const usersCollectionRef = collection(db, 'Users');

  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <div className="fields">
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img src="./images/Avatar.jpg" alt="Admin" class="rounded-circle" width="150" />
                      <div class="mt-3">
                        <h4>{/* fullName */}</h4>
                        <p class="emailDes">{/* {moment(user.dateOfBirth.toDate()).format('ll')} */}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div>
                      <div>
                        {''}
                        <p>
                          <b>Full Name:</b>
                          {/* {user.fullName} */}
                        </p>
                        <p>
                          <b>Date of birth:</b>
                          {/* {moment(user.dateOfBirth.toDate()).format('ll')} */}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <p>
                        <b>Email:</b>
                        {/* {currentUser?.email} */}
                      </p>
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
