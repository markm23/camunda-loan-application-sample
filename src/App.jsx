import React, { useState } from 'react';
import "./index.css";
import TextInput from './components/TextInput';
import AddressInput from './components/AddressInput';
import callAppianWebAPI from '../data/lookups';
//import DateInput from './components/DateInput';
// ... other imports 

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    // ... other fields
    address: {
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: '',
      region: '',
      postCode: '',
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

  async function processData() {
    try {
        const apiEndpoint = 'https://bpklz2i360.execute-api.eu-west-2.amazonaws.com/staging';
        const customerData = await callAppianWebAPI(apiEndpoint, 'GET', null, {table: "user"});
        console.log(customerData)
        // Do something with the customerData
        console.log('Customer Data:', customerData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

processData();

  return (
    <div className="form-container">
      <form> {/* Form submission logic would go here */}
        <TextInput 
          label="First Name"
          name="firstName"  
          value={formData.firstName} 
          onChange={handleChange}
        />
        <TextInput 
          label="Last Name"
          name="lsatName"  
          value={formData.lastName} 
          onChange={handleChange}
        />
        {/* ... Similar components for other text fields */}
        {/* Components for Dropdowns */}
        <AddressInput
          value={formData.address}
          onChange={(address) => setFormData({ ...formData, address })}
        />
       {/* ... other fields */}
        <button type="submit">Submit</button> 
      </form>
    </div>
  );
};

export default App;