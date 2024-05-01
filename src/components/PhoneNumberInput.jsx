import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 

const PhoneNumberInput = ({ name, value, onChange }) => {
  return (
    <section className="input-line">
      <label htmlFor={name}>Phone Number</label>
      <PhoneInput
        name={name}
        placeholder="Enter phone number"
        value={value}
        onChange={onChange}
        required={true}
      />
    </section>
  );
};

export default PhoneNumberInput;
