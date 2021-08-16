import { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

interface StyledTextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  maxWidth?: string;
}

const StyledTextarea = styled('textarea')<StyledTextareaProps>`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  border: 1px solid black;
  border-radius: 5px;
  resize: vertical;
`;
interface TextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: () => void;
}

const Textarea = (props: TextareaProps) => {
  return (
    <StyledTextarea
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      rows={props.rows}
    />
  );
};

export default Textarea;
