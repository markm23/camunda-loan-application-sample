import { Amplify, API } from 'aws-amplify'; // Assuming correct import syntax
import { get } from 'aws-amplify/api'; 
import amplifyconfig from '../amplifyconfiguration.json'; // Ensure this exists

Amplify.configure(amplifyconfig);

async function callAppianWebAPI(endpoint, method, data = null, params = {}) {
    // Construct query parameters
    const queryParams = new URLSearchParams(params).toString();
    const path = '/todo'
    const apiUrl = queryParams ? `${endpoint}?${queryParams}` : endpoint; 
    const apiName = 'Get Lookups';


    const options = {
        headers: {
            'Appian-API-Key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MjVkZjMwZC0xYjhjLTQyYmItYmQ5OC1jNTY5ZDIzNjExOTIifQ.TvWTZY-PI5-GPRK9GAyYXXg4NDsNrQ_BA4OYqzaQXS0', 
            'Content-Type': 'application/json' 
        },
        queryStringParameters: params, // For GET parameters
    };

    try {
        const response = await get(
            apiName,
            path,
            options
        ); 
        return response; // Return the raw API response
    } catch (error) {
        console.error('Error calling Appian Web API:', error);
        throw error; 
    }
}

export default callAppianWebAPI;