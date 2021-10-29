import { createClient } from '@urql/core';

const client = createClient({
  url: `${import.meta.env.VITE_SERVER_HOST}/graphql`,
  fetchOptions: { credentials: 'include' },
});

export default client;
