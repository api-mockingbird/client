import InputFieldWrapper from './InputFieldWrapper';
import Select from '../../components/Select';
import StyledLabel from './Label';

type OptionValue = string | number;

interface LabeledSelectProps {
  label: string;
  options: { value: string | number; text: string }[];
  preSelectedValue?: OptionValue;
  onChange: () => void;
}

const LabeledSelect = (props: LabeledSelectProps) => {
  return (
    <InputFieldWrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Select
        onChange={props.onChange}
        options={props.options}
        preSelectedValue={props.preSelectedValue}
      />
    </InputFieldWrapper>
  );
};

export default LabeledSelect;
