import { JSX, For } from 'solid-js';
import { styled } from 'solid-styled-components';

const Container = styled('div')`
  position: relative;
  width: 100%;
  cursor: pointer;
`;
interface StyledSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  borderColor?: string;
}

const StyledSelect = styled('select')<StyledSelectProps>(
  props => `
    width: 100%;
    height: 4rem;
    padding: 1rem 3.4rem 1rem 1.2rem;
    font-size: 1.4rem;
    border: 1px solid ${props.borderColor || 'black'};
    border-radius: 5px;
    appearance: none;
    -webkit-appearance: none;
  `
);

const Arrow = styled('span')`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 3.6rem;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
  }
  &::before {
    top: 40%;
    border-bottom: 0.4rem solid black;
  }
  &::after {
    top: 60%;
    border-top: 0.4rem solid black;
  }
`;

type OptionValue = string | number;

interface SelectProps {
  options: { value: OptionValue; text: string }[];
  preSelectedValue?: OptionValue;
  onChange: (ev: Event) => void;
  borderColor?: string;
}

const Select = (props: SelectProps) => {
  return (
    <Container>
      <StyledSelect onChange={props.onChange} borderColor={props.borderColor}>
        <For each={props.options}>
          {option => (
            <option
              value={option.value}
              selected={option.value === props.preSelectedValue}
            >
              {option.text}
            </option>
          )}
        </For>
      </StyledSelect>
      <Arrow />
    </Container>
  );
};

export default Select;
