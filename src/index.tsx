import { render } from 'solid-js/web';

import GlobalStyles from './GlobalStyles';
import App from './App';

render(
  () => (
    <>
      <GlobalStyles />
      <App />
    </>
  ),
  document.getElementById('root')!
);
