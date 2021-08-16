import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

export interface StyledButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
}

const StyledButton = styled('button')<ButtonProps>(
  props => `
    width: ${props.width || 'fit-content'};
    height: ${props.height || 'fit-content'};
    padding: 0.8rem 1rem;
    font-size: ${props.fontSize || '1.6rem'};
    text-align: center;
    color: ${props.color || 'black'};
    background-color: ${props.backgroundColor || 'white'};
    border: 1px solid;
    border-radius: 0.5rem;
  `
);

export interface ButtonProps extends StyledButtonProps {
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      type='button'
      width={props.width}
      height={props.height}
      fontSize={props.fontSize}
      color={props.color}
      backgroundColor={props.backgroundColor}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
