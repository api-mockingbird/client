import { GraphQLError } from 'graphql';

const handleServerErrorsOnSave = (
  errors: GraphQLError[],
  messageSetters: Record<
    string,
    <U extends string>(v: U extends Function ? never : U) => U
  >
) => {
  switch (errors[0].message) {
    case 'Mock endpoint already exists':
      messageSetters.setHttpMethodErrorMessage(
        'Combination of HTTP method and URL path must be unique.'
      );
      messageSetters.setUrlPathErrorMessage(
        'Combination of HTTP method and URL path must be unique.'
      );
      break;
    default:
      alert('Internal Server Error.');
  }
};

export default handleServerErrorsOnSave;
