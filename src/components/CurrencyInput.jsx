import React, { useState, useEffect } from "react";
import DropdownInput from "./DropdownInput";
import { currencyOptions } from "../../data/data";
import { handleNestedChangeWithEvent } from "../functions/state_handler";

const CurrencyInput = ({ value, onChange, error }) => {
  const [currencyAmount, setCurrencyAmount] = useState(value)

  const handleAddressChange = (event) => {
    handleNestedChangeWithEvent(event, setCurrencyAmount); // Notify the parent
  };

  useEffect(() => {
    onChange(currencyAmount)
  }, [currencyAmount])

  return (
    <div className="currency-input-container">
      <div className="input-and-dropdown">
        <label>Loan Amount</label>
        <DropdownInput
          options={currencyOptions}
          value={currencyAmount.currency}
          onChange={handleAddressChange}
          name="currency"
          returnIdKey={true}
        />
        <input
          type="number"
          placeholder="Enter Loan Amount"
          id="amounr"
          name="amount"
          value={currencyAmount.amount}
          onChange={handleAddressChange}
          required={true}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CurrencyInput;
