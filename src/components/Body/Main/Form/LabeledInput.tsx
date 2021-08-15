import { styled } from 'solid-styled-components';

import StyledLabel from './Label';
import Input from '../../../Input';

const Wrapper = styled('div')`
  margin-bottom: 1.4rem;
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
  onChange: () => void;
  description: string;
  errorMessage: string;
  placeholder?: string;
}

const LabeledInput = (props: LabeledInputProps) => {
  return (
    <Wrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      <Message isRed={!!props.errorMessage}>
        {props.errorMessage || props.description}
      </Message>
    </Wrapper>
  );
};

export default LabeledInput;
