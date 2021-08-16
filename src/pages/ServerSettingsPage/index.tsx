import { onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import {
  isHamburgerActive,
  isViewportNarrow,
  setIsViewportNarrow,
} from '../../store';

const BodyWrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

const ServerSettingsPage = () => {
  onMount(() => {
    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 520px)').matches) {
        setIsViewportNarrow(false);
      } else {
        setIsViewportNarrow(true);
      }
    });
  });

  return (
    <>
      <Header />
      <BodyWrapper>
        <Show when={!isViewportNarrow() || isHamburgerActive()}>
          <Sidebar />
        </Show>
        <MainContent />
      </BodyWrapper>
    </>
  );
};

export default ServerSettingsPage;
