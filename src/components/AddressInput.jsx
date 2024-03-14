import React, { useState, useEffect } from "react";
import DropdownInput from "./DropdownInput.jsx";
import PostCodeInput from "./PostCodeInput.jsx";
import { europeanCountries, countryRegions } from "../../data/data.js";
import "./AddressInput.css";

const AddressInput = ({ value, onChange }) => {
  const [address, setAddress] = useState(value);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    setCountries(europeanCountries);
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setAddress({
      ...address,
      region: event.target.value, // Update the 'region' here
    });
    onChange(address); // Notify the parent
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setRegions(countryRegions[countryCode] || []); // Update regions

    // Update address and notify the parent
    setAddress({
      ...address,
      country: countryCode,
      region: "", // Reset region when country changes
    });
    onChange(address);
  };

  const handleAddressChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    onChange(address); // Notify parent of changes immediately
  };

  const handlePostcodeChange = (newPostcode) => {
    setAddress({
      ...address,
      postCode: newPostcode,
    });
    onChange(address);
  };

  return (
    <div className="address-form">
      <div className="address-line">
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleAddressChange}
          required={true}
        />
        <label htmlFor="addressLine2">Address Line 2</label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleAddressChange}
          required={false}
        />
        <PostCodeInput
          name="postCode"
          label="Post Code"
          value={address.postCode}
          onChange={handlePostcodeChange}
        />
      </div>
      <div className="address-line">
        <DropdownInput
          label="Country"
          name="country"
          value={address.country || ""}
          options={europeanCountries}
          onChange={handleCountryChange}
          returnIdKey={true}
        />
        <DropdownInput
          label="Region"
          name="region"
          value={address.region || ""}
          options={regions}
          onChange={handleRegionChange}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
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
