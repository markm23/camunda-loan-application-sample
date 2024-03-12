async function uploadAppianFile(file) {
  const options = {
    method: "POST",
    redirect: "follow",
    headers: {
      "Appian-Document-Name": file.name,
      "Access-Control-Allow-Origin": "*"
    },
    body: file,
  };
  console.log(options);
  try {
    const response = await fetch(
      "https://5g3m2m0yca.execute-api.us-east-1.amazonaws.com/dev/appian-upload",
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
