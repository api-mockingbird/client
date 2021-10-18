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

export const createMockEndpointMutation = gql`
  mutation (
    $createMockEndpointData: MockEndpointInput!
    $createMockEndpointUserId: String!
  ) {
    createMockEndpoint(
      data: $createMockEndpointData
      userId: $createMockEndpointUserId
    ) {
      id
    }
  }
`;

export const updateMockEndpointMutation = gql`
  mutation (
    $updateMockEndpointData: MockEndpointInput!
    $updateMockEndpointUserId: String!
  ) {
    updateMockEndpoint(
      data: $updateMockEndpointData
      userId: $updateMockEndpointUserId
    ) {
      id
    }
  }
`;

export const removeMockEndpointMutation = gql`
  mutation ($removeMockEndpointData: Int!) {
    removeMockEndpoint(data: $removeMockEndpointData) {
      id
    }
  }
`;
