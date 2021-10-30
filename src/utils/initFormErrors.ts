import {
  setEndpointNameErrorMessage,
  setHttpHeadersErrorMessage,
  setHttpMethodErrorMessage,
  setTimeoutErrorMessage,
  setUrlPathErrorMessage,
} from '../store';

const initFormErrors = () => {
  setEndpointNameErrorMessage('');
  setHttpMethodErrorMessage('');
  setUrlPathErrorMessage('');
  setHttpHeadersErrorMessage('');
  setTimeoutErrorMessage('');
};

export default initFormErrors;
