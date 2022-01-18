import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import './PostsPage.css';
import { Row, Col, Container, Card } from 'react-bootstrap';

const PostsPage = () => {
  const [users, setUsers] = useState([]);
  //imports the 'Users' collection from the db
  const usersCollectionRef = collection(db, 'Users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div>
            {users.map((user) => {
              return (
                <div className="post" class="card border-primary mb-3 ">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="./images/Avatar.jpg" class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>{user.fullName}</b>
                        </h5>
                        <p class="card-text">Date of birth: {moment(user.dateOfBirth.toDate()).format('ll')} </p>
                        <div> This is a card example. </div>
                        <div class="card-footer">
                          <small class="text-muted">Joined at: {moment(user.createdAt.toDate()).format('lll')}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default PostsPage;
