import { JSX, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
`;

interface StyledInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  hasSuffix: boolean;
}

const StyledInput = styled('input')<StyledInputProps>(
  props => `
    width: 100%;
    height: 4rem;
    padding: ${props.hasSuffix ? '1rem 4rem 1rem 1.2rem' : '1rem 1.2rem'};
    font-size: 1.4rem;
    border: 1px solid black;
    border-radius: 5px;
  `
);

const Suffix = styled('span')`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-right: 1.2rem;
  font-size: 1.4rem;
  background-color: transparent;
`;

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  onChange?: () => void;
  suffix?: string | JSX.Element;
}

const Input = (props: InputProps) => {
  return (
    <Wrapper>
      <StyledInput
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        hasSuffix={!!props.suffix}
        readOnly={props.readOnly}
      />
      <Show when={props.suffix}>
        <Suffix>{props.suffix}</Suffix>
      </Show>
    </Wrapper>
  );
};

export default Input;
