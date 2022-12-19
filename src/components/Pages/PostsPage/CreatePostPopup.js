import React from "react";
import { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import "./PostsPage.css";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { events, giftCategories } from "../../../Utils";
import Textarea from "@mui/joy/Textarea";

const CreatePostPopup = (props) => {
  const [eventType, setNewEventType] = useState("");
  const [eventDate, setNewEventDate] = useState("");
  const [giftCategory, setNewGiftCategory] = useState("");
  const [favoriteBrand, setNewFavoriteBrand] = useState("");
  const [giftUrl, setNewGiftURL] = useState("");
  const [giftDescription, setGiftDescription] = useState("");
  const [fullName, setFullName] = useState(""); //used to log the post's username

  const eventTypeRef = useRef();
  const eventDateRef = useRef();
  const giftCatRef = useRef();
  const favBrandRef = useRef();
  const giftUrlRef = useRef();
  const giftDescRef = useRef();

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const email = user.email;

  const docRef = doc(db, "Users", uid);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      setFullName(docSnap.data().fullName);
    } else {
      alert("No such Document");
    }
  });

  const clearFields = () => {
    setNewEventType("");
    setNewEventDate("");
    setNewGiftCategory("");
    setNewFavoriteBrand("");
    setNewGiftURL("");
    setGiftDescription("");
  };

  const validateFields = () => {
    if (eventTypeRef.current.value == "" || !eventTypeRef.current.value) {
      alert("'Event type' field is empty.\nPlease input value.");
      return;
    } else if (
      eventDateRef.current.value == "" ||
      !eventDateRef.current.value
    ) {
      alert("'Event date' field is empty.\nPlease input value.");
      return;
    } else if (giftCatRef.current.value == "" || !giftCatRef.current.value) {
      alert("'Gift category' field is empty.\nPlease input value.");
      return;
    }
  };

  async function AddNewGiftPost() {
    const answer = window.confirm("Are you sure you want to add the post?");
    if (!answer) {
      return;
    }
    if (!validateFields()) {
      return;
    }

    var ref = collection(db, "GiftPosts");

    const docRef = await addDoc(ref, {
      Created_At: serverTimestamp(),
      Event_Type: eventType,
      Event_Date: Timestamp.fromDate(new Date(eventDate)).toDate(),
      Gift_Category: giftCategory,
      Favorite_Brand: favoriteBrand,
      Gift_URL: giftUrl,
      Description: giftDescription,
      User_ID: uid,
      Email: email,
      FullName: fullName,
    })
      .then(() => {
        alert("Gift Post added successfully!");
        window.location.reload();
      })
      .catch((error) => {
        alert("Unsuccessful operation, error:", error);
        window.location.reload();
      });
  }

  //-------------------Return HTML-------------------//

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      class="createPostDialog"
    >
      <Modal.Header
        closeButton
        onClick={() => {
          clearFields();
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter" class="dialogMainTitle">
          <b>Create New Gift Post</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body class="dialogContent">
        <h5>Fill The Following Fields:</h5>
        <div>
          <div class="d-flex" style={{ marginTop: "20px" }}>
            <TextField
              required
              style={{ marginLeft: "5px", marginRight: "5px" }}
              inputRef={eventTypeRef}
              select
              size="medium"
              value={eventType}
              onChange={(event) => setNewEventType(event.target.value)}
              variant="filled"
              fullWidth
              id="filled-basic"
              label="Select event type"
            >
              {events.map((event) => (
                <MenuItem key={event.code} value={event.desc}>
                  {event.desc}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              style={{ marginLeft: "5px", marginRight: "5px" }}
              inputRef={giftCatRef}
              select
              size="medium"
              value={giftCategory}
              onChange={(event) => {
                setNewGiftCategory(event.target.value);
              }}
              variant="filled"
              fullWidth
              label="Select gift category"
            >
              {giftCategories.map((category) => (
                <MenuItem key={category.code} value={category.desc}>
                  {category.desc}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div class="d-flex" style={{ marginTop: "20px" }}>
            <TextField
              required
              style={{ marginLeft: "5px", marginRight: "5px" }}
              size="medium"
              type="date"
              fullWidth
              variant="filled"
              inputRef={eventDateRef}
              onChange={(event) => {
                setNewEventDate(event.target.value);
              }}
              value={eventDate}
              helperText="Select event date"
            />
            <TextField
              style={{ marginLeft: "5px", marginRight: "5px" }}
              inputRef={favBrandRef}
              size="medium"
              value={favoriteBrand}
              onChange={(event) => {
                setNewFavoriteBrand(event.target.value);
              }}
              variant="filled"
              fullWidth
              label="Favorite Brand"
            />
            <TextField
              style={{ marginLeft: "5px", marginRight: "5px" }}
              inputRef={giftUrlRef}
              size="medium"
              value={giftUrl}
              onChange={(event) => {
                setNewGiftURL(event.target.value);
              }}
              variant="filled"
              fullWidth
              label="Gift URL link"
            />
          </div>

          <div class="input-group">
            <Textarea
              style={{ width: "100%", marginTop: "10px" }}
              color="primary"
              value={giftDescription}
              inputRef={giftDescRef}
              disabled={false}
              minRows={3}
              placeholder="Feel free, describe the gift you dream of"
              size="md"
              variant="outlined"
              onChange={(event) => {
                setGiftDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div class="d-flex actionBtns align-items-center justify-content-center">
          <button
            style={{ margin: "20px 5px 0px 5px" }}
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              AddNewGiftPost();
              props.onPostCreated(false);
            }}
          >
            Add Gift Post
          </button>
          <button
            style={{ margin: "20px 5px 0px 5px" }}
            type="button"
            class="btn btn-danger"
            onClick={() => {
              clearFields();
            }}
          >
            Clear Fields
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePostPopup;
