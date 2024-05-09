import { employmentTypeLookup, housingStatusLookup, loanTypeLookup, lookupTableNames } from "../../data/lookupHardcode";

export async function uploadFileToS3(file, filename) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/pdf");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const formdata = new FormData();
  formdata.append("", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(requestOptions);

  try {
    const response = await fetch(`https://7h4ioutdyk.execute-api.eu-west-2.amazonaws.com/dev/upload?filename=${filename}`,
      requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT BELOW - 1---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
//Replace hard-code function call with real fetch request-----------------------------------------------------------------------//
//Use your created API URL------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
/**
* Call the AWS API to retrieve the Appian lookup values for a given table.
*
* @param {string} tableName - The table name in Appian.
* @param {string} primaryKeyField - The primary key field name.
* @return {Object[]} Key-value pairs for the retrieved data, key is the primary key, and value is the name
*/
export async function getAppianLookupValues(table, primaryKeyField = "id") {
  // return getHardCodedLookupValues(table)
  
  try {
    // Call the query API and extract the JSON
    const url = 'https://te4beoingl.execute-api.eu-west-2.amazonaws.com/v1/getAppianLookups'
    const response = await fetch(`${url}?table=${table}`, {
      method: "GET"
    }).catch(error => {
      throw new Error(error);
    });
    const responseJSON = await response.json();
    // Throw error if the response is not OK
    if (!response.ok) {
      throw new Error(`${response.status} - ${responseJSON?.message}`);
    }
    // Parse the returned lookups into a list of maps
    const data = responseJSON.data
    const options = []
    data.map((option) => {
      options.push({
        key: option[primaryKeyField],
        value: option.value
      })
    })
    console.log("Options for " + table + " retrieved.")
    return options;
  } catch (error) {
    console.error("Error retrieving data:", error.message);
  }
}
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT ABOVE - 1---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//


/**
* Get the hard-coded lookup values for the matching table
* @param {string} tableName - The table name.
* @return {Object[]} Key-value pairs for the retrieved data
*/
function getHardCodedLookupValues(tableName) {
  switch (tableName) {
    case lookupTableNames[0]:
      return employmentTypeLookup
    case lookupTableNames[1]:
      return housingStatusLookup
    case lookupTableNames[2]:
      return loanTypeLookup
    default:
      return []
  }
}


//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT BELOW - 5---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
//Replace null return with real fetch request-----------------------------------------------------------------------------------//
//Use your created API URL------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
export async function callCamundaWebhook(data) {
  // return null;
  
  try {
    const response = await fetch(
      `https://diiejrgqdh.execute-api.eu-west-2.amazonaws.com/v1/startLoanProcessing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).catch(error => {
      throw new Error(error);
    });
    const result = await response.text();
    console.log(result);
    return result; // Return the result for further use
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for potential handling elsewhere
  }
  
}
//------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------EDIT ABOVE - 5---------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//
