import { onMount } from 'solid-js';

import { setIsViewportNarrow } from './store';
import ServerSettingsPage from './pages/ServerSettingsPage';

const App = () => {
  onMount(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 480px)').matches) {
        setIsViewportNarrow(false);
      } else {
        setIsViewportNarrow(true);
      }
    });
  });

  return <ServerSettingsPage />;
};

export default App;
