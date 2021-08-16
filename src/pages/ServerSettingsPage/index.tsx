import { Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { isHamburgerActive, isViewportNarrow } from '../../store';

const BodyWrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

const ServerSettingsPage = () => {
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
