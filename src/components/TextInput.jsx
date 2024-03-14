import React from 'react';

const TextInput = ({ label, name, value, required=true, onChange }) => {
  return (
    <div className='input-line'>
      <label htmlFor={name}>{label}</label>
      <input 
        type="text" 
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