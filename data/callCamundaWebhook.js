export async function callCamundaWebhook(data) {
  return null;
  /**
  try {
    const response = await fetch(
      "<your webhook url>",
      {
        method: "<method>",
        headers: {
          "Content-Type": "<what kind of content is being passed into the body?>"
        },
        body: "<convert your data into a JSON string>",
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
  **/
}
