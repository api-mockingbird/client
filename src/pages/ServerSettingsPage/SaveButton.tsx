import Button, { ButtonProps } from '../../components/Button';

const SaveButton = (props: ButtonProps) => {
  return (
    <Button
      width='100%'
      height='4.2rem'
      color='white'
      backgroundColor='blue'
      onClick={props.onClick}
    >
      Save
    </Button>
  );
};

export default SaveButton;
