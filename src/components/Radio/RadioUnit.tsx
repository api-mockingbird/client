import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

const Label = styled('label')`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input = styled('input')<InputProps>`
  display: none;
`;

const Indicator = styled('div')`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  border-radius: 50%;
  display: grid;
  place-items: center;
`;

interface IndicatorFillProps {
  isActive: boolean;
}

const IndicatorFill = styled('div')<IndicatorFillProps>`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
`;

const TextWrapper = styled('span')`
  font-size: 14px;
`;

interface RadioUnitProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioUnit = (props: RadioUnitProps) => {
  return (
    <Label>
      <Input
        type='radio'
        name={props.name}
        value={props.value}
        checked={props.checked}
      />
      <Indicator>
        <IndicatorFill isActive={props.checked!} />
      </Indicator>
      <TextWrapper>{props.label}</TextWrapper>
    </Label>
  );
};

export default RadioUnit;
