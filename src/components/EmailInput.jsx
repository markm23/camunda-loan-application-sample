import React, { useState } from "react";

const EmailInput = ({ name, label, value, onChange, error }) => {
  const [email, setEmail] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (emailInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!emailRegex.test(emailInput)) {
      setErrorMessage("Invalid email format");
      setIsValid(false);
      return false;
    }

    setErrorMessage("");
    setIsValid(true);
    return true;
  };

  const handleEmailChange = (event) => {
    const emailInput = event.target.value;
    setEmail(emailInput);

    if (validateEmail(emailInput)) {
      onChange(event);
    }
  };

  return (
    <div className="input-line">
      <label htmlFor={name}>{label}</label>
      <input
        // type="email"
        id={name}
        name={name}
        value={email}
        onChange={handleEmailChange}
        className={isValid ? "" : "error"} // Apply error class if invalid
      />
      {isValid || (
        <p name={name} style={{ color: "red" }}>
          Invalid Email Format
        </p>
      )}
    </div>
  );
};

export default EmailInput;