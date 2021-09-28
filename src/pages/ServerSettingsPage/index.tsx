import { onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants';
import {
  isHamburgerActive,
  isViewportNarrow,
  setIsViewportNarrow,
} from '../../store';
import { User } from '../../types';
import Header from './Header';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

const BodyWrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

interface ServerSettingsPageProps {
  user: User | null;
}

const ServerSettingsPage = (props: ServerSettingsPageProps) => {
  onMount(() => {
    window.addEventListener('resize', () => {
      if (
        window.matchMedia(`(min-width: ${MOBILE_VIEWPORT_BREAKPOINT}px)`)
          .matches
      ) {
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
        <MainContent user={props.user} />
      </BodyWrapper>
    </>
  );
};

export default ServerSettingsPage;
