import { client_id, client_secret, token_url } from "./adobeCredentials";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret)

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

async function getAdobeToken() {
  try {
    const response = await fetch(token_url, requestOptions);
    const result = await response.text();
    return result; 
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to allow the caller to handle it
  }
}

export default getAdobeToken;