import { Show } from 'solid-js';
import { styled } from 'solid-styled-components';

import Hamburger from './Hamburger';
import Button from '../../components/Button';
import { isViewportNarrow } from '../../store';

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
  background-color: #151515;
  z-index: 1000;
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
  color: white;
`;

const AuthButton = () => {
  return (
    <Button
      color='white'
      backgroundColor='#151515'
      borderColor='white'
      onClick={() => console.log('hi')}
    >
      Sign In
    </Button>
  );
};

const Header = () => {
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
