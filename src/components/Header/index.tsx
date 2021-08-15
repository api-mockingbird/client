import { createSignal, onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import Hamburger from './Hamburger';
import AuthButton from './AuthButton';

const Wrapper = styled('header')`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 280px;
  height: 6.2rem;
  padding: 0 1.8rem;
  border-bottom: 1px solid #e6e6e6;
`;

const LeftSectionWrapper = styled('div')`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
`;

const Title = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.1rem;
`;

const Header = () => {
  const [isViewportNarrow, setIsViewportNarrow] = createSignal(
    window.innerWidth < 480
  );

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
    <Wrapper>
      <LeftSectionWrapper>
        <Show when={isViewportNarrow()}>
          <Hamburger />
        </Show>
        <Title>Mockingbird</Title>
      </LeftSectionWrapper>
      <AuthButton />
    </Wrapper>
  );
};

export default Header;
