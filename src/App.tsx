import { createClient, gql } from '@urql/core';
import { createResource } from 'solid-js';

import ServerSettingsPage from './pages/ServerSettingsPage';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' },
});

const userQuery = gql`
  query {
    getUserWithMockEndpoints {
      id
      mockEndpoints {
        id
        userId
        responseName
        httpMethod
        urlPath
        httpStatus
        responseContentType
        httpHeaders
        charset
        httpResponseBody
        timeout
      }
      isTemp
    }
  }
`;

const App = () => {
  const [user] = createResource(() =>
    client
      .query(userQuery)
      .toPromise()
      .then(({ data }) => console.log(data))
  );

  return <ServerSettingsPage />;
};

export default App;
