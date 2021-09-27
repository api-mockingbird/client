import { render } from 'solid-js/web';
import { createClient, Provider } from 'solid-urql';

import GlobalStyles from './GlobalStyles';
import App from './App';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: { credentials: 'include' },
});

render(
  () => (
    <>
      <GlobalStyles />
      <Provider value={client}>
        <App />
      </Provider>
    </>
  ),
  document.getElementById('root')!
);
