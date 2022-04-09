// Font Awesome Source
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div id="White_background">
      <div id="Main_Title">
        <b>
          Present <FontAwesomeIcon icon={faArrowAltCircleRight} /> Simple
        </b>
      </div>
      <p id="Sub_title">Welcome to 'Present Simple' - Developed by Koren Cohen</p>
      Every year during the year, we encounter the following dilemmas:
      <p>
        <ul>
          • What gift to buy for a spouse, family, a friend, a father / mother and any acquaintance?
          <br />
          • To what extent is the shirt / pants / shoes I want to buy for him / her?
          <br />
          • What is their taste and what is their favorite style?
          <br />
          • As happy owners - we receive gifts that we did not always want or do not use, and in some cases have to go to a fat store bought the gift
          and replace it or worse to stay with a credit!
          <br />
        </ul>
      </p>
      <img alt="confused_customer_Img" src="./images/confused_customer.png" id="Center_Photo" />.
      <br />
      We are here to solve these dilemmas and thoughts for you! <br />
      'Present Simple' basically gives everyone the opportunity to create their own personal profile, and choose the gifts they would like to receive
      as a gift for any festive occasion:
      <ul>
        • Birthdays.
        <br />
        • Anniversaries.
        <br />
        • Recruitment and release from the army.
        <br />
        • Bar/Bat Mitzvah.
        <br />
        • And more...
        <br />
      </ul>
      <img alt="Happy_customer_Img" src="./images/Happy_customer.png" id="Center_Photo" />.
      <br />
      On our site you can perform a variety of activities, for example: <br />
      Read about us, sign up for our site and enjoy the service we provide, edit your personal profile, view your friend's profiles, and start
      receiving gifts for your happy occasions - and also buy for your friends!
      <br />
      <br />
      What are you waiting for? <a href="/signup"> Sign Up </a>
      now!
      <br />
      <br />
      <br />
      <p id="copyright">
        Ⓒ Present <i className="far fa-arrow-alt-circle-right"></i> Simple - Developed by Koren Cohen
      </p>
    </div>
  );
};

export default Home;
