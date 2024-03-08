import React, { useState } from "react";
import "./index.css";
import TextInput from "./components/TextInput";
import AddressInput from "./components/AddressInput";
import PhoneInputComponent from "./components/PhoneInputComponent";
import DropdownInput from "./components/DropdownInput";
import { employmentTypeLookup, housingStatusLookup } from "../data/lookupHardcode";
//import callAppianWebAPI from '../data/lookups';
//import DateInput from './components/DateInput';
// ... other imports

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
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
    // ...
  });

  // Handle form changes (generic example)
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
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
    <div className="form-container">
      <form> {/* Form submission logic would go here */}
        <div className="form-group"> {/* Column 1 */}
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
          <PhoneInputComponent
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
        </div>    
        <div className="form-group"> {/* Column 2 */}
          <AddressInput
            value={formData.address}
            onChange={(address) => setFormData({ ...formData, address })}
          />
        </div>
        <div className="form-group"> {/* Column 3  */}
          <DropdownInput
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType || ""}
            options={employmentTypeLookup}
            onChange={handleChange}
          />
          <DropdownInput
            label="Housing Status"
            name="housingStatus"
            value={formData.housingStatus || ""}
            options={housingStatusLookup}
            onChange={handleChange}
          />
        </div>
       <button type="submit">Submit</button> 
      </form>
    </div>
  );
};

export default App;
