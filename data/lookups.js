import { Amplify, API } from 'aws-amplify'; // Assuming correct import syntax
import { get } from 'aws-amplify/api'; 
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

async function callAppianWebAPI(endpoint, method, data = null, params = {}) {
    // Construct query parameters
    const queryParams = new URLSearchParams(params).toString();
    const path = '/IlciYw'
    const apiUrl = queryParams ? `${endpoint}?${queryParams}` : endpoint; 
    const apiName = 'getAppianLookups';


    const options = {
        headers: {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MjVkZjMwZC0xYjhjLTQyYmItYmQ5OC1jNTY5ZDIzNjExOTIifQ.TvWTZY-PI5-GPRK9GAyYXXg4NDsNrQ_BA4OYqzaQXS0', 
            'Content-Type': 'application/json' 
        },
        //queryStringParameters: queryParams, // For GET parameters
        //mode: "no-cors"
    };
    console.log(options);
    console.log(apiUrl);
    console.log(queryParams)
    try {
        const response = await fetch(apiUrl, options)
        return response; // Return the raw API response
    } catch (error) {
        console.error('Error calling Appian Web API:', error);
        throw error; 
    }
}

export default callAppianWebAPI;