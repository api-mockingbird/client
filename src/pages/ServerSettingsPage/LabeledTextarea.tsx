import InputFieldWrapper from './InputFieldWrapper';
import Textarea from '../../components/Textarea';
import StyledLabel from './Label';

interface LabeledTextareaProps {
  label: string;
  value: string;
  onChange: () => void;
  placeholder?: string;
  rows?: number;
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
    </InputFieldWrapper>
  );
};

export default LabeledTextarea;
