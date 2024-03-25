export function uploadFileToS3(file, filename) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/pdf");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const formdata = new FormData();
  formdata.append("", file);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(requestOptions);

  fetch(
    `https://7h4ioutdyk.execute-api.eu-west-2.amazonaws.com/dev/upload?filename=${filename}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}
