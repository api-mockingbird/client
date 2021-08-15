import { JSX, JSXElement } from 'solid-js';
import { styled } from 'solid-styled-components';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  fontSize?: string;
  onClick: () => void;
}

const StyledButton = styled('button')<ButtonProps>(
  props => `
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    font-size: ${props.fontSize || '1.6rem'};
    background-color: white;
    border: 1px solid;
    border-radius: 0.5rem;
  `
);

const Button = (props: ButtonProps) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
