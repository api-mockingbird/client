import { styled } from 'solid-styled-components';

const Wrapper = styled('div')(
  () => `
    position: fixed;
    width: 26rem;
    height: 100%;
    border-right: 1px solid #e6e6e6;
    background-color: white;
  `
);

const Sidebar = () => {
  return <Wrapper></Wrapper>;
};

export default Sidebar;
