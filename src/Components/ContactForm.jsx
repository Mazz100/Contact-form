import React from "react";
import SubmitButton from "./SubmitButton";

const ContactFormComponent = () => {
  return (
    <form className="contact-form">
      <h1 className="header-h1">Contact Us</h1>
      <div className="desktop-text-label-wrapper">
        <div>
          <label className="input-text-label" htmlFor="firstname">
            First Name
          </label>

          <input
            className="text-input"
            type="text"
            name="firstname"
            value={""}
            id="firstname"
          />
        </div>
        <div>
          <label className="input-text-label" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="text-input"
            type="text"
            name="lastname"
            value={""}
            id="lastname"
          />
        </div>
      </div>

      <label className="input-text-label" htmlFor="emailaddress">
        Email Address
      </label>
      <input
        className="text-input"
        type="email"
        name="emailaddress"
        value={""}
        id="emailaddress"
      />

      <p className="query-text">Query Type</p>

      <div className="query-wrapper">
        <label className="query-label">
          <input className="query-input" type="radio" name="query" />
          General Enquiry
        </label>

        <label className="query-label">
          <input className="query-input" type="radio" name="query" />
          Support Request
        </label>
      </div>

      <label className="input-text-label" htmlFor="message">
        Message
      </label>
      <textarea
        className="message-text"
        name="Message"
        id="message"
        aria-label="contact message text"
      ></textarea>

      <div className="consent-wrapper">
        <input
          className="checkbox-input"
          type="checkbox"
          name="consent-agreement"
        />
        <label className="input-checkbox-label">
          I consent to being contacted by the team
        </label>
      </div>

      <SubmitButton />
    </form>
  );
};

export default ContactFormComponent;
