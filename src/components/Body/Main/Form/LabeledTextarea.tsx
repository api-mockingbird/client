import { styled } from 'solid-styled-components';

import Textarea from '../../../Textarea';
import StyledLabel from './Label';

const Wrapper = styled('div')`
  margin-bottom: 1.4rem;
`;

interface LabeledTextareaProps {
  label: string;
  value: string;
  onChange: () => void;
  placeholder?: string;
  rows?: number;
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
    </Wrapper>
  );
};

export default LabeledTextarea;
