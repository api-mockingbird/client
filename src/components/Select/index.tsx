import { JSX, For } from 'solid-js';
import { styled } from 'solid-styled-components';

interface ContainerProps {
  width?: string;
}

const Container = styled('div')<ContainerProps>(
  props => `
    position: relative;
    width: ${props.width};
  `
);

interface StyledSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement> {}

const StyledSelect = styled('select')<StyledSelectProps>(
  () => `
    width: 100%;
    height: 4rem;
    padding: 1rem 3.4rem 1rem 1rem;
    font-size: 1.4rem;
    border: 1px solid black;
    border-radius: 5px;
    appearance: none;
  `
);

const Arrow = styled('span')`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 100%;
  width: 3.6rem;
  background-color: transparent;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  }
  &::after {
    border-top: 0.5rem solid black;
  }
`;

interface SelectProps {
  options: { value: string | number; text: string }[];
  onChange: (ev: Event) => void;
}

const Select = (props: SelectProps) => {
  return (
    <Container width='100%'>
      <StyledSelect onChange={props.onChange}>
        <For each={props.options}>
          {option => <option value={option.value}>{option.text}</option>}
        </For>
      </StyledSelect>
      <Arrow />
    </Container>
  );
};

export default Select;
