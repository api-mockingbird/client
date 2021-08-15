import { styled } from 'solid-styled-components';

import Sidebar from './Sidebar';

const Wrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

const Body = () => {
  return (
    <Wrapper>
      <Sidebar />
    </Wrapper>
  );
};

export default Body;
