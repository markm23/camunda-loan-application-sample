import React, { useState, useEffect, useRef } from "react";
import "./app.css";
import Navbar from "./components/Navbar";
import {
  proofOfAddressInstructions,
  proofOfIncomeInstructions,
} from "../data/data";
import TextInput from "./components/TextInput";
import AddressInput from "./components/AddressInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import EmailInput from "./components/EmailInput";
import DropdownInput from "./components/DropdownInput";
import DateInput from "./components/DateInput";
import CurrencyInput from "./components/CurrencyInput";
import {
  lookupTableNames,
  lookupTablePrimaryKeys,
} from "../data/lookupHardcode";
import FileUpload from "./components/FileUpload";
import {
  getAppianLookupValues,
  uploadFileToS3,
  callCamundaWebhook,
} from "./functions/apis";

import {
  createCustomerData,
  generateFileName,
  getFullAddress,
} from "./functions/builders";
import {
  handleNestedChange,
  handleNestedChangeWithEvent,
} from "./functions/state_handler";

const App = () => {
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lookups, setLookups] = useState({
    appianLookupsEmploymentStatuses: [],
    appianLookupsHousingStatuses: [],
    appianLookupsLoanTypes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userInputs, setUserInputs] = useState({
    firstName: "FName",
    lastName: "LName",
    dateOfBirth: new Date("1990-01-01"),
    emailAddress: "fname.lname@vasscompany.com",
    phone: "+447000000000",
    employmentType: "1",
    housingStatus: "1",
    address: {
      addressLine1: "5 Merchant Square",
      addressLine2: "WeWork",
      country: "GB",
      city: "London",
      region: "England",
      postCode: "W2 1BQ",
    },
    proofOfIncome: null,
    proofOfAddress: null,
    loanType: 1,
    loanAmount: {
      currency: "GBP",
      amount: 10000,
    },
  });

  //------------------------------------------------------------------------------------------------------------------------------//
  //-------------------------------------------------------EDIT BELOW - 2---------------------------------------------------------//
  //------------------------------------------------------------------------------------------------------------------------------//
  //Add code to get the lookups for loan type and save to state-------------------------------------------------------------------//
  //Hint: use existing code as reference, and hover over some of the variable for descriptions------------------------------------//
  //------------------------------------------------------------------------------------------------------------------------------//
  useEffect(() => {
    const fetchData = async () => {
      const employmentStatusesData = await getAppianLookupValues(
        lookupTableNames[0],
        lookupTablePrimaryKeys[0]
      );
      const housingStatusesData = await getAppianLookupValues(
        lookupTableNames[1],
        lookupTablePrimaryKeys[1]
      );
      handleNestedChange(
        setLookups,
        "appianLookupsEmploymentStatuses",
        employmentStatusesData
      );
      handleNestedChange(
        setLookups,
        "appianLookupsHousingStatuses",
        housingStatusesData
      );
    };
    fetchData();
  }, []); // Call on mount
  //------------------------------------------------------------------------------------------------------------------------------//
  //-------------------------------------------------------EDIT ABOVE - 2---------------------------------------------------------//
  //------------------------------------------------------------------------------------------------------------------------------//

  // Handle form changes (generic example)
  function handleUserInputChangeWithEvent(event) {
    handleNestedChangeWithEvent(event, setUserInputs);
  }

  const today = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(today.getFullYear() - 100);

  const handleSubmit = async () => {
    if (formRef.current.checkValidity()) {
      setIsLoading(true);
      const POAName = generateFileName(userInputs, "Proof_of_Address-");
      const POIName = generateFileName(userInputs, "Proof_of_Income-");
      const POA_Result = await uploadFileToS3(
        userInputs.proofOfAddress,
        POAName
      );
      const POI_Result = await uploadFileToS3(
        userInputs.proofOfIncome,
        POIName
      );
      const POAUrl = POA_Result.objecturl;
      const POIUrl = POI_Result.objecturl;

      const customerData = createCustomerData(
        userInputs,
        POIName,
        POIUrl,
        POAName,
        POAUrl
      );
      console.log(customerData);
      const submissionData = {
        customerData: customerData,
      };
      callCamundaWebhook(submissionData);
      setIsLoading(false);
      setFormSubmitted(true);
    } else {
      console.log("Fill in required fields");
      console.log(userInputs);
      console.log(getFullAddress(userInputs));
      formRef.current.reportValidity();
    }
  };

  return (
    <div className={isLoading ? "loading-cursor" : ""}>
      <div>
        <header
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 776,
          }}
        >
          <Navbar />
        </header>
      </div>
      {formSubmitted ? (
        <div className="confirmation-page">
          <h2>We have your application...</h2>
          <p>Thank you for your submission!</p>
          <button
            onClick={() => {
              setFormSubmitted(false);
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <form ref={formRef}>
          {" "}
          <div className="form-container">
            {/* Wrapper for layout */}
            <div className="form-column">
              {/* Column 1 */}
              <TextInput
                placeholder="Enter First Name"
                label="First Name"
                name="firstName"
                value={userInputs.firstName}
                onChange={handleUserInputChangeWithEvent}
              />
              <TextInput
                placeholder="Enter Last Name(s)"
                label="Last Name"
                name="lastName"
                value={userInputs.lastName}
                onChange={handleUserInputChangeWithEvent}
              />
              <DateInput
                label="Date of Birth"
                name="dateOfBirth"
                dateBefore={eighteenYearsAgo}
                dateAfter={hundredYearsAgo}
                date={userInputs.dateOfBirth}
                errorMessage="Invalid date selection"
                onChange={(date) =>
                  setUserInputs({ ...userInputs, dateOfBirth: date })
                }
              />
              <PhoneNumberInput
                name="phone"
                value={userInputs.phone}
                onChange={(phone) =>
                  handleNestedChange(setUserInputs, "phone", phone)
                }
              />
              <EmailInput
                name="emailAddress"
                label="Email"
                value={userInputs.emailAddress}
                onChange={handleUserInputChangeWithEvent}
              />
              {/* 
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT BELOW - 3---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------// 
//Update JSX code to correctly use the retrieved values-------------------------------------------------------------------------//
//Hint: check the structures of the retrieved hard-coded values versus the retrieved real values--------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
*/}
              <div className="input-line">
                <DropdownInput
                  label="Loan Type"
                  name="loanType"
                  value={userInputs.loanType || ""}
                  options={lookups.appianLookupsLoanTypes}
                  onChange={handleUserInputChangeWithEvent}
                  idKey={lookupTablePrimaryKeys[2]}
                  nameKey="name"
                  returnIdKey={true}
                />
              </div>

              {/* 
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT ABOVE - 3---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------// 
*/}
              <div className="input-line">
                <CurrencyInput
                  name="loanAmount"
                  label="Loan Amount"
                  value={userInputs.loanAmount}
                  onChange={(loanAmount) =>
                    handleNestedChange(setUserInputs, "loanAmount", loanAmount)
                  }
                />
              </div>
            </div>
            <div className="form-column">
              {/* Column 2 */}
              <AddressInput
                name="address"
                value={userInputs.address}
                onChange={(address) =>
                  handleNestedChange(setUserInputs, "address", address)
                }
              />
              {/* 
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT BELOW - 4---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------// 
//Update JSX code to correctly use the retrieved values-------------------------------------------------------------------------//
//Hint: check the structures of the retrieved hard-coded values versus the retrieved real values--------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
*/}
              <div className="input-line">
                <DropdownInput
                  label="Employment Type"
                  name="employmentType"
                  value={userInputs.employmentType || ""}
                  options={lookups.appianLookupsEmploymentStatuses}
                  onChange={handleUserInputChangeWithEvent}
                  idKey={lookupTablePrimaryKeys[0]}
                  nameKey="name"
                  returnIdKey={true}
                />
              </div>
              <div className="input-line">
                <DropdownInput
                  label="Housing Status"
                  name="housingStatus"
                  value={userInputs.housingStatus || ""}
                  options={lookups.appianLookupsHousingStatuses}
                  onChange={handleUserInputChangeWithEvent}
                  idKey={lookupTablePrimaryKeys[1]}
                  nameKey="name"
                  returnIdKey={true}
                />
              </div>
              {/* 
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT ABOVE - 4---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------// 
*/}
            </div>
          </div>
          <div>
            <hr></hr>
            <h2>Proof Of Address</h2>
            <FileUpload
              acceptedTypes={["image/jpeg", "image/png", "application/pdf"]}
              onUpload={(file) =>
                handleNestedChange(setUserInputs, "proofOfAddress", file)
              }
              errorMessage="Invalid file type. Please upload JPEG, PNG, or PDF files."
              fieldName="proofOfAddress"
              instructions={proofOfAddressInstructions}
            />
            <hr></hr>
            <h2>Proof Of Income</h2>
            <FileUpload
              acceptedTypes={["image/jpeg", "image/png", "application/pdf"]}
              onUpload={(file) =>
                handleNestedChange(setUserInputs, "proofOfIncome", file)
              }
              errorMessage="Invalid file type. Please upload JPEG, PNG, or PDF files."
              fieldName="proofOfIncome"
              instructions={proofOfIncomeInstructions}
            />
            <div className="button-container">
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
