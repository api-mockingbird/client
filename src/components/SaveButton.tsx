import Button from './Button';

interface SaveButtonProps {
  onClick: () => void;
  isNew: boolean;
}

const SaveButton = (props: SaveButtonProps) => {
  return (
    <Button
      width='100%'
      height='4.2rem'
      color='white'
      backgroundColor='#2e5cf2'
      onClick={props.onClick}
    >
      {props.isNew ? 'Save' : 'Update'}
    </Button>
  );
};

export default SaveButton;
