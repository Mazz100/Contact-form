import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "./SubmitButton";

const ContactForm = ({ setSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [consentCheck, setConsentCheck] = useState(false);

  //Email regular expression test
  let emailReg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Required inputs ref
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const queryRef = useRef();
  const messageRef = useRef();
  const consentRef = useRef();

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
    if (email.trim() != "") {
      setEmailError(false);
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
  }, [
    firstName,
    lastName,
    email,
    message,
    selectedQuery,
    consentCheck,
    minText,
  ]);

  const onSubmitValidation = (e) => {
    e.preventDefault();

    const invalidFirstName = firstName.trim() == "";
    const invalidLastName = lastName.trim() == "";
    const invalidEmail = !emailReg.test(email);
    const invalidMessage = message.trim() == "";
    const invalidSelectedQuery = !selectedQuery;
    const invalidCheckedConsent = !consentCheck;

    setFirstNameError(invalidFirstName);
    setLastNameError(invalidLastName);
    setEmailError(invalidEmail);
    setMessageError(invalidMessage);
    setQueryError(invalidSelectedQuery);
    setConsentError(invalidCheckedConsent);

    if (invalidFirstName) {
      firstNameRef.current.focus();
    } else if (invalidLastName) {
      lastNameRef.current.focus();
    } else if (invalidEmail) {
      emailRef.current.focus();
    } else if (invalidSelectedQuery) {
      queryRef.current.focus();
    } else if (invalidMessage) {
      messageRef.current.focus();
    } else if (invalidCheckedConsent) {
      consentRef.current.focus();
    }

    if (
      !invalidFirstName &&
      !invalidLastName &&
      emailReg.test(email) &&
      !invalidMessage &&
      selectedQuery &&
      consentCheck
    ) {
      setSuccess(true);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmitValidation} noValidate>
      <div className="header-wrapper">
        <h1 className="header-h1">Contact Us</h1>
        <span>
          Asterisk indicates required
          <svg
            className="asterisk"
            aria-hidden={true}
            enableBackground="new 0 0 128 128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
              fill="#0c7d69"
            />
          </svg>
        </span>
      </div>

      <div className="desktop-text-label-wrapper">
        <div>
          <label className="input-text-label" htmlFor="firstname">
            First Name
            <svg
              className="asterisk"
              aria-hidden={true}
              enableBackground="new 0 0 128 128"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
                fill="#0c7d69"
              />
            </svg>
          </label>

          <input
            className="text-input"
            ref={firstNameRef}
            style={firstNameError ? { borderColor: "#d73c3c" } : null}
            type="text"
            name="firstname"
            value={firstName}
            onChange={handleFirstName}
            id="firstname"
            required
            aria-required={!firstName && true}
            aria-invalid={!firstName && true}
            aria-errormessage="name-error"
          />

          {firstNameError && (
            <span className="error-text" id="name-error">
              This field is required
            </span>
          )}
        </div>
        <div>
          <label className="input-text-label" htmlFor="lastname">
            Last Name
            <svg
              className="asterisk"
              aria-hidden={true}
              enableBackground="new 0 0 128 128"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
                fill="#0c7d69"
              />
            </svg>
          </label>
          <input
            className="text-input"
            ref={lastNameRef}
            style={lastNameError ? { borderColor: "#d73c3c" } : null}
            type="text"
            name="lastname"
            value={lastName}
            onChange={handleLastName}
            id="lastname"
            required
            aria-required={!lastName && true}
            aria-invalid={!lastName && true}
          />

          {lastNameError && (
            <span className="error-text">This field is required</span>
          )}
        </div>
      </div>

      <label className="input-text-label" htmlFor="emailaddress">
        Email Address
        <svg
          className="asterisk"
          aria-hidden={true}
          enableBackground="new 0 0 128 128"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
            fill="#0c7d69"
          />
        </svg>
      </label>
      <input
        className="text-input"
        ref={emailRef}
        style={emailError ? { borderColor: "#d73c3c" } : null}
        type="email"
        name="emailaddress"
        value={email}
        onChange={handleEmail}
        id="emailaddress"
        required
        aria-required={!emailReg.test(email) && true}
        aria-invalid={!emailReg.test(email) && true}
      />

      {emailError && (
        <span className="error-text">Please enter a valid email address</span>
      )}

      <fieldset className="query-fieldset">
        <legend className="query-legend">
          Query Type
          <svg
            className="asterisk"
            aria-hidden={true}
            enableBackground="new 0 0 128 128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
              fill="#0c7d69"
            />
          </svg>
        </legend>

        <div className="query-wrapper">
          {queries.map((query) => (
            <label key={query.id} className="query-label">
              <input
                className="query-input"
                ref={queryRef}
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
      </fieldset>

      {queryError && <span className="error-text">Please select a query</span>}

      <label className="input-text-label" htmlFor="message">
        Message
        <svg
          className="asterisk"
          aria-hidden={true}
          enableBackground="new 0 0 128 128"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
            fill="#0c7d69"
          />
        </svg>
      </label>
      <textarea
        className="message-text"
        ref={messageRef}
        style={messageError ? { borderColor: "#d73c3c" } : null}
        name="Message"
        id="message"
        value={message}
        onChange={handleMessage}
        minLength={minText}
        maxLength={maxText}
        required
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
          ref={consentRef}
          type="checkbox"
          name="consent-agreement"
          id="consent-checkbox"
          onChange={handleConsentCheck}
          defaultChecked={false}
          required
          aria-required={!consentCheck && true}
          aria-invalid={!consentCheck && true}
        />

        <label className="input-checkbox-label" htmlFor="consent-checkbox">
          I consent to being contacted by the team
          <svg
            className="asterisk"
            aria-hidden={true}
            enableBackground="new 0 0 128 128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="m50.92 67.87-21.05-6.07c-1.04-.3-1.62-1.4-1.29-2.43l3.38-10.39c.34-1.04 1.49-1.59 2.51-1.19l20.78 8.04c1.29.5 2.66-.49 2.6-1.87l-1.04-23.96c-.05-1.09.82-2 1.91-2h11.05c1.09 0 1.96.91 1.91 2l-1.05 24.48c-.06 1.38 1.32 2.36 2.6 1.87l20.34-7.87c1.03-.4 2.18.16 2.52 1.21l3.34 10.62c.32 1.03-.27 2.12-1.3 2.41l-21.48 6.09c-1.29.37-1.81 1.92-1.01 2.99l13.96 18.58c.64.85.46 2.06-.4 2.69l-8.96 6.55c-.9.66-2.16.41-2.75-.53l-12.44-19.89c-.75-1.19-2.48-1.2-3.23-.02l-12.27 19.23c-.59.92-1.82 1.16-2.71.54l-9.01-6.29c-.89-.62-1.09-1.86-.43-2.73l14.5-19.06c.83-1.07.32-2.62-.98-3z"
              fill="#0c7d69"
            />
          </svg>
        </label>
      </div>

      {consentError && (
        <span className="error-text">
          To submit this form, please consent to being contacted
        </span>
      )}

      <SubmitButton />
    </form>
  );
};

export default ContactForm;
