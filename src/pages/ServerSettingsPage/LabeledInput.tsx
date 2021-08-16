import { styled } from 'solid-styled-components';

import InputFieldWrapper from './InputFieldWrapper';
import StyledLabel from './Label';
import Input from '../../components/Input';

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
  onChange: () => void;
  description: string;
  errorMessage: string;
  placeholder?: string;
  suffix?: string;
}

const LabeledInput = (props: LabeledInputProps) => {
  return (
    <InputFieldWrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        suffix={props.suffix}
      />
      <Message isRed={!!props.errorMessage}>
        {props.errorMessage || props.description}
      </Message>
    </InputFieldWrapper>
  );
};

export default LabeledInput;
