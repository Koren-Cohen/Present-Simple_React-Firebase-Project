import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import "./PostsPage.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import CreatePostPopup from "./CreatePostPopup";
import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [allPosts, setPosts] = useState([]);
  //imports the 'GiftPosts' collection from the firestore db
  const PostsCollectionRef = collection(db, "GiftPosts");

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await getDocs(PostsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllPosts();
  }, []);

  return (
    <div>
      <div id="Main_Title">
        <i id="Main_Title_Icon" className="fas fa-info-circle"></i>{" "}
        <b>Gift Post's</b>
      </div>

      <div id="NewPostPopupBtn">
        <Button variant="info btn-block" onClick={() => setModalShow(true)}>
          What is the next gift you would like to receive? Share Now
        </Button>
        {/* Popup dialog element: */}
        <CreatePostPopup show={modalShow} onHide={() => setModalShow(false)} />
      </div>

      {/* Show all the posts list  */}
      {allPosts.map((post) => {
        return (
          <div id="post-card">
            <div id="img-box">
              <img src="./images/Avatar.jpg" width="200" height="200" />
            </div>
            <div id="form-box">
              {" "}
              <h5 class="card-title">
                <b>{post.FullName}'s Event: </b>
                {post.Event_Type}
              </h5>
              <div id="form-row">
                {" "}
                <b>Event Date: </b>
                {moment(post.Event_Date.toDate()).format("ll")}
              </div>
              <div id="form-row">
                {" "}
                <b>Gift Category: </b> {post.Gift_Category}
              </div>
              <div id="form-row">
                <b>Favorite Brand: </b>
                {post.Favorite_Brand}
              </div>
              <div id="form-row">
                <b>Gift URL: </b>
                {post.Gift_URL}
              </div>
              <div id="form-row">
                <b>Gift Discription: </b>
                {post.Discription}
              </div>
              <div class="card-footer">
                <small class="text-muted">
                  Post created at:{" "}
                  {moment(post.Created_At.toDate()).format("lll")}
                </small>
              </div>
            </div>
            <div id="deleteBtn">
              <button
                type="button"
                class="btn btn-outline-danger" /*onClick={handleLogout}*/
              >
                {/* !currentUser - means when the user connected */}
                {/* currentUser - means when the user disconnected */}
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsPage;
