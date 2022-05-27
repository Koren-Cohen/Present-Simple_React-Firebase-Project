import React from 'react';
import './About.css';
import { Accordion } from 'react-bootstrap';

const About = () => {
  return (
    <div id="White_background">
      <div id="Main_Title" className="font-effect-shadow-multiple">
        <i id="Main_Title_Icon" className="fas fa-info-circle"></i> <b>About Us</b>
      </div>
      <p id="SubTitle">
        How it Works ?<br />
        There is two sides: The Buyer side & The gift receiver side.
      </p>

      {/* <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {' '}
            <b>The Buyer side</b>
          </Accordion.Header>
          <Accordion.Body>
            Option for a personalized reminder before the celebration. • Saving many and despairing thoughts - Who among us has not encountered the
            dilemma of what to buy for a friend who is celebrating soon? What is his / her taste and style? What size is his / her clothing item? •
            Save time and fuel - Today most of us go to the mall to see the selection that the stores have to offer, hoping that out of the huge and
            confusing selection that is there, we will find the gift that we think is right for those who are celebrating. • The end of unhelpful
            consultations with other people - Usually when we go to the mall, we take someone else with us for counseling: spouse, parent, friend -
            from now on we will do them a favor and let them rest. Order from the Internet - Today we are aware of the huge advantage of purchasing
            from the Internet, without being limited in the selection of malls. In 'Present Simple', we simply order through the website / app and
            receive the gift up to our house or the house of the person celebrating, professionally wrapped, and with a greeting card ready with a
            personal dedication that can be written in advance on the website / app.
            <img alt="Buying_Gift_Img" src="./images/Buying_Gift.jpg" id="Center_Photo" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {' '}
            <b>The gift receiver side</b>
          </Accordion.Header>
          <Accordion.Body>
            For those who receive the gift, these are the following benefits:
            <br />
            <ul>
              • The person celebrating will present to his friends:
              <br />
              <ul>
                1. What is its exact size (XS, S, M, L, XL, XXL).
                <br />
                2. What is its taste and style. (Types of preferences for dodge: favorite colors, tight-fitting / loose clothing and more).
                <br />
                3. What are the favorite categories of the person celebrating (to target the person purchasing the gift):
                <br />
                Kitchen Products | Books | Gadgets | Clothing (Sporty / Elegant / Casual) | Consoles and Technology | Jewelry | Cultivation | Speakers
                and audio | and lots of other categories.
              </ul>
              • Whoever celebrates will no longer receive unnecessary and unhelpful gifts that fail to excite him!
              <br />
              <ul>
                1. Through the website / app, the person celebrating will save the trip to the store from which the gift was purchased, and he will no
                longer have unnecessary credits left.
                <br />
                On the next birthday you will receive exactly the gifts you dreamed of - and even if you want to Maintain the surprise effect - you
                will receive a gift from the favorite categories you have chosen!
              </ul>
            </ul>
            <img alt="Receive_Gift_Img" src="./images/Receive_Gift.jpg" id="Center_Photo" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}

      <p>
        <b>The Buyer side:</b>
        <br />
        Benefits of the gift buyer:
        <ul>
          • Option for a personalized reminder before the celebration. • Saving many and despairing thoughts - Who among us has not encountered the
          dilemma of what to buy for a friend who is celebrating soon? What is his / her taste and style? What size is his / her clothing item? • Save
          time and fuel - Today most of us go to the mall to see the selection that the stores have to offer, hoping that out of the huge and
          confusing selection that is there, we will find the gift that we think is right for those who are celebrating. • The end of unhelpful
          consultations with other people - Usually when we go to the mall, we take someone else with us for counseling: spouse, parent, friend - from
          now on we will do them a favor and let them rest. Order from the Internet - Today we are aware of the huge advantage of purchasing from the
          Internet, without being limited in the selection of malls. In 'Present Simple', we simply order through the website / app and receive the
          gift up to our house or the house of the person celebrating, professionally wrapped, and with a greeting card ready with a personal
          dedication that can be written in advance on the website / app.
        </ul>
        <img alt="Buying_Gift_Img" src="./images/Buying_Gift.jpg" id="Center_Photo" />
      </p>
      <p>
        <b>The gift receiver side:</b>
        <br />
        For those who receive the gift, these are the following benefits:
        <br />
        <ul>
          • The person celebrating will present to his friends:
          <br />
          <ul>
            1. What is its exact size (XS, S, M, L, XL, XXL).
            <br />
            2. What is its taste and style. (Types of preferences for dodge: favorite colors, tight-fitting / loose clothing and more).
            <br />
            3. What are the favorite categories of the person celebrating (to target the person purchasing the gift):
            <br />
            Kitchen Products | Books | Gadgets | Clothing (Sporty / Elegant / Casual) | Consoles and Technology | Jewelry | Cultivation | Speakers and
            audio | and lots of other categories.
          </ul>
          • Whoever celebrates will no longer receive unnecessary and unhelpful gifts that fail to excite him!
          <br />
          <ul>
            1. Through the website / app, the person celebrating will save the trip to the store from which the gift was purchased, and he will no
            longer have unnecessary credits left.
            <br />
            On the next birthday you will receive exactly the gifts you dreamed of - and even if you want to Maintain the surprise effect - you will
            receive a gift from the favorite categories you have chosen!
          </ul>
        </ul>
        <img alt="Receive_Gift_Img" src="./images/Receive_Gift.jpg" id="Center_Photo" />
      </p>
      <p id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple - Developed by Koren Cohen
      </p>
    </div>
  );
};

export default About;
