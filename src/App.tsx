import { createSignal } from 'solid-js';
import { pipe, subscribe } from 'wonka';

import client from './api/client';
import { userQuery } from './api/query-documents';
import ServerSettingsPage from './pages/ServerSettingsPage';

const App = () => {
  const [user, setUser] = createSignal(null);

  pipe(
    client.query(userQuery),
    subscribe(res => setUser(res.data.getUser))
  );

  return <ServerSettingsPage user={user()} />;
};

export default App;
