import { JSX } from 'solid-js';
import { PropAliases } from 'solid-js/web';
import { styled } from 'solid-styled-components';

import Select from '../../../Select';

const Wrapper = styled('div')`
  margin-bottom: 1.4rem;
`;

const StyledLabel = styled('div')`
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;

type OptionValue = string | number;

interface LabeledSelectProps {
  label: string;
  options: { value: string | number; text: string }[];
  preSelectedValue?: OptionValue;
  onChange: () => void;
}

const LabeledSelect = (props: LabeledSelectProps) => {
  return (
    <Wrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Select
        onChange={props.onChange}
        options={props.options}
        preSelectedValue={props.preSelectedValue}
      />
    </Wrapper>
  );
};

export default LabeledSelect;
