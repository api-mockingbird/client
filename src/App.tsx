import { gql } from '@urql/core';
import { createQuery } from 'solid-urql';

import ServerSettingsPage from './pages/ServerSettingsPage';

const userQuery = gql`
  query {
    getUser {
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
  const [user, userState, reexecuteQuery] = createQuery({ query: userQuery });

  return <ServerSettingsPage user={user()} />;
};

export default App;
