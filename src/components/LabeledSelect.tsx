import { styled } from 'solid-styled-components';

import Select from './Select';

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
    font-size: 1.3rem;
    color: ${props.isRed ? 'red' : 'black'};
  `
);

type OptionValue = string | number;

interface LabeledSelectProps {
  label: string;
  options: { value: string | number; text: string }[];
  preSelectedValue?: OptionValue;
  onChange: () => void;
  description?: string;
  errorMessage?: string;
  borderColor?: string;
}

const LabeledSelect = (props: LabeledSelectProps) => {
  return (
    <Wrapper>
      <StyledLabel>{props.label}</StyledLabel>
      <Select
        onChange={props.onChange}
        options={props.options}
        preSelectedValue={props.preSelectedValue}
        borderColor={props.borderColor}
      />
      <Message isRed={!!props.errorMessage}>
        {props.errorMessage || props.description}
      </Message>
    </Wrapper>
  );
};

export default LabeledSelect;
