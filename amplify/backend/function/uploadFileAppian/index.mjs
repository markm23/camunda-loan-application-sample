import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { getAppianAPIKey } from './getAppianAPIKey.mjs';
import formidable from "formidable";


export async function uploadDocumentAppian(event) {   
  try {   
    const base64Data = event.body;
    const appianAPIKeyResponse = JSON.stringify(await getAppianAPIKey());
    
    const credentials = await JSON.parse(JSON.parse(appianAPIKeyResponse).body)['appian_api_key'];
    console.log("CREDS: " + credentials)
    if (event.httpMethod === "OPTIONS") {
      // Respond to CORS preflight request
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, appian-document-name",
        },
        body: JSON.stringify({ message: "Preflight request successful" }),
      };
    }
    console.log("Starting uploadDocumentAppian");
    // Retrieve Adobe credentials from Secrets Manager

    // 1. Get Adobe Token
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/pdf");
    myHeaders.append("Appian-Document-Name", "name");
    myHeaders.append("Appian-API-Key", credentials);
    // myHeaders.append("Access-Control-Allow-Origin", "*");
    console.log(myHeaders);
    const fileUpload = base64Data;
    console.log("event" + event); 
    console.log("event body" + event.body);
    console.log("event body 2" + event['body']);
    console.log("event stringy" + JSON.stringify(event));

    const uploadRequestOptions = {
      method: "POST",
      headers: myHeaders,
      body: event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body,
      redirect: "follow",
    };

    const uploadResponse = await fetch(
      "https://vassuk.appiancloud.com/suite/webapi/upload-document",
      uploadRequestOptions
    );
    console.log(uploadResponse);
        const appianResponseText = await uploadResponse.text();
    console.log("Appian Response Status:", uploadResponse.status);
    console.log("Appian Response Text:", appianResponseText); 


 return {
      statusCode: 200, // Or adjust based on Appian Response
      body: appianResponseText
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error uploading to Appian'
    }; 
  }
}

