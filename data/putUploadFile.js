export async function uploadFile(presignedUri, file) {
  try {
    const response = await fetch(presignedUri, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (response.ok) {
      console.log(response);
      console.log("File uploaded successfully");
    } else {
      console.error("Upload failed:", response.status);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
