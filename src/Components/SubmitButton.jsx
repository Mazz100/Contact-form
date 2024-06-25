import React from "react";

const SubmitButton = ({ validate }) => {
  return (
    <div className="button-wrapper">
      <button className="submit-button" type="submit" onClick={validate}>
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
