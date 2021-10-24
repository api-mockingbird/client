const setClientValidationErrors = (
  validationResult: Record<string, string>,
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  if (validationResult.endpointName) {
    switch (validationResult.endpointName) {
      case 'EMPTY':
        messageSetters.setEndpointNameErrorMessage('Field is required.');
        break;
      default:
        messageSetters.setEndpointNameErrorMessage('Endpoint name is invalid.');
    }
  }

  if (validationResult.urlPath) {
    switch (validationResult.urlPath) {
      case 'EMPTY':
        messageSetters.setUrlPathErrorMessage('Field is required.');
        break;
      case 'FIRST_CHAR_NOT_SLASH':
        messageSetters.setUrlPathErrorMessage(
          'URL path should start with a forward slash(/).'
        );
        break;
      default:
        messageSetters.setUrlPathErrorMessage('Url path is invalid.');
    }
  }

  if (validationResult.httpHeaders) {
    switch (validationResult.httpHeaders) {
      case 'NOT_JSON_FORMAT':
        messageSetters.setHttpHeadersErrorMessage(
          'HTTP headers must be in JSON format.'
        );
        break;
      default:
        messageSetters.setHttpHeadersErrorMessage('HTTP headers is invalid.');
    }
  }

  if (validationResult.timeout) {
    switch (validationResult.timeout) {
      case 'NAN':
        messageSetters.setTimeoutErrorMessage(
          'Timeout value must be a number.'
        );
        break;
      case 'NEGATIVE':
        messageSetters.setTimeoutErrorMessage(
          'Timeout value cannot be a negative number'
        );
        break;
      default:
        messageSetters.setTimeoutErrorMessage('Timeout value is invalid.');
    }
  }
};

export default setClientValidationErrors;
