import { styled } from 'solid-styled-components';

const Wrapper = styled('aside')(
  () => `
    position: fixed;
    width: 26rem;
    height: 100%;
    box-shadow: 0 10px 40px rgb(0 0 0 / 10%);
    background-color: #f5f5f5;
    z-index: 1000;
  `
);

const Sidebar = () => {
  return <Wrapper></Wrapper>;
};

export default Sidebar;
