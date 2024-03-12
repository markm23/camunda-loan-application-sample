import React, { useState, useEffect } from "react";
//import "./index.css";
import "./app.css";
import {
  proofOfAddressInstructions,
  proofOfIncomeInstructions,
} from "../data/data";
import TextInput from "./components/TextInput";
import AddressInput from "./components/AddressInput";
import PhoneInputComponent from "./components/PhoneInputComponent";
import EmailInput from "./components/EmailInput";
import DropdownInput from "./components/DropdownInput";
import DateInput from "./components/DateInput";
import CurrencyInput from "./components/CurrencyInput";
import {
  employmentTypeLookup,
  housingStatusLookup,
  loanTypeLookup,
} from "../data/lookupHardcode";
import FileUpload from "./components/FileUpload";
// import callAppianWebAPI from '../data/lookups';
//import DateInput from './components/DateInput';
// ... other imports

import getAdobeToken from "../data/getAdobeToken";
import getAdobePresignedUploadURL from "../data/getAdobePresignedUploadURL";

const App = () => {
  const [adobeToken, setAdobeToken] = useState(null);
  const [presignedURL, setPresignedURL] = useState(null)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdobePresignedUploadURL();
        // const responseObject = JSON.parse(response);
        console.log(response);
        // console.log(responseObject);

      } catch (err) {
        console.log(err)
        setError(err);
      }
    };
    
    fetchData(); // Call the function to fetch the token
  }, []);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    emailAddress: "",
    phoneNumber: "",
    employmentType: "",
    housingStatus: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      country: "",
      city: "",
      region: "",
      postCode: "",
    },
    addressFull: "",
    proofOfIncome: null,
    proofOfAddress: null,
    loanType: {
      id: "",
      name: "",
    },
    loanAmount: {
      currency: "GBP",
      amount: "",
    },
    // ...
  });

  const getFullAddress = () => {
    return `${formData.address.addressLine1}, ${formData.address.addressLine2}, ${formData.address.city}, ${formData.address.region}, ${formData.address.country}`;
  };

  useEffect(() => {
    const fullAddress = getFullAddress();
    setFormData({ ...formData, addressFull: fullAddress });
  }, [formData.address]); // Add formData.address as a dependency
  // Handle form changes (generic example)
  const handleChange = (event) => {
    console.log("event =" + event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCurrencyChange = (currencyInput) => {
    setFormData({
      ...formData,
      loanAmount: currencyInput, // Update loanAmount directly
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleFileUpload = (file, fieldName) => {
    setFormData({ ...formData, [fieldName]: file });
    console.log(formData);
  };
  const fileExtensions = {
    accept: ".jpg, .jpeg, .png, .pdf",
  };
  //   async function processData() {
  //     try {
  //         const apiEndpoint = 'https://bpklz2i360.execute-api.eu-west-2.amazonaws.com/dev';
  //         const customerData = await callAppianWebAPI(apiEndpoint, 'GET', null, {table: "user"});
  //         console.log(customerData)
  //         // Do something with the customerData
  //         console.log('Customer Data:', customerData);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // }

  // processData();

  return (
    <>
      {" "}
      <div className="form-container">
        {/* Wrapper for layout */}
        <div className="form-column">
          {/* Column 1 */}
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <DateInput
            label="Date of Birth"
            name="dob"
            dateAfter={new Date("1900-01-01")}
            dateBefore={new Date("2006-03-10")}
            errorMessage="Invalid date selection"
            onDateChange={handleChange}
          />
          <PhoneInputComponent
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <EmailInput
            name="emailAddress"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="input-line">
          <DropdownInput
            label="Loan Type"
            name="loanType"
            value={formData.loanType || ""}
            options={loanTypeLookup}
            onChange={handleChange}
            idKey="loanTypeID"
          />
          </div>
          <div className="input-line">
          <CurrencyInput
            name="loanAmount"
            label="Loan Amount"
            value={formData.loanAmount}
            onChange={handleCurrencyChange}
          />
          </div>
        </div>
        <div className="form-column">
          {/* Column 2 */}
          <AddressInput
            name="address"
            value={formData.address}
            onChange={(address) => setFormData({ ...formData, address })}
          />
          <div className="input-line">
            <DropdownInput
              label="Employment Type"
              name="employmentType"
              value={formData.employmentType || ""}
              options={employmentTypeLookup}
              onChange={handleChange}
              idKey="employmentTypeID"
            />
            <DropdownInput
              label="Housing Status"
              name="housingStatus"
              value={formData.housingStatus || ""}
              options={housingStatusLookup}
              onChange={handleChange}
              idKey="housingStatusID"
            />
          </div>
        </div>
      </div>
      <div>
        <hr></hr>
        <h2>Proof Of Address</h2>
        <FileUpload
          acceptedTypes={["image/jpeg", "image/png", "application/pdf"]}
          onUpload={handleFileUpload}
          errorMessage="Invalid file type. Please upload JPEG, PNG, or PDF files."
          fieldName="proofOfAddress"
          instructions={proofOfAddressInstructions}
        />
        <hr></hr>
        <h2>Proof Of Income</h2>
        <FileUpload
          acceptedTypes={["image/jpeg", "image/png", "application/pdf"]}
          onUpload={handleFileUpload}
          errorMessage="Invalid file type. Please upload JPEG, PNG, or PDF files."
          fieldName="proofOfIncome"
          instructions={proofOfIncomeInstructions}
        />
        <button
          type="submit"
          onClick={() => {
            console.log(formData);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default App;
