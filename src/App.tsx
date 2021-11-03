import { createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';

import client from './api/client';
import { userQuery } from './api/queries';
import { UNAUTHENTICATED } from './constants/errorCodes';
import {
  AUTH_FAILED,
  INTERNAL_SERVER_ERROR,
  TOO_MANY_REQUESTS,
} from './constants/messages';
import ServerSettingsPage from './pages/ServerSettingsPage';

const App = () => {
  const [user, setUser] = createSignal(null);

  pipe(
    client.query(userQuery),
    subscribe(res => {
      if (res.error) {
        if (res.error.response.status === 429) {
          alert(TOO_MANY_REQUESTS);

          return;
        }

        const errors = res.error.graphQLErrors;

        switch (errors[0]?.extensions?.code) {
          case UNAUTHENTICATED:
            alert(AUTH_FAILED);
            break;
          default:
            alert(INTERNAL_SERVER_ERROR);
        }

        return;
      }

      setUser(res.data.getUser);
    })
  );

  return <ServerSettingsPage user={user()} />;
};

export default App;
