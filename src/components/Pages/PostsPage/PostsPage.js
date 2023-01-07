import { useState, useEffect } from "react";
import {
  db,
  deleteDocument,
  getLoggedInUser,
  storage,
} from "../../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import moment from "moment";
import "./PostsPage.css";
import { Button } from "react-bootstrap";
import CreatePostPopup from "./CreatePostPopup";
import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";
import { async } from "@firebase/util";

const PostsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    createdAt: "",
    isAdmin: "",
    joinPlatform: "",
    user_ID: "",
  });
  const [allPosts, setPosts] = useState([]);
  const [photosUrls, setPhotosUrls] = useState([{ name: "", url: "" }]);
  const listRef = ref(storage, "userProfilePics/");

  useEffect(async () => {
    const getAllPics = async () => {
      try {
        const response = await listAll(listRef);
        const photos = response.items;

        const photosUrlsArray = photos.map(async (photo) => ({
          name: photo.name,
          url: await getDownloadURL(photo),
        }));

        return Promise.all(photosUrlsArray);
      } catch (error) {
        alert(
          "Error Code: " +
            error.code +
            "\nError message: '" +
            error.message +
            "'"
        );
      }
    };
    await getAllPics().then((arr) => {
      console.log("🚀 - awaitgetAllPics - arr", arr);
      setPhotosUrls(arr);
    });

    const getAllPosts = async () => {
      const data = await getDocs(q);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      const arr = allPosts.map((doc) => ({
        ...doc,
        photoUrl: photosUrls.find((photoObj) => photoObj.name == doc.User_ID),
      }));

      setPosts(arr);
      console.log("🚀 - arr - arr", arr);
    };
    await getAllPosts();

    const userDoc = localStorage.getItem("User Data");
    var userDataObj = JSON.parse(userDoc);

    setUserData(userDataObj);
  }, []);

  //imports the 'GiftPosts' collection from the firestore db
  const GiftPostsColleRef = collection(db, "GiftPosts");
  const q = query(GiftPostsColleRef, orderBy("Created_At", "desc"));

  function deletePost(docId) {
    const answer = window.confirm("Are you sure you want to delete this post?");
    if (!answer) {
      return;
    }
    deleteDocument("GiftPosts", docId);
  }

  const deleteBtnPrem = (post) => {
    const user = getLoggedInUser();
    if (userData.isAdmin) {
      return true;
    } else if (user.uid == post.User_ID) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div class="postsContainer">
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
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        <div style={{ flexWrap: "wrap" }} class="d-flex justify-content-center">
          {/* Show all the posts list  */}
          {allPosts.map((post) => {
            return (
              <div class="position-relative postCard" key={post.id}>
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
                        <Tooltip title="Delete post" placement="top" arrow>
                          <IconButton
                            style={{ margin: "3%" }}
                            class="btn btn-outline-danger btn-sm position-absolute top-0 end-0"
                            size="small"
                            color="error"
                            onClick={() => deletePost(post.id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </IconButton>
                        </Tooltip>
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
                        <Tooltip
                          title="Publish platform: Website"
                          placement="top"
                          arrow
                        >
                          <img
                            style={{ borderRadius: "50%" }}
                            src="./images/webFav.png"
                            width="20px"
                            height="20px"
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title="Publish platform: Android"
                          placement="top"
                          arrow
                        >
                          <img
                            style={{ borderRadius: "50%" }}
                            src="./images/androidFav.png"
                            width="20px"
                            height="20px"
                          />
                        </Tooltip>
                      )}
                    </div>
                  </small>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ marginTop: "30px" }} id="copyright">
          Ⓒ Present Simple - Developed by Koren Cohen
        </p>
      </div>
    </div>
  );
};

export default PostsPage;
