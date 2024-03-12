import AWS from "aws-sdk";
const secretsManager = new AWS.SecretsManager();

export async function getAdobePresignedUploadURL() {
  console.log("Starting getAdobePresignedURL");
  try {
    // Retrieve Adobe credentials from Secrets Manager
    const secretData = await secretsManager
      .getSecretValue({ SecretId: "CCS-Access-Keys" })
      .promise();
    const credentials = JSON.parse(secretData.SecretString);

    // 1. Get Adobe Token
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", credentials.adobe_client_id);
    urlencoded.append("client_secret", credentials.adobe_client_secret);

    const tokenRequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const tokenResponse = await fetch(
      "https://pdf-services-ew1.adobe.io/token",
      tokenRequestOptions
    );
    const tokenResult = await tokenResponse.text();
    const accessToken = JSON.parse(tokenResult).access_token;

    // 2. Get Presigned Upload URL
    const uploadHeaders = new Headers();
    uploadHeaders.append("Content-Type", "application/json");
    uploadHeaders.append("X-API-Key", credentials.adobe_client_id);
    uploadHeaders.append("Authorization", "Bearer " + accessToken);

    const raw = JSON.stringify({
      "mediaType": "application/pdf"
    });

    const uploadRequestOptions = {
      method: "POST",
      headers: uploadHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log(uploadRequestOptions);

    const uploadResponse = await fetch(
      "https://pdf-services-ew1.adobe.io/assets",
      uploadRequestOptions
    );
    console.log(uploadResponse);
    const uploadResult = await uploadResponse.text();
    return uploadResult; // Assuming this contains the presigned URL
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to propagate the error
  }
}
