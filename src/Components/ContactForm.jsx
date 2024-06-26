import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";

const ContactFormComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [consentCheck, setConsentCheck] = useState(false);

  //Message text letters length
  const [minText, setMinText] = useState(0);
  const [maxText, setMaxText] = useState(500);

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

    let emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailReg.test(email)) {
      setEmailError(false);
    }
  };
  const handleMessage = (e) => {
    const messageValue = e.target.value;
    setMessage(messageValue);
  };

  const handleSelectedQuery = (e) => {
    const queryValue = e.target.value;
    setSelectedQuery(queryValue);
  };

  const handleConsentCheck = (e) => {
    const checkValue = e.target.checked;
    setConsentCheck(checkValue);
  };

  useEffect(() => {
    if (firstName.trim() != "") {
      setFirstNameError(false);
    }
    if (lastName.trim() != "") {
      setLastNameError(false);
    }
    if (message.trim() != "") {
      setMessageError(false);
    }
    if (selectedQuery != "") {
      setQueryError(false);
    }
    if (consentCheck) {
      setConsentError(false);
    }

    //Update message length and display for user
    setMinText(message.length);
  }, [firstName, lastName, message, selectedQuery, consentCheck, minText]);

  const onSubmitValidation = (e) => {
    e.preventDefault();

    const invalidFirstName = !firstName || firstName.trim() == "";
    const invalidLastName = !lastName || lastName.trim() == "";

    let emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const invalidEmail = !emailReg.test(email);

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
            style={firstNameError ? { borderColor: "red" } : null}
            type="text"
            name="firstname"
            value={firstName}
            onChange={handleFirstName}
            id="firstname"
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
            style={lastNameError ? { borderColor: "#d73c3c" } : null}
            type="text"
            name="lastname"
            value={lastName}
            onChange={handleLastName}
            id="lastname"
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
        style={emailError ? { borderColor: "#d73c3c" } : null}
        type="email"
        name="emailaddress"
        value={email}
        onChange={handleEmail}
        id="emailaddress"
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
        style={messageError ? { borderColor: "#d73c3c" } : null}
        name="Message"
        id="message"
        value={message}
        onChange={handleMessage}
        aria-label="contact message text"
        minLength={minText}
        maxLength={maxText}
      ></textarea>

      {/*Displaying min/max letters for user*/}
      <div className="messag-length-wrapper">
        {minText > 0 && <span>{`${minText} / ${maxText}`}</span>}
      </div>

      {messageError && (
        <span className="error-text">This field is required</span>
      )}

      <div className="checkbox-wrapper">
        <input
          className="checkbox-input"
          type="checkbox"
          name="consent-agreement"
          id="consent-checkbox"
          onChange={handleConsentCheck}
          defaultChecked={false}
        />

        <label className="input-checkbox-label" htmlFor="consent-checkbox">
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
