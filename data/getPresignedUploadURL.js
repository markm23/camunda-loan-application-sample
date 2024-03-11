import { client_id, client_secret, pdf_service_url } from "./adobeCredentials";

async function getPresignedUploadURL(access_token) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-API-Key", client_id);
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Access-Control-Allow-Headers", "*");
  myHeaders.append("Access-Control-Allow-Methods", "*");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const urlencoded = new URLSearchParams();
  urlencoded.append("mediaType", "application/pdf");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  try {
    const response = await fetch(pdf_service_url, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
}

export default getPresignedUploadURL;
