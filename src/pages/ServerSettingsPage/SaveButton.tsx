import Button, { ButtonProps } from '../../components/Button';

const SaveButton = (props: ButtonProps) => {
  return (
    <Button
      width='100%'
      height='4.2rem'
      color='white'
      backgroundColor='#2e5cf2'
      onClick={props.onClick}
    >
      Save
    </Button>
  );
};

export default SaveButton;
