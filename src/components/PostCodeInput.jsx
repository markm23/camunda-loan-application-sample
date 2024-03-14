import React, { useState } from "react";

function PostCodeInput({ name, label, value, required=true, onChange, ...otherProps }) {
  const [postcode, setPostcode] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");  

  // Example postcode validation (you'll need to adjust for your specific format)
  const validatePostcode = (postcode) => {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i; 
    if (!postcodeRegex.test(postcode)) {
      setErrorMessage("Invalid postcode format");
      setIsValid(false);
      return false;
    }
    setErrorMessage("");
    setIsValid(true);
    return true;
  };

  const handleChange = (event) => {
    const newPostcode = event.target.value;
    setPostcode(newPostcode);

    if (validatePostcode(newPostcode)) {
      onChange(newPostcode); 
    } 
  };

  return (
    <div className="input-line">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={postcode}
        required={required}
        onChange={handleChange}
      />
      {!isValid && <p style={{ color: "red" }}>Invalid Post Code Format</p>}
    </div>
  );
}

export default PostCodeInput;
