import React, { useState } from "react";

function PostCodeInput({ name, label, value, required=true, onChange }) {
  const [isValid, setIsValid] = useState(true);

  function validatePostcode(postcode) {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i; 
    const matchesRegex = postcodeRegex.test(postcode);
    setIsValid(matchesRegex);
    return matchesRegex;
  };

  // Validations just show up, doesn't stop submission currently
  const handleChange = (event) => {
    validatePostcode(event.target.value)
    onChange(event); 
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        placeholder="Enter Post Code"
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={handleChange}
      />
    {!isValid && <p className="validations">Invalid Post Code Format</p>}
    </>
  );
}

export default PostCodeInput;
