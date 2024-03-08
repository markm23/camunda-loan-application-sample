import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 

const PhoneInputComponent = ({ name, value, onChange }) => {
  const [phone, setPhone] = useState(value);

  const handleChange = (value) => {
    setPhone(value);
    onChange(value); // Notify the parent component
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>Phone Number</label>
      <PhoneInput
        id={name} 
        name={name}
        placeholder="Enter phone number"
        value={phone}
        onChange={handleChange}
      />
    </div>
  );
};

export default PhoneInputComponent;
