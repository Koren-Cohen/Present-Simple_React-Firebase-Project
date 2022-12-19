import { useState, useEffect } from "react";
import { db, deleteDocument, getCurrentUser } from "../../../firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import moment from "moment";
import "./PostsPage.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import CreatePostPopup from "./CreatePostPopup";
import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState("");
  const [allPosts, setPosts] = useState([]);

  //imports the 'GiftPosts' collection from the firestore db
  const GiftPostsColleRef = collection(db, "GiftPosts");

  function deletePost(docId) {
    const answer = window.confirm("Are you sure you want to delete this post?");
    if (!answer) {
      return;
    }
    deleteDocument("GiftPosts", docId);
  }

  const deleteBtnPrem = (post) => {
    const user = getCurrentUser();

    if (user.uid == post.User_ID) {
      return true;
    }
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const data = await getDocs(GiftPostsColleRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllPosts();
  }, []);

  return (
    <div>
      <div class="mainTitle">
        <b>Gift Post's</b>
      </div>

      <div class="newPostPopupBtn">
        <p>What is the next gift you would like to receive?</p>
        <Button variant="info btn-block" onClick={() => setModalShow(true)}>
          Share Now
        </Button>
        {/* Popup dialog element: */}
        <CreatePostPopup
          onPostCreated={() => setModalShow(false)}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>

      <div style={{ flexWrap: "wrap" }} class="d-flex justify-content-center">
        {/* Show all the posts list  */}
        {allPosts.map((post) => {
          return (
            <div class="mx-3 position-relative postCard" key={post.id}>
              <div class="postCardContent">
                <div class="d-flex">
                  <img
                    style={{ borderRadius: "50%" }}
                    src="./images/Avatar.jpg"
                    width="10%"
                    height="10%"
                  />
                  <h5
                    class="postTitle"
                    style={{ marginLeft: "3%", marginTop: "5px" }}
                  >
                    <b>{post.FullName}</b>
                  </h5>

                  <div>
                    {deleteBtnPrem(post) ? (
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        class="btn btn-outline-danger btn-sm position-absolute top-0 end-0" /*onClick={handleLogout}*/
                        style={{ margin: "3%" }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    ) : null}
                  </div>
                </div>
                <div class="dropdown-divider"></div>

                <b>Event: </b>
                {post.Event_Type}
                <div>
                  {" "}
                  <div class="form-row">
                    {" "}
                    <b>When ? </b>
                    {moment(post.Event_Date.toDate()).format("ll")}
                  </div>
                  <div class="form-row">
                    {" "}
                    <b>Gift Category: </b> {post.Gift_Category}
                  </div>
                  <div class="form-row">
                    <b>Favorite Brand: </b>
                    {post.Favorite_Brand}
                  </div>
                  <div class="form-row">
                    <b>Gift URL: </b>
                    {post.Gift_URL}
                  </div>
                  <div class="form-row">
                    <b>Gift Description: </b>
                    {post.Description}
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted d-flex position-relative">
                  <div>
                    Post created at:{" "}
                    {moment(post.Created_At.toDate()).format("lll")}
                  </div>
                  <div class="position-absolute top-50 end-0 translate-middle-y">
                    {post.PublishPlatform == "Web" ? (
                      <img
                        style={{ borderRadius: "50%" }}
                        src="./images/webFav.png"
                        width="20px"
                        height="20px"
                      />
                    ) : (
                      <img
                        style={{ borderRadius: "50%" }}
                        src="./images/androidFav.png"
                        width="20px"
                        height="20px"
                      />
                    )}
                  </div>
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsPage;
