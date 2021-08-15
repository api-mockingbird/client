import { styled } from 'solid-styled-components';

import Button from '../Button';

const Wrapper = styled('div')`
  place-self: center end;
`;

const AuthButton = () => {
  return (
    <Wrapper>
      <Button onClick={() => console.log('hi')}>
        {/* <img className='icon' src='src/assets/github.png' alt='github logo' /> */}
        Sign In
      </Button>
    </Wrapper>
  );
};

export default AuthButton;
