import { styled } from 'solid-styled-components';

import Form from './Form';
import { isViewportNarrow } from '../../../store';

interface WrapperProps {
  hasMargin: boolean;
}

const Wrapper = styled('div')<WrapperProps>(
  props => `
    margin-left: ${props.hasMargin ? '26rem' : 0};
    width: 100%;
  `
);

const ContentWrapper = styled('div')`
  margin: 2rem auto;
  min-width: 28rem;
  max-width: 40rem;
  padding: 1.5rem;
`;

const Main = () => {
  return (
    <Wrapper hasMargin={!isViewportNarrow()}>
      <ContentWrapper>
        <Form />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Main;
