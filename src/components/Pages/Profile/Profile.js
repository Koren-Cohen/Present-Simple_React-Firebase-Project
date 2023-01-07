import {
  db,
  getUserData,
  deleteUserFirebase,
  getLoggedInUser,
  storage,
  changeUserPassword,
} from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { getAuth } from "firebase/auth";
import CreatePostPopup from "../PostsPage/CreatePostPopup";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareSquare,
  faUserEdit,
  faUsersSlash,
  faUpload,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";

export default function Profile() {
  //The CreatePostPopup() useState
  const [modalShow, setModalShow] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    dateOfBirth: null,
    email: "",
    joinedAt: null,
    uid: "",
    joinPlatform: "",
  });
  const [usersFullName, setUsersFullName] = useState("");
  const [usersDateOfBirth, setUsersDateOfBirth] = useState("");
  const [usersJoinTime, setUsersJoinTime] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [changePass, setChangePass] = useState(false);
  const [newPassword, setPasswordChange] = useState(false);
  const [confNewPassword, setConfPasswordChange] = useState(false);

  const handleChangePasswordDiv = () => {
    setChangePass(!changePass);
    setPasswordChange("");
    setConfPasswordChange("");
  };

  const passwordRef = useRef();
  const passwordConfRef = useRef();

  const handleChangePassword = async () => {
    if (passwordConfRef.current.value != passwordRef.current.value) {
      alert("The password confirmation does not match");
      return;
    } else {
      await changeUserPassword(newPassword);
      handleChangePasswordDiv();
    }
  };

  const uploadImage = async () => {
    if (!imageUpload) {
      alert("No image selected");
      return;
    }

    try {
      const imageRef = ref(storage, "userProfilePics/" + userData.user_ID);

      await uploadBytes(imageRef, imageUpload);
      window.location.reload();
      alert("Image uploaded");
    } catch (error) {
      alert(
        "Error Code: " + error.code + "\nError message: '" + error.message + "'"
      );
    }
  };

  useEffect(async () => {
    try {
      setUserData(await getUserData());
    } catch (error) {
      alert(
        "Error Code: " + error.code + "\nError message: '" + error.message + "'"
      );
    }

    try {
      const listRef = ref(storage, "userProfilePics/");
      const response = await listAll(listRef);
      console.log("🚀 - useEffect - response", response);

      const user = getLoggedInUser();

      response.items.forEach(async (image) => {
        console.log(image.name + "==" + user.uid);
        if (image.name == user.uid) {
          const picUrl = await getDownloadURL(image);
          setProfileImage(picUrl);
        }
      });
    } catch (error) {
      alert(
        "Error Code: " + error.code + "\nError message: '" + error.message + "'"
      );
    }
  }, []);

  // Get the currentUser details
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;
  const uid = user.uid;

  const docRef = doc(db, "Users", uid);

  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      setUsersFullName(userData.fullName);
      setUsersDateOfBirth(
        moment(docSnap.data().dateOfBirth.toDate()).format("LL")
      );
      setUsersJoinTime(moment(docSnap.data().createdAt.toDate()).format("lll"));
    } else {
      alert("No such Document");
    }
  });

  const handleDeleteUser = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete this User ?"
    );
    if (!answer) {
      return;
    }
    await deleteUserFirebase();
  };

  return (
    <div>
      <div className="fields">
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                {/* Left Top box - Profile pic and bio*/}
                <div class="card" style={{ backgroundColor: "#e4edfa" }}>
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          width="150"
                          style={{
                            borderRadius: "30px",
                            border: "solid",
                            borderColor: "#7da2e0",
                          }}
                        />
                      ) : (
                        <img
                          src="./images/Avatar.jpg"
                          width="150"
                          style={{
                            borderRadius: "30px",
                            border: "solid",
                            borderColor: "#7da2e0",
                          }}
                        />
                      )}

                      <div class="mt-3">
                        <h4>{usersFullName}</h4>

                        <div class="dropdown-divider"></div>
                        <div
                          style={{
                            margin: "0px 25%",
                          }}
                        >
                          <Tooltip
                            title="Upload profile picture"
                            placement="top"
                            onClick={uploadImage}
                            arrow
                          >
                            <IconButton size="small" color="info">
                              <FontAwesomeIcon icon={faUpload} />
                            </IconButton>
                          </Tooltip>
                          <input
                            type={"file"}
                            onChange={(event) => {
                              setImageUpload(event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body" style={{ backgroundColor: "#e4edfa" }}>
                    <div
                      class="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <b>Full name:</b>
                      {usersFullName}
                    </div>

                    <div class="dropdown-divider"></div>

                    <div
                      class="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <b>Date of birth:</b>
                      {usersDateOfBirth}
                    </div>
                    <div class="dropdown-divider"></div>

                    <div
                      class="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <b>Email:</b>
                      {email}
                    </div>
                    <div class="dropdown-divider"></div>

                    <div
                      class="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <b>Joined at:</b> {usersJoinTime}
                    </div>

                    <div class="dropdown-divider"></div>
                    <div
                      class="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <b>Joined platform:</b> {userData.joinPlatform}
                    </div>
                  </div>
                </div>
                <div
                  class="card mt-3"
                  style={{ padding: "10px 0px", backgroundColor: "#e4edfa" }}
                >
                  <div
                    class="d-flex"
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div>Account Actions:</div>
                    <Tooltip
                      title="Share post"
                      placement="top"
                      onClick={() => setModalShow(true)}
                      arrow
                    >
                      <IconButton size="small" color="success">
                        <FontAwesomeIcon icon={faShareSquare} />
                      </IconButton>
                    </Tooltip>
                    <CreatePostPopup
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <Tooltip title="Edit profile" placement="top" arrow>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={handleChangePasswordDiv}
                      >
                        <FontAwesomeIcon icon={faUserEdit} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete user" placement="top" arrow>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={handleDeleteUser}
                      >
                        <FontAwesomeIcon icon={faUsersSlash} />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {changePass ? (
                    <div>
                      <div
                        class="d-flex"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <b
                          style={{
                            margin: "10px",
                            fontSize: "13px",
                          }}
                        >
                          Change password:{" "}
                        </b>{" "}
                        <input ref={passwordRef} type={"password"}></input>
                        <b
                          style={{
                            margin: "10px",
                            fontSize: "13px",
                          }}
                        >
                          Confirm password:{" "}
                        </b>{" "}
                        <input ref={passwordConfRef} type={"password"}></input>
                        <Tooltip
                          title="Change password"
                          placement="right"
                          arrow
                        >
                          <IconButton
                            color="success"
                            size="small"
                            onClick={handleChangePassword}
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div
                        class="d-flex"
                        style={{
                          justifyContent: "start",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      ></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
