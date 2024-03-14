import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
const secretName = "CCS-Access-Keys";
const region = "eu-west-2";
const client = new SecretsManagerClient({ region });
export const getAppianAPIKey = async (event, context) => {
  let response;
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
      })
    );
  } catch (error) {
    // Handle errors, log, or throw an exception as needed
    console.error("Error retrieving secret:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
  const secret = JSON.parse(response.SecretString);
  // Your code logic goes here
  console.log("Retrieved secret:", secret);
  console.log(JSON.stringify(secret))
  return {
    statusCode: 200,
    body: JSON.stringify(secret),
  };
};