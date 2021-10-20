const setClientValidationErrors = (
  validationResult: Record<string, string>,
  setNameErrorMessage: <U extends string>(
    v: U extends Function ? never : U
  ) => U,
  setUrlPathErrorMessage: <U extends string>(
    v: U extends Function ? never : U
  ) => U,
  setHttpHeadersErrorMessage: <U extends string>(
    v: U extends Function ? never : U
  ) => U,
  setTimeoutErrorMessage: <U extends string>(
    v: U extends Function ? never : U
  ) => U
) => {
  if (validationResult.endpointName) {
    switch (validationResult.endpointName) {
      case 'EMPTY':
        setNameErrorMessage('Field is required');
        break;
      default:
        setNameErrorMessage('Endpoint name is invalid.');
    }
  }

  if (validationResult.urlPath) {
    switch (validationResult.urlPath) {
      case 'EMPTY':
        setUrlPathErrorMessage('Field is required');
        break;
      default:
        setUrlPathErrorMessage('Url path is invalid.');
    }
  }

  if (validationResult.httpHeaders) {
    switch (validationResult.httpHeaders) {
      case 'NOT_JSON_FORMAT':
        setHttpHeadersErrorMessage('HTTP headers must be in JSON format.');
        break;
      default:
        setHttpHeadersErrorMessage('HTTP headers is invalid.');
    }
  }

  if (validationResult.timeout) {
    switch (validationResult.timeout) {
      case 'NAN':
        setTimeoutErrorMessage('Timeout value must be a number.');
        break;
      case 'NEGATIVE':
        setTimeoutErrorMessage('Timeout value cannot be a negative number');
        break;
      default:
        setTimeoutErrorMessage('Timeout value is invalid.');
    }
  }
};

export default setClientValidationErrors;
