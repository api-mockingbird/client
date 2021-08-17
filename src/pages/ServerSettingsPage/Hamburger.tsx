import { styled } from 'solid-styled-components';

import { isHamburgerActive, setIsHamburgerActive } from '../../store';

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

interface LineProps {
  isShrunk: boolean;
}

const Line = styled('div')<LineProps>(
  props => `
    width: 2.4rem;
    height: 0.3rem;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 0.4rem;
    background-color: white;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 2.4rem;
      height: 0.3rem;
      border-radius: 0.4rem;
      background-color: white;
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
  const toggleBurger = () => setIsHamburgerActive(!isHamburgerActive());

  return (
    <Wrapper onClick={toggleBurger}>
      <Line isShrunk={isHamburgerActive()} />
    </Wrapper>
  );
};

export default Hamburger;
