import React, { useEffect, useReducer, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";

const ContactFormComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [consentCheck, setConsentCheck] = useState(false);

  //Query values
  const queries = [
    { id: 1, label: "General Enquiry", value: "General Enquiry" },
    { id: 2, label: "Support Request", value: "Support Request" },
  ];

  //Error text
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [consentError, setConsentError] = useState(false);

  //onChange for input values
  const handleFirstName = (e) => {
    const firstNameValue = e.target.value;
    setFirstName(firstNameValue);
  };
  const handleLastName = (e) => {
    const lastNameValue = e.target.value;
    setLastName(lastNameValue);
  };
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };
  const handleMessage = (e) => {
    const messageValue = e.target.value;
    setMessage(messageValue);
  };

  const handleSelectedQuery = (e) => {
    const queryValue = e.target.value;
    setSelectedQuery(queryValue);
    console.log(selectedQuery);
  };

  const onSubmitValidation = (e) => {
    e.preventDefault();

    const invalidFirstName = !firstName || firstName.trim() == "";
    const invalidLastName = !lastName || lastName.trim() == "";
    const invalidEmail = !email || email.trim() == "";
    const invalidMessage = !message || message.trim() == "";
    const invalidSelectedQuery = !selectedQuery;
    const invalidCheckedConsent = !consentCheck;
    setFirstNameError(invalidFirstName);
    setLastNameError(invalidLastName);
    setEmailError(invalidEmail);
    setMessageError(invalidMessage);
    setQueryError(invalidSelectedQuery);
    setConsentError(invalidCheckedConsent);
  };

  useEffect(() => {
    if (firstName.length > 0 && firstName.trim() != "") {
      setFirstNameError(false);
    } else if (lastName.length > 0 && lastName.trim() != "") {
      setLastNameError(false);
    } else if (email.length > 0 && email.trim() != "") {
      setEmailError(false);
    } else if (message.length > 0 && message.trim() != "") {
      setMessageError(false);
    } else if (selectedQuery != "") {
      setQueryError(false);
    } else {
      setConsentError(false);
    }
  }, [firstName, lastName, message, email, selectedQuery, consentCheck]);

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
            value={firstName}
            onChange={handleFirstName}
            id="firstname"
            required
          />

          {firstNameError && (
            <span className="error-text">This field is required</span>
          )}
        </div>
        <div>
          <label className="input-text-label" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="text-input"
            type="text"
            name="lastname"
            value={lastName}
            onChange={handleLastName}
            id="lastname"
            required
          />

          {lastNameError && (
            <span className="error-text">This field is required</span>
          )}
        </div>
      </div>

      <label className="input-text-label" htmlFor="emailaddress">
        Email Address
      </label>
      <input
        className="text-input"
        type="email"
        name="emailaddress"
        value={email}
        onChange={handleEmail}
        id="emailaddress"
        required
      />

      {emailError && (
        <span className="error-text">Please enter a valid email address</span>
      )}

      <p className="query-text">Query Type</p>

      <div className="query-wrapper">
        {queries.map((query) => (
          <label key={query.id} className="query-label">
            <input
              className="query-input"
              type="radio"
              name="query"
              value={query.value}
              onChange={handleSelectedQuery}
              required
            />
            {query.label}
          </label>
        ))}
      </div>
      {/* Query error text element*/}
      {queryError && <span className="error-text">Please select a query</span>}

      <label className="input-text-label" htmlFor="message">
        Message
      </label>
      <textarea
        className="message-text"
        name="Message"
        id="message"
        value={message}
        onChange={handleMessage}
        aria-label="contact message text"
        required
      ></textarea>

      {messageError && (
        <span className="error-text">This field is required</span>
      )}

      <div className="checkbox-wrapper">
        <input
          className="checkbox-input"
          type="checkbox"
          name="consent-agreement"
          id="consent checkbox"
          onChange={(e) => setConsentCheck(e.target.checked)}
          checked={consentCheck}
        />

        <label className="input-checkbox-label" htmlFor="consent checkbox">
          I consent to being contacted by the team
        </label>
      </div>

      {/*error text element for consent checkbox*/}
      {consentError && (
        <span className="error-text">
          To submit this form, please consent to being contacted
        </span>
      )}

      <SubmitButton validate={onSubmitValidation} />
    </form>
  );
};

export default ContactFormComponent;
