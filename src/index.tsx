import { render } from 'solid-js/web';

import App from './App';
import GlobalStyles from './GlobalStyles';

render(
  () => (
    <>
      <GlobalStyles />
      <App />
    </>
  ),
  document.getElementById('root')!
);
