export interface User {
  id: string;
  createdAt: Date;
  isTemp: boolean;
  mockEndpoints: [MockEndpointResponse];
}

interface MockEndpoint {
  responseName: string;
  httpMethod: string;
  urlPath: string;
  httpStatus: number;
  responseContentType: string;
  charset: string;
  httpHeaders: string;
  httpResponseBody: string;
}

export interface MockEndpointInput extends MockEndpoint {
  timeout: string;
}

export interface MockEndpointResponse extends MockEndpoint {
  timeout: number;
}
