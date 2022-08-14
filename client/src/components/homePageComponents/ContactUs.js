import React from "react";
import "../../styles/homepageStyles/homepageContactUs.modules.css";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then((result) => {
        console.log(result.text);
        alert("Your form submission has been successfully received!");
      })
      .catch((err) => console.log(err));
    e.target.reset();
  };

  return (
    <div className="contact-us">
      <form className="form-contact-us" onSubmit={handleSubmit}>
        <h3 className="title">CONTACT US</h3>
        <input type="text" placeholder="Full name" name="name"></input>
        <input type="text" placeholder="Email" name="email"></input>
        <input type="text" placeholder="Purpose" name="purpose"></input>
        <textarea placeholder="Enter text" name="message"></textarea>
        <button className="btn submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
