import React, { useEffect, useState } from "react";

const EmailInput = ({ name, label, value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const matchesRegex = emailRegex.test(emailInput);
    setIsValid(matchesRegex);
    return matchesRegex;
  };

  // Validations just show up, doesn't stop submission currently
  const handleEmailChange = (event) => {
    validateEmail(event.target.value)
    onChange(event);
  };

  return (
    <>
      <div className="input-line">
        <label htmlFor={name}>{label}</label>
        <input
          // type="email"
          placeholder="Enter Email"
          id={name}
          name={name}
          value={value}
          onChange={handleEmailChange}
          className={isValid ? "" : "error"}
          required={true}
        />
      </div>
      {isValid || (
        <p name={name} className="validations">
          Invalid Email Format
        </p>
      )}
    </>
  );
};

export default EmailInput;
