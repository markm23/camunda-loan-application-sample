Appian lookup instructions

SM
Add the key/value pair and leave everything else as is (Appian-API-Key)

Lambda
Download the sample code ZIP file
Create new function from scratch, leave all options as is (Node.js 20.x runtime if not already)
Optionally increase the timeout time
Update the IAM role (try to find option by themselves), adding permission to read/write secrets
Upload sample code 
Update getAppianAPIKey.mjs and index.mjs where needed
Test code (have sample input)

API Gateway
Create REST API, make it general e.g., system name like appian
Create resource, giving the actual function e.g., getLookups
Create a GET method, using the Lambda function as a proxy, and add in the parameter name
Test it works
Deploy, creating a new stage, whatever name you want - now available externally - drill down to see the actual URL

JavaScript
Download the repo if not done already, and install the required modules (npm install)
Do npm run dev and open the link so you can view the changes straight away, see that using hard-coded (HC) in housing, and employment, and empty in loan type
In apis.js, update getAppianLookupValues to use the actual fetch request using your URL instead
In App.jsx, note the structure of const [lookups, setLookups]
Then update the use effect that is being called on mount 
Then update the JSX code (hint, related to idKey and nameKey - check the structure of the hard-coded versus queried)
Hint - try ctrl clicking on the returned hard-coded lists in apis.js to open up the file that it's from, and adding a console.log statement for the queried results
