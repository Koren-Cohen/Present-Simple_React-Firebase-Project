import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './PostsPage.css';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

function CreatePostPopup(props) {
  //   Input REFERENCES - useState
  const [EventTypeBox, setNewEventType] = useState('');
  const [EventDateBox, setNewEventDate] = useState('');
  const [GiftCategoryBox, setNewGiftCategory] = useState('');
  const [FavoriteBrandBox, setNewFavoriteBrand] = useState('');
  const [GiftURLBox, setNewGiftURL] = useState('');
  const [Text_AreaBox, setNewText_AreaID] = useState('');

  //-------------------ADDING POST TO THE DATABASE-------------------//

  //   Inputs
  //   let EventTypeBox = document.getElementById('EventTypebox');
  //   let EventDateBox = document.getElementById('EventDatebox');
  //   let GiftCategoryBox = document.getElementById('GiftCategorybox');
  //   let FavoriteBrandBox = document.getElementById('FavoriteBrandbox');
  //   let GiftURLBox = document.getElementById('GiftURLbox');
  //   let Text_AreaBox = document.getElementById('Text_AreaIDbox');

  //-------------------ADDING DOCUMENT-------------------//

  //Add Document - Auto ID

  async function AddDocument_AutoID() {
    var ref = collection(db, 'Gifts-Posts-List');

    const docRef = await addDoc(ref, {
      Created_At: serverTimestamp(),
      Event_Type: EventTypeBox,
      Event_Date: Timestamp.fromDate(new Date(EventDateBox)).toDate(),
      Gift_Category: GiftCategoryBox,
      Favorite_Brand: FavoriteBrandBox,
      Gift_URL: GiftURLBox,
      Discription: Text_AreaBox,
    })
      .then(() => {
        alert('Gift Post added successfully!');
      })
      .catch((error) => {
        alert('Unsuccessful operation, error:', error);
      });
  }

  //-------------------Return HTML-------------------//

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New Gift Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Fill The Following Fields:</h5>
        <div>
          <div>
            <label>Event type:</label>
            <select
              id="EventTypebox"
              required
              onChange={(event) => {
                setNewEventType(event.target.value);
              }}
            >
              <option value="Birthday">Birthday</option>
              <option value="Holiday">Holiday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Wedding">Wedding</option>
              <option value="Bar/Bat Mitzvah">Bar/Bat Mitzvah</option>
              <option value="Military enlistment">Military enlistment</option>
              <option value="Release from army">Release from army</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Event date:</label>
            <input
              id="EventDatebox"
              type="date"
              required
              onChange={(event) => {
                setNewEventDate(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Gift Category:</label>
            <select
              id="GiftCategorybox"
              required
              onChange={(event) => {
                setNewGiftCategory(event.target.value);
              }}
            >
              <optgroup label="Fashion">
                <option value="Fashion-Elegant">Elegant</option>
                <option value="Fashion-Casual">Casual</option>
                <option value="Fashion-Sporty">Sporty</option>
                <option value="Fashion-Other">Fashion-Other</option>
              </optgroup>

              <optgroup label="Electronics">
                <option value="Electronics-Gadgets">Gadgets</option>
                <option value="Electronics-Video Games">Video Games</option>
                <option value="Electronics-Smartphones">Smartphones</option>
                <option value="Electronics-Other">Electronics-Other</option>
              </optgroup>

              <optgroup label="Home Products">
                <option value="Home-Kitchen">Kitchen</option>
                <option value="Home-Furniture">Furniture</option>
                <option value="Home-Other">Home-Other</option>
              </optgroup>

              <optgroup label="Other Categories">
                <option value="Other-Gift Card">Gift Card</option>
                <option value="Other-Jewelry">Jewelry</option>
                <option value="Other-Category">Other-Category</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label>Favorite brand:</label>
            <input
              id="FavoriteBrandbox"
              type="text"
              required
              onChange={(event) => {
                setNewFavoriteBrand(event.target.value);
              }}
            />
          </div>

          <div>
            <label>Direct link to the gift site:</label>
            <input
              id="GiftURLbox"
              type="url"
              required
              onChange={(event) => {
                setNewGiftURL(event.target.value);
              }}
            />
          </div>

          <textarea
            id="Text_AreaIDbox"
            name="message"
            rows="5"
            cols="50"
            placeholder="Here is the place to add more details (Favorite figure, sizes, colors, product model/version and more...)"
            required
            onChange={(event) => {
              setNewText_AreaID(event.target.value);
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          id="Submit"
          onClick={() => {
            AddDocument_AutoID();
          }}
        >
          Submit
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostPopup;
