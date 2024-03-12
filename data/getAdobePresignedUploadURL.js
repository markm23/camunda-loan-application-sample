const requestOptions = {
  method: "POST",
  redirect: "follow"
};

async function getAdobePresignedUploadURL() {
  try {
    const response = await fetch("https://5g3m2m0yca.execute-api.us-east-1.amazonaws.com/dev/presigned-url", requestOptions);
    const result = await response.text();
    return result; 
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
}

export default getAdobePresignedUploadURL;
