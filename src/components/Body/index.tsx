import { styled } from 'solid-styled-components';

import Sidebar from './Sidebar';

const Wrapper = styled('div')`
  display: flex;
`;

const Body = () => {
  return (
    <Wrapper>
      <Sidebar />
    </Wrapper>
  );
};

export default Body;
