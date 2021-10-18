import { styled } from 'solid-styled-components';

import Textarea from './Textarea';

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
    <Wrapper>
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
    </Wrapper>
  );
};

export default LabeledTextarea;