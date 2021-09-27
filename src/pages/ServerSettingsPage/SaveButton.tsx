import { gql } from '@urql/core';
import { createMutation } from 'solid-urql';

import Button from '../../components/Button';
import { User, MockEndpointInput } from '../../types';

interface SaveButtonProps {
  user: User | null;
  data: MockEndpointInput;
}

const createMockEndpointMutation = gql`
  mutation Mutation(
    $createMockInputData: MockEndpointCreateInput!
    $createMockInputUserId: String!
  ) {
    createMockInput(
      data: $createMockInputData
      userId: $createMockInputUserId
    ) {
      id
    }
  }
`;

const SaveButton = (props: SaveButtonProps) => {
  const requestData = {
    ...props.data,
    timeout: Number(props.data.timeout),
  };
  const [state, executeMutation] = createMutation(createMockEndpointMutation);

  const handleClick = async () => {
    const res = await executeMutation({
      createMockInputData: requestData,
      createMockInputUserId: props.user!.id,
    });

    console.log(res);
  };

  return (
    <Button
      width='100%'
      height='4.2rem'
      color='white'
      backgroundColor='#2e5cf2'
      onClick={handleClick}
    >
      Save
    </Button>
  );
};

export default SaveButton;
