import React from 'react';

const DropdownInput = ({ label, name, value, options, onChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value || ''} onChange={onChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.code || option} value={option.code || option}>
            {option.name || option}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropdownInput;