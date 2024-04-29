# Section Instructions

### **Appian lookup instructions<br>**
**SM<br>**
- Add the key/value pair and leave everything else as is (Appian-API-Key)<br>

**Lambda<br>**
- Download the sample code ZIP file<br>
- Create new function from scratch, leave all options as is (Node.js 20.x runtime if not already)<br>
- Optionally increase the timeout time<br>
- Update the IAM role (try to find option by themselves), adding permission to read/write secrets<br>
- Upload sample code<br>
- Update getAppianAPIKey.mjs and index.mjs where needed<br>
- Test code (have sample input)<br>

**API Gateway<br>**
- Create REST API, make it general e.g., system name like appian<br>
- Create resource, giving the actual function e.g., getLookups<br>
- Create a GET method, using the Lambda function as a proxy, and add in the parameter name<br>
- Test it works<br>
- Deploy, creating a new stage, whatever name you want - now available externally - drill down to see the actual URL<br>

**JavaScript<br>**
- Download the repo if not done already, and install the required modules (npm install)<br>
- Do npm run dev and open the link so you can view the changes straight away, see that using hard-coded (HC) in housing, and employment, and empty in loan type<br>
- In apis.js, update getAppianLookupValues to use the actual fetch request using your URL instead<br>
- In App.jsx, note the structure of const [lookups, setLookups]<br>
- Then update the use effect that is being called on mount<br>
- Then update the JSX code (hint, related to idKey and nameKey - check the structure of the hard-coded versus queried)<br>
