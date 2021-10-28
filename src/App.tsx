import { createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';

import client from './api/client';
import { userQuery } from './api/query-documents';
import ServerSettingsPage from './pages/ServerSettingsPage';

const App = () => {
  const [user, setUser] = createSignal(null);

  pipe(
    client.query(userQuery),
    subscribe(res => {
      if (res.error) {
        const errors = res.error.graphQLErrors;

        switch (errors[0]?.message) {
          case 'Context creation failed: Unauthenticated':
            alert('Authentication failed.');
            break;
          default:
            alert('Internal Server Error.');
        }

        return;
      }

      setUser(res.data.getUser);
    })
  );

  return <ServerSettingsPage user={user()} />;
};

export default App;
