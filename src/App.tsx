import { onMount } from 'solid-js';

import Header from './components/Header';
import Body from './components/Body';
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
