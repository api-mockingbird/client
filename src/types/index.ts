export interface User {
  id: string;
  createdAt: Date;
  isTemp: boolean;
  mockEndpoints: [MockEndpointResponse];
}

interface MockEndpoint {
  endpointName: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  urlPath: string;
  httpStatus: 200 | 204 | 400 | 401 | 403 | 404 | 405 | 500 | 502 | 503 | 504;
  responseContentType: 'application/json' | 'application/x-www-form-urlencoded';
  charset: 'UTF-8';
  httpHeaders: string;
  httpResponseBody: string;
}

export interface MockEndpointInput extends MockEndpoint {
  timeout: string;
}

export interface MockEndpointResponse extends MockEndpoint {
  id: number;
  timeout: number;
}
