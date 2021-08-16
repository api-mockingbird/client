import { onMount } from 'solid-js';

import Header from './pages/ServerSettingsPage/components/Header';
import Body from './pages/ServerSettingsPage';
import { setIsViewportNarrow } from './store';

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

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default App;
