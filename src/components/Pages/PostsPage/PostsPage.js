import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import './PostsPage.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import CreatePostPopup from './CreatePostPopup';
import React from 'react';

const PostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [allPosts, setPosts] = useState([]);
  //imports the 'Gifts-Posts-List' collection from the firestore db
  const PostsCollectionRef = collection(db, 'Gifts-Posts-List');

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await getDocs(PostsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllPosts();
  }, []);

  return (
    <div>
      <div id="NewPostPopup">
        <Button variant="btn btn-outline-primary btn-block" onClick={() => setModalShow(true)}>
          What is the next gift you would like to receive? Share Now
        </Button>
        {/* Popup dialog element: */}
        <CreatePostPopup show={modalShow} onHide={() => setModalShow(false)} />
      </div>

      <Container>
        <Row>
          <Col></Col>
          <Col id="PostCard">
            <div>
              {/* Show all the posts list  */}
              {allPosts.map((post) => {
                return (
                  <div className="post" class="card border-primary mb-3 ">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="./images/Avatar.jpg" class="img-fluid rounded-start" alt="..." />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">
                            <b>{post.Event_Type}</b>
                          </h5>
                          <p class="card-text">
                            <b>Event Date: </b>
                            {moment(post.Event_Date.toDate()).format('ll')}{' '}
                          </p>
                          <div>
                            <b>Gift Category: </b> {post.Gift_Category}
                          </div>
                          <div>
                            <b>Favorite Brand: </b>
                            {post.Favorite_Brand}
                          </div>
                          <div>
                            <b>Gift URL: </b>
                            {post.Gift_URL}
                          </div>
                          <div>
                            <b>Gift Discription: </b>
                            {post.Discription}
                          </div>
                          <div class="card-footer">
                            <small class="text-muted">Post created at: {moment(post.Created_At.toDate()).format('lll')}</small>
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
    </div>
  );
};

export default PostsPage;
