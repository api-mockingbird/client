import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

interface StyledInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
}

const StyledInput = styled('input')<StyledInputProps>(
  props => `
    width: ${props.width};
    max-width: ${props.maxWidth};
    height: 4rem;
    padding: 1rem 1rem;
    font-size: 1.4rem;
    border: 1px solid black;
    border-radius: 5px;
  `
);

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  onChange: () => void;
}

const Input = (props: InputProps) => {
  return (
    <StyledInput
      width={props.width}
      maxWidth={props.maxWidth}
      type={props.type || 'text'}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
