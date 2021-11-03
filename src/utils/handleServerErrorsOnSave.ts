import { CombinedError } from '@urql/core';

import {
  BAD_USER_INPUT,
  TOO_MANY_MOCK_ENDPOINTS as TOO_MANY_MOCK_ENDPOINTS_CODE,
} from '../constants/errorCodes';
import {
  ENDPOINT_ALREADY_EXISTS,
  INTERNAL_SERVER_ERROR,
  TOO_MANY_MOCK_ENDPOINTS as TOO_MANY_MOCK_ENDPOINTS_MSG,
  TOO_MANY_REQUESTS,
} from '../constants/messages';

const handleServerErrorsOnSave = (
  error: CombinedError,
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  if (error.response.status === 429) {
    alert(TOO_MANY_REQUESTS);

    return;
  }

  switch (error.graphQLErrors[0]?.extensions?.code) {
    case BAD_USER_INPUT:
      messageSetters.setHttpMethodErrorMessage(ENDPOINT_ALREADY_EXISTS);
      messageSetters.setUrlPathErrorMessage(ENDPOINT_ALREADY_EXISTS);
      break;
    case TOO_MANY_MOCK_ENDPOINTS_CODE:
      alert(TOO_MANY_MOCK_ENDPOINTS_MSG);
      break;
    default:
      alert(INTERNAL_SERVER_ERROR);
  }
};

export default handleServerErrorsOnSave;
