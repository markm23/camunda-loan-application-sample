async function callAppianWebAPI(endpoint, method, data = null, params = {}) {
    const headers = {
        'Authorization': 'Basic ' + btoa('Appian-API-Key: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MjVkZjMwZC0xYjhjLTQyYmItYmQ5OC1jNTY5ZDIzNjExOTIifQ.TvWTZY-PI5-GPRK9GAyYXXg4NDsNrQ_BA4OYqzaQXS0'), 
        'Content-Type': 'application/json' 
    };

    // Construct query parameters
    const queryParams = new URLSearchParams(params).toString();
    const apiUrl = queryParams ? `${endpoint}?${queryParams}` : endpoint;

    const options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
        mode: "no-cors"
    };

    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
            throw new Error('API request failed: ' + response.status);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error calling Appian Web API:', error);
        throw error; 
    }
}

export default callAppianWebAPI;