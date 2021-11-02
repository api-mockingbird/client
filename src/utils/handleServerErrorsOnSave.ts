import { GraphQLError } from 'graphql';

import { BAD_USER_INPUT } from '../constants/errorCodes';
import {
  ENDPOINT_ALREADY_EXISTS,
  INTERNAL_SERVER_ERROR,
  TOO_MANY_MOCK_ENDPOINTS,
} from '../constants/messages';

const handleServerErrorsOnSave = (
  errors: GraphQLError[],
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  switch (errors[0]?.extensions?.code) {
    case BAD_USER_INPUT:
      messageSetters.setHttpMethodErrorMessage(ENDPOINT_ALREADY_EXISTS);
      messageSetters.setUrlPathErrorMessage(ENDPOINT_ALREADY_EXISTS);
      break;
    case TOO_MANY_MOCK_ENDPOINTS:
      alert(TOO_MANY_MOCK_ENDPOINTS);
      break;
    default:
      alert(INTERNAL_SERVER_ERROR);
  }
};

export default handleServerErrorsOnSave;
