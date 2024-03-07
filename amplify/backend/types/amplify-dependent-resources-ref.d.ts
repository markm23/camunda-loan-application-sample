export type AmplifyDependentResourcesAttributes = {
  "api": {
    "apiGetLookups": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "ccsGetLookups": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "getLookups": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "todoGetLookups": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}