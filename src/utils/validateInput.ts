import {
  EMPTY,
  FIRST_CHAR_NOT_SLASH,
  NAN,
  NEGATIVE,
  NOT_JSON_FORMAT,
} from '../constants/validationResults';
import { MockEndpointInput } from '../types';

const validateInput = (mockEndpointInput: MockEndpointInput) => {
  const errorInfo: Record<string, string> = {};

  if (!mockEndpointInput.endpointName) {
    errorInfo.endpointName = EMPTY;
  }

  if (!mockEndpointInput.urlPath) {
    errorInfo.urlPath = EMPTY;
  } else if (mockEndpointInput.urlPath[0] !== '/') {
    errorInfo.urlPath = FIRST_CHAR_NOT_SLASH;
  }

  if (mockEndpointInput.httpHeaders) {
    try {
      const parsed = JSON.parse(mockEndpointInput.httpHeaders);

      if (!parsed || typeof parsed !== 'object') {
        errorInfo.httpHeaders = NOT_JSON_FORMAT;
      }
    } catch {
      errorInfo.httpHeaders = NOT_JSON_FORMAT;
    }
  }

  if (isNaN(mockEndpointInput.timeout as any)) {
    errorInfo.timeout = NAN;
  } else if (Number(mockEndpointInput.timeout) < 0) {
    errorInfo.timeout = NEGATIVE;
  }

  return errorInfo;
};

export default validateInput;
