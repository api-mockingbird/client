import { styled } from 'solid-styled-components';

import InputFieldWrapper from './InputFieldWrapper';
import Textarea from '../../components/Textarea';
import StyledLabel from './Label';

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

interface LabeledTextareaProps {
  label: string;
  value: string;
  onChange: () => void;
  placeholder?: string;
  rows?: number;
  description?: string;
  errorMessage?: string;
}

const LabeledTextarea = (props: LabeledTextareaProps) => {
  return (
    <InputFieldWrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Textarea
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        rows={props.rows}
      />
      <Message isRed={!!props.errorMessage}>
        {props.errorMessage || props.description}
      </Message>
    </InputFieldWrapper>
  );
};

export default LabeledTextarea;
