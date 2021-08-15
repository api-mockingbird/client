import { styled } from 'solid-styled-components';

const Wrapper = styled('div')(
  () => `
    width: 20rem;
    height: 100%;
    border-right: 1px solid #e6e6e6;
  `
);

const Sidebar = () => {
  return <Wrapper></Wrapper>;
};

export default Sidebar;
