import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

interface StyledTextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  maxWidth?: string;
  borderColor?: string;
}

const StyledTextarea = styled('textarea')<StyledTextareaProps>(
  props => `
    width: 100%;
    padding: 1rem 1.2rem;
    font-size: 1.4rem;
    border: 1px solid ${props.borderColor || 'black'};
    border-radius: 5px;
    resize: vertical;
  `
);
interface TextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onInput: (event: Event) => void;
  borderColor?: string;
}

const Textarea = (props: TextareaProps) => {
  return (
    <StyledTextarea
      value={props.value}
      onInput={props.onInput}
      placeholder={props.placeholder}
      rows={props.rows}
      borderColor={props.borderColor}
    />
  );
};

export default Textarea;
