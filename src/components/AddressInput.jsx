import React, { useState, useEffect } from 'react';
import { europeanCountries, countryRegions } from '../../data/data.js';

const AddressInput = ({ value, onChange }) => {
  const [address, setAddress] = useState(value);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setCountries(europeanCountries);
  }, []);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setRegions(countryRegions[countryCode] || []); // Update regions

    // Update address and notify the parent
    setAddress({
      ...address,
      country: countryCode,
      region: null, // Reset region when country changes
    });
    onChange(address); 
  };

  const handleRegionChange = (event) => {
    setAddress({
      ...address,
      region: event.target.value,
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

  // Function to construct the full address string
  const getFullAddress = () => {
    return `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.region}, ${address.country}, ${address.postCode}`;
  };
  
  return (
    <div className="address-input">
      <label htmlFor="addressLine1">Address Line 1</label>
      <input
        type="text"
        id="addressLine1"
        name="addressLine1"
        value={address.addressLine1}
        onChange={handleAddressChange}
      />
      <label htmlFor="addressLine2">Address Line 2</label>
      <input
        type="text"
        id="addressLine2"
        name="addressLine2"
        value={address.addressLine2}
        onChange={handleAddressChange}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={address.city}
        onChange={handleAddressChange}
      />

      <label htmlFor="country">Country</label>
      <select id="country" name="country" value={address.country || ''} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <label htmlFor="region">Region</label>
      <select
        id="region"
        name="region"
        value={address.region || ''}
        onChange={handleRegionChange}
        disabled={!selectedCountry}
      >
        <option value="">Select Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className="full-address">
        Full Address: {getFullAddress()}
      </div>
      {/* ... postCode field */}
    </div>
  );
};

export default AddressInput;