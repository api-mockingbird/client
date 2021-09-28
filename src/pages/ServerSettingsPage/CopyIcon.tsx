import { styled } from 'solid-styled-components';
import CopyToClipboard from '../../icons/CopyToClipboard';

const Wrapper = styled('span')`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export interface CopyIconProps {
  onClick: () => void;
}

const CopyIcon = (props: CopyIconProps) => {
  return (
    <Wrapper onClick={props.onClick}>
      <CopyToClipboard />
    </Wrapper>
  );
};

export default CopyIcon;
