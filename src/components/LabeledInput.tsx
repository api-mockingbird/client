import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

import Input from './Input';

const Wrapper = styled('div')`
  margin-bottom: 1.6rem;
`;

const StyledLabel = styled('div')`
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

interface MessageProps {
  isRed: boolean;
}

const Message = styled('div')<MessageProps>(
  props => `
    margin-top: 0.4rem;
    font-size: 1.2rem;
    color: ${props.isRed ? 'red' : 'black'};
  `
);

interface LabeledInputProps {
  label: string;
  value: string;
  onInput?: (event: Event) => void;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  suffix?: string | JSX.Element;
  borderColor?: string;
  readonly?: boolean;
}

const LabeledInput = (props: LabeledInputProps) => {
  return (
    <Wrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Input
        value={props.value}
        onInput={props.onInput}
        placeholder={props.placeholder}
        suffix={props.suffix}
        borderColor={props.borderColor}
        readOnly={props.readonly}
      />
      <Message isRed={!!props.errorMessage}>
        {props.errorMessage || props.description}
      </Message>
    </Wrapper>
  );
};

export default LabeledInput;
