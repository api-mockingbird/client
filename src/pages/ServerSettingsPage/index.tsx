import { Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { isHamburgerActive, isViewportNarrow } from '../../store';

const Wrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

const Body = () => {
  return (
    <Wrapper>
      <Show when={!isViewportNarrow() || isHamburgerActive()}>
        <Sidebar />
      </Show>
      <MainContent />
    </Wrapper>
  );
};

export default Body;
