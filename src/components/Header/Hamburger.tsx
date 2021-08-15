import { createSignal, createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: center start;
  cursor: pointer;
  width: 2.4rem;
  height: 3rem;
  transition-timing-function: linear;
  transition-duration: 0.15s;
`;

const Line = styled('div')(
  (props: { isShrunk: boolean }) => `
    width: 2.4rem;
    height: 0.3rem;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 0.4rem;
    background-color: black;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 2.4rem;
      height: 0.3rem;
      border-radius: 0.4rem;
      background-color: black;
    }
    &::before {
      transform: ${props.isShrunk ? 'translateY(0)' : 'translateY(-0.7rem)'};
    }
    &::after {
      transform: ${props.isShrunk ? 'translateY(0)' : 'translateY(0.7rem)'};
    }
  `
);

const Hamburger = () => {
  const [isShrunk, setIsShrunk] = createSignal(false);
  const toggleBurger = () => {
    if (isShrunk()) {
      setIsShrunk(false);
    } else {
      setIsShrunk(true);
    }
  };

  return (
    <Wrapper onClick={toggleBurger}>
      <Line isShrunk={isShrunk()} />
    </Wrapper>
  );
};

export default Hamburger;
