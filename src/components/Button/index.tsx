import { styled } from 'solid-styled-components';

interface IStyledButtonProps {
  fontSize?: string;
  disabled?: boolean;
}

const StyledButton = styled('button')(
  (props: IStyledButtonProps) => `
    display: flex;
    align-items: center;
    padding: .8rem 1rem;
    font-size: ${props.fontSize || '1.6rem'};
    background-color: white;
    border: 1px solid;
    border-radius: 0.5rem;

    .icon {
      display: flex;
      margin-right: .8rem;
      vertical-align: middle;
      width: 2rem;
      height: 2rem;
    }
  `
);

interface IButtonProps {
  onClick: () => void;
  children: any;
}

const Button = (props: IButtonProps) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
