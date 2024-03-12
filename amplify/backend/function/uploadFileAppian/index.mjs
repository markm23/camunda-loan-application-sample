import AWS from "aws-sdk";
const secretsManager = new AWS.SecretsManager();

export async function uploadDocumentAppian(file) {
  console.log("Starting uploadDocumentAppian");
  try {
    // Retrieve Adobe credentials from Secrets Manager
    const secretData = await secretsManager
      .getSecretValue({ SecretId: "CCS-Access-Keys" })
      .promise();
    const credentials = JSON.parse(secretData.SecretString);

    // 1. Get Adobe Token
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/pdf");
    myHeaders.append("Appian-Document-Name", "name");
    myHeaders.append("Appian-API-Key", credentials.appian_api_key);
    console.log(myHeaders);
    const fileUpload = file;

    const uploadRequestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const uploadResponse = await fetch(
      "https://vassuk.appiancloud.com/suite/webapi/upload-document",
      uploadRequestOptions
    );
    console.log(uploadResponse);

    return uploadResponse; // Assuming this contains the presigned URL
  } catch (error) {
    console.log("failed");
    console.error(error);
    throw error; // Re-throw to propagate the error
  }
}
