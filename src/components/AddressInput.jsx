import React, { useState, useEffect } from "react";
import DropdownInput from "./DropdownInput.jsx";
import PostCodeInput from "./PostCodeInput.jsx";
import { europeanCountries, countryRegions } from "../../data/data.js";
import "./AddressInput.css";
import { handleNestedChange, handleNestedChangeWithEvent } from "../functions/state_handler.js";

const AddressInput = ({ value, onChange }) => {
  const [address, setAddress] = useState(value);
  const [regions, setRegions] = useState(value?.country ? countryRegions[value.country] : []);

  const handleAddressChange = (event) => {
    handleNestedChangeWithEvent(event, setAddress); // Notify the parent
  };

  const handleCountryChange = (event) => {
    handleNestedChange(setAddress, "region", "");
    handleNestedChangeWithEvent(event, setAddress);
    setRegions(countryRegions[event.target.value] || []); // Update regions
  };

  useEffect(() => {
    onChange(address)
  }, [address])

  return (
    <div className="address-form">
      <div className="input-line">
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
          type="text"
          placeholder="Enter Address Line 1"
          id="addressLine1"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleAddressChange}
          required={true}
        />
      </div>
      <div className="input-line">
        <label htmlFor="addressLine2">Address Line 2</label>
        <input
          type="text"
          placeholder="Enter Address Line 2"
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleAddressChange}
          required={false}
        />
      </div>
      <div className="input-line">
      <PostCodeInput
          name="postCode"
          label="Post Code"
          value={address.postCode}
          onChange={handleAddressChange}
        />
      </div>
      <div className="input-line">
        <DropdownInput
          label="Country"
          name="country"
          value={address.country || ""}
          options={europeanCountries}
          onChange={handleCountryChange}
          returnIdKey={true}
        />
      </div>
      <div className="input-line">
      <DropdownInput
          label="Region"
          name="region"
          value={address.region || ""}
          options={regions}
          onChange={handleAddressChange}
        />
      </div>
      <div className="input-line">
      <label htmlFor="city">City</label>
        <input
          type="text"
          placeholder="Enter City"
          id="city"
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          required={true}
        />
      </div>
    </div>
  );
};

export default AddressInput;
