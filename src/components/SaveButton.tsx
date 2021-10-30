import Button, { ButtonProps } from './Button';

interface SaveButtonProps extends ButtonProps {
  isFetching: boolean;
  isNew: boolean;
}

const SaveButton = (props: SaveButtonProps) => {
  return (
    <Button
      width='100%'
      height='4.2rem'
      color='white'
      backgroundColor='#2e5cf2'
      disabled={props.isFetching}
      onClick={props.onClick}
    >
      {props.isFetching ? 'Saving...' : props.isNew ? 'Save' : 'Update'}
    </Button>
  );
};

export default SaveButton;
