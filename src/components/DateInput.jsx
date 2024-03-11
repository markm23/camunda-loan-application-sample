import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ label, name, dateBefore, dateAfter, errorMessage }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [validationError, setValidationError] = useState("");

  const isValidDate = (date) => {
    if (dateAfter && date <= dateAfter) {
      setValidationError(
        `Selected date must be after ${dateAfter.toLocaleDateString()}`
      );
      return false;
    } else if (dateBefore && date >= dateBefore) {
      setValidationError(
        `Selected date must be before ${dateBefore.toLocaleDateString()}`
      );
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    isValidDate(date);
  };

  return (
    <div className="input-line">
      <label htmlFor={name}>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        // ...other date picker props
      />
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
    </div>
  );
};

export default DateInput;
