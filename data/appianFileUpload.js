async function uploadAppianFile(file) {
  function createFormData(file) {
    const formData = new FormData();
    formData.append('file', file); // Assuming your API expects the file under the key 'file'
    return formData;
  }
  
  console.log(file);
  const options = {
    method: "POST",
    // redirect: "follow",
    headers: {
      "Appian-Document-Name": file.name,
      "Content-Type": "multipart/form-data"
      // "Access-Control-Allow-Origin": "*"
    },
    // mode: "no-cors",
    body: createFormData(file),
  };
  console.log(options);
  try {
    const response = await fetch(
      "https://hxsmxhvgjl.execute-api.eu-west-2.amazonaws.com/dev/appian-upload",
      options
    );
    const result = await response.text();
    console.log(response)
    return result; 
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
}

export default uploadAppianFile;
