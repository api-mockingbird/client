import { GraphQLError } from 'graphql';

import {
  ENDPOINT_ALREADY_EXISTS,
  INTERNAL_SERVER_ERROR,
} from '../constants/messages';

const handleServerErrorsOnSave = (
  errors: GraphQLError[],
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  switch (errors[0]?.message) {
    case 'Mock endpoint already exists':
      messageSetters.setHttpMethodErrorMessage(ENDPOINT_ALREADY_EXISTS);
      messageSetters.setUrlPathErrorMessage(ENDPOINT_ALREADY_EXISTS);
      break;
    default:
      alert(INTERNAL_SERVER_ERROR);
  }
};

export default handleServerErrorsOnSave;
