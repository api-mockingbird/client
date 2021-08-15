import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

interface StyledInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled('input')<StyledInputProps>`
  width: 100%;
  height: 4rem;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  border: 1px solid black;
  border-radius: 5px;
`;

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
}

const Input = (props: InputProps) => {
  return (
    <StyledInput
      type={props.type || 'text'}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
