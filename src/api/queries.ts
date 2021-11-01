import { gql } from '@urql/core';

export const userQuery = gql`
  query {
    getUser {
      id
      mockEndpoints {
        id
        endpointName
        httpMethod
      }
      isTemp
    }
  }
`;

export const getMockEndpointQuery = gql`
  query ($getMockEndpointData: MockEndpointGetInput) {
    getMockEndpoint(data: $getMockEndpointData) {
      id
      userId
      endpointName
      httpMethod
      urlPath
      httpStatus
      responseContentType
      charset
      httpHeaders
      httpResponseBody
      timeout
    }
  }
`;
