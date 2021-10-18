import {
  createEffect,
  createResource,
  createSignal,
  onMount,
  Show,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled } from 'solid-styled-components';

import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants';
import {
  isHamburgerActive,
  isViewportNarrow,
  setIsViewportNarrow,
} from '../../store';
import { MockEndpointInput, User } from '../../types';
import client from '../../api/client';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import { getMockEndpointQuery } from '../../api/query-documents';

const BodyWrapper = styled('div')`
  display: flex;
  margin-top: 6.2rem;
  height: calc(100vh - 6.2rem);
`;

interface ServerSettingsPageProps {
  user: User | null;
}

const mockEndpointInputInitialState = {
  endpointName: '',
  httpMethod: 'GET',
  urlPath: '',
  httpStatus: 200,
  responseContentType: 'application/json',
  charset: 'UTF-8',
  httpHeaders: '',
  httpResponseBody: '',
  timeout: '',
};

const ServerSettingsPage = (props: ServerSettingsPageProps) => {
  const [currentMockEndpointId, setCurrentMockEndpointId] = createSignal(-1);
  const [mockEndpointInput, setMockEndpointInput] = createStore(
    JSON.parse(JSON.stringify(mockEndpointInputInitialState))
  );
  const [queriedMockEndpoint, { refetch: fetchMockEndpointById }] =
    createResource(() => {
      if (currentMockEndpointId() < 0) return;

      return client
        .query(getMockEndpointQuery, {
          getMockEndpointData: {
            id: currentMockEndpointId(),
          },
        })
        .toPromise();
    });

  createEffect(() => {
    if (currentMockEndpointId() < 0) {
      setMockEndpointInput(mockEndpointInputInitialState);

      return;
    }

    fetchMockEndpointById();
  });

  createEffect(() => {
    const mockEndpoint = queriedMockEndpoint()?.data.getMockEndpoint;

    if (!mockEndpoint) return;

    setMockEndpointInput({
      endpointName: mockEndpoint.endpointName,
      httpMethod: mockEndpoint.httpMethod,
      urlPath: mockEndpoint.urlPath,
      httpStatus: mockEndpoint.httpStatus,
      responseContentType: mockEndpoint.responseContentType,
      charset: mockEndpoint.charset,
      httpHeaders: mockEndpoint.httpHeaders,
      httpResponseBody: mockEndpoint.httpResponseBody,
      timeout: mockEndpoint.timeout,
    });
  });

  onMount(() => {
    window.addEventListener('resize', () => {
      if (
        window.matchMedia(`(min-width: ${MOBILE_VIEWPORT_BREAKPOINT}px)`)
          .matches
      ) {
        setIsViewportNarrow(false);
      } else {
        setIsViewportNarrow(true);
      }
    });
  });

  return (
    <>
      <Header />
      <BodyWrapper>
        <Show when={!isViewportNarrow() || isHamburgerActive()}>
          <Sidebar
            mockEndpoints={props.user?.mockEndpoints}
            currentMockEndpointId={currentMockEndpointId()}
            setCurrentMockEndpointId={setCurrentMockEndpointId}
          />
        </Show>
        <Main
          user={props.user}
          currentMockEndpointId={currentMockEndpointId()}
          setCurrentMockEndpointId={setCurrentMockEndpointId}
          mockEndpointInput={mockEndpointInput as unknown as MockEndpointInput}
          setMockEndpointInput={setMockEndpointInput}
        />
      </BodyWrapper>
    </>
  );
};

export default ServerSettingsPage;
