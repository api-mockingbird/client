import {
  FIELD_REQUIRED,
  HTTP_HEADERS_INVALID,
  HTTP_HEADERS_JSON,
  NAME_INVALID,
  START_WITH_SLASH,
  TIMEOUT_INVALID,
  TIMEOUT_NAN,
  TIMEOUT_NEGATIVE,
  URL_INVALID,
} from '../constants/messages';
import {
  EMPTY,
  FIRST_CHAR_NOT_SLASH,
  NAN,
  NEGATIVE,
  NOT_JSON_FORMAT,
} from '../constants/validationResults';

const setClientValidationErrors = (
  validationResult: Record<string, string>,
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  if (validationResult.endpointName) {
    switch (validationResult.endpointName) {
      case EMPTY:
        messageSetters.setEndpointNameErrorMessage(FIELD_REQUIRED);
        break;
      default:
        messageSetters.setEndpointNameErrorMessage(NAME_INVALID);
    }
  }

  if (validationResult.urlPath) {
    switch (validationResult.urlPath) {
      case EMPTY:
        messageSetters.setUrlPathErrorMessage(FIELD_REQUIRED);
        break;
      case FIRST_CHAR_NOT_SLASH:
        messageSetters.setUrlPathErrorMessage(START_WITH_SLASH);
        break;
      default:
        messageSetters.setUrlPathErrorMessage(URL_INVALID);
    }
  }

  if (validationResult.httpHeaders) {
    switch (validationResult.httpHeaders) {
      case NOT_JSON_FORMAT:
        messageSetters.setHttpHeadersErrorMessage(HTTP_HEADERS_JSON);
        break;
      default:
        messageSetters.setHttpHeadersErrorMessage(HTTP_HEADERS_INVALID);
    }
  }

  if (validationResult.timeout) {
    switch (validationResult.timeout) {
      case NAN:
        messageSetters.setTimeoutErrorMessage(TIMEOUT_NAN);
        break;
      case NEGATIVE:
        messageSetters.setTimeoutErrorMessage(TIMEOUT_NEGATIVE);
        break;
      default:
        messageSetters.setTimeoutErrorMessage(TIMEOUT_INVALID);
    }
  }
};

export default setClientValidationErrors;
