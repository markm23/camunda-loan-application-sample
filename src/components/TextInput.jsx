import React from 'react';

const TextInput = ({ label, name, value, placeholder, required=true, onChange }) => {
  return (
    <div className='input-line'>
      <label htmlFor={name}>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        id={name}
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required}
      />
    </div>
  );
};

export default TextInput;