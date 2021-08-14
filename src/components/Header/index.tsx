import { styled } from 'solid-styled-components';

import Button from '../Button';

const Wrapper = styled('header')`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 280px;
  height: 6.8rem;
  padding: 0 1.8rem;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
`;

const Title = styled('div')`
  font-size: 2.4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>Mockingbird</Title>
      <Button onClick={() => console.log('hi')}>
        <img className='icon' src='src/assets/github.png' alt='github logo' />
        Sign In
      </Button>
    </Wrapper>
  );
};

export default Header;
