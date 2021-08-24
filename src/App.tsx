import { createClient, Provider as GqlProvider } from 'solid-urql';

import ServerSettingsPage from './pages/ServerSettingsPage';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' },
  //   };
  // },
});

const App = () => {
  return (
    <GqlProvider value={client}>
      <ServerSettingsPage />
    </GqlProvider>
  );
};

export default App;
