import { createSignal, For } from 'solid-js';
import { styled } from 'solid-styled-components';

import client from '../../api/client';
import { removeMockEndpointMutation } from '../../api/mutations';
import CirclePlus from '../../icons/CirclePlus';
import TrashCan from '../../icons/TrashCan';
import { MockEndpointResponse } from '../../types';
import initFormErrors from '../../utils/initFormErrors';

interface RemoveMockEndpointButtonWrapperProps {
  isVisible: boolean;
}

const RemoveMockEndpointButtonWrapper = styled(
  'span'
)<RemoveMockEndpointButtonWrapperProps>(
  props => `
    display: flex;
    align-items: center;
    cursor: pointer;
    visibility: ${props.isVisible ? 'visible' : 'hidden'};
  `
);

interface RemoveMockEndpointButtonProps {
  onClick: (event: Event) => void;
  isVisible: boolean;
}

const RemoveMockEndpointButton = (props: RemoveMockEndpointButtonProps) => {
  return (
    <RemoveMockEndpointButtonWrapper
      onClick={props.onClick}
      isVisible={props.isVisible}
    >
      <TrashCan />
    </RemoveMockEndpointButtonWrapper>
  );
};

const Wrapper = styled('aside')`
  position: fixed;
  width: 24rem;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 1000;
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 1.8rem;
  margin-bottom: 0.4rem;
`;

const Title = styled('span')`
  font-size: 2rem;
  font-weight: bold;
`;

const AddButton = styled('button')`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const StyledUl = styled('ul')`
  padding-bottom: 1.8rem;
`;

interface ListItemProps {
  isSelected: boolean;
}

const ListItem = styled('li')<ListItemProps>(
  props => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.8rem;
    margin-bottom: 0.2rem;
    background-color: ${props.isSelected ? '#d6d6d6' : 'inherit'};
    cursor: pointer;
  `
);

const ListItemDescription = styled('span')`
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface SidebarProps {
  mockEndpoints: MockEndpointResponse[] | undefined;
  currentMockEndpointId: number;
  setCurrentMockEndpointId: (id: number) => void;
}

const Sidebar = (props: SidebarProps) => {
  const [mouseOverMockEndpointId, setMouseOverMockEndpointId] =
    createSignal(-1);

  const handleAddButtonClick = () => {
    props.setCurrentMockEndpointId(-1);
    initFormErrors();
  };

  return (
    <Wrapper>
      <Header>
        <Title>Endpoints</Title>
        <AddButton onClick={handleAddButtonClick}>
          <CirclePlus />
        </AddButton>
      </Header>
      <StyledUl>
        <For each={props.mockEndpoints}>
          {endpoint => {
            const handleMockEndpointClick = () => {
              props.setCurrentMockEndpointId(endpoint.id);
              initFormErrors();
            };

            const handleRemoveMockEndpoint = async (event: Event) => {
              event.stopPropagation();

              const res = await client
                .mutation(removeMockEndpointMutation, {
                  removeMockEndpointData: endpoint.id,
                })
                .toPromise();

              if (res.error) {
                alert('Error');

                return;
              }

              props.setCurrentMockEndpointId(-1);
            };

            const handleMouseEnter = () => {
              setMouseOverMockEndpointId(endpoint.id);
            };

            const handleMouseLeave = () => {
              setMouseOverMockEndpointId(-1);
            };

            return (
              <ListItem
                isSelected={props.currentMockEndpointId === endpoint.id}
                onClick={handleMockEndpointClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ListItemDescription>
                  {endpoint.endpointName}
                </ListItemDescription>
                <RemoveMockEndpointButton
                  onClick={handleRemoveMockEndpoint}
                  isVisible={mouseOverMockEndpointId() === endpoint.id}
                />
              </ListItem>
            );
          }}
        </For>
      </StyledUl>
    </Wrapper>
  );
};

export default Sidebar;
