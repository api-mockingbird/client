import { createEffect, createSignal, JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

import client from '../../api/client';
import {
  createMockEndpointMutation,
  updateMockEndpointMutation,
} from '../../api/query-documents';
import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants';
import { isViewportNarrow } from '../../store';
import { User } from '../../types';
import { MockEndpointInput } from '../../types';
import CopyIcon from '../../components/CopyIcon';
import LabeledInput from '../../components/LabeledInput';
import LabeledSelect from '../../components/LabeledSelect';
import LabeledTextarea from '../../components/LabeledTextarea';
import SaveButton from '../../components/SaveButton';

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
  min-width: 26rem;
  width: 100%;
  padding: 1.5rem 1.5rem 6rem;

  @media only screen and (min-width: ${MOBILE_VIEWPORT_BREAKPOINT}px) {
    max-width: 50rem;
  }
`;

const SaveButtonWrapper = styled('div')`
  position: sticky;
  bottom: 1.4rem;
`;

interface ServerSettingsFormProps {
  user: User | null;
  currentMockEndpointId: number;
  setCurrentMockEndpointId: (id: number) => void;
  mockEndpointInput: MockEndpointInput;
  setMockEndpointInput: ({}) => void;
}

const ServerSettingsForm = (props: ServerSettingsFormProps) => {
  const [baseUrl, setBaseUrl] = createSignal('');
  const [nameErrorMessage, setNameErrorMessage] = createSignal('');
  const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');
  const [endpointErrorMessage, setEndpointErrorMessage] = createSignal('');
  const [httpHeadersErrorMessage, setHttpHeadersErrorMessage] =
    createSignal('');

  createEffect(() => {
    const subdomain = props.user?.id;

    setBaseUrl(
      `${
        subdomain ? `https://${subdomain}.${import.meta.env.VITE_DOMAIN}` : ''
      }`
    );
  });

  const createMockEndpoint = () => {
    const data = {
      ...props.mockEndpointInput,
      timeout: Number(props.mockEndpointInput.timeout),
    };

    return client
      .mutation(
        createMockEndpointMutation,
        {
          createMockEndpointData: data,
          createMockEndpointUserId: props.user!.id,
        },
        {
          additionalTypenames: ['User'],
        }
      )
      .toPromise();
  };

  const updateMockEndpoint = () => {
    const data = {
      id: props.currentMockEndpointId,
      ...props.mockEndpointInput,
      timeout: Number(props.mockEndpointInput.timeout),
    };

    return client
      .mutation(updateMockEndpointMutation, {
        updateMockEndpointData: data,
        updateMockEndpointUserId: props.user!.id,
      })
      .toPromise();
  };

  const handleSaveClick = async () => {
    // validate fields

    const isNew = props.currentMockEndpointId === -1;
    const res = isNew ? await createMockEndpoint() : await updateMockEndpoint();

    if (!res.error && isNew) {
      props.setCurrentMockEndpointId(res.data.createMockEndpoint.id);
    }
  };

  const handleCopyIconClick = async () => {
    await navigator.clipboard.writeText(baseUrl());
    alert(`Base URL (${baseUrl()}) saved to clipboard.`);
  };

  return (
    <>
      <LabeledInput
        label='Base URL'
        value={baseUrl()}
        suffix={() => CopyIcon({ onClick: handleCopyIconClick })}
        description={
          props.user?.isTemp
            ? 'Expires in 1 hour. Sign up for persistence.'
            : ''
        }
        readonly
      />
      <LabeledInput
        label='Endpoint Name*'
        value={props.mockEndpointInput.endpointName}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          props.setMockEndpointInput({ endpointName: this.value as string });
        }}
        description='Unique name of endpoint.'
        errorMessage={nameErrorMessage()}
      />
      <LabeledSelect
        label='HTTP Method*'
        options={[
          { value: 'GET', text: 'GET' },
          { value: 'POST', text: 'POST' },
          { value: 'PUT', text: 'PUT' },
          { value: 'PATCH', text: 'PATCH' },
          { value: 'DELETE', text: 'DELETE' },
          { value: 'OPTIONS', text: 'OPTIONS' },
        ]}
        preSelectedValue={props.mockEndpointInput.httpMethod}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          props.setMockEndpointInput({ httpMethod: this.value as string });
        }}
      />
      <LabeledInput
        label='URL Path*'
        value={props.mockEndpointInput.urlPath}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          props.setMockEndpointInput({ urlPath: this.value as string });
        }}
        description='Do not include hostname.'
        errorMessage={endpointErrorMessage()}
        placeholder='/api/users/1'
      />
      <LabeledSelect
        label='HTTP Status*'
        options={[
          { value: 200, text: '200 - OK' },
          { value: 201, text: '201 - Created' },
          { value: 204, text: '204 - No Content' },
          { value: 400, text: '400 - Bad Request' },
          { value: 401, text: '401 - Unauthorized' },
          { value: 403, text: '403 - Forbidden' },
          { value: 404, text: '404 - Not Found' },
          { value: 405, text: '405 - Method Not Allowed' },
          { value: 500, text: '500 - Internal Server Error' },
          { value: 502, text: '502 - Bad Gateway' },
          { value: 503, text: '503 - Service Unavailable' },
          { value: 504, text: '504 - Gateway Timeout' },
        ]}
        preSelectedValue={props.mockEndpointInput.httpStatus}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          props.setMockEndpointInput({ httpStatus: Number(this.value) });
        }}
      />
      <LabeledSelect
        label='Response Content Type*'
        options={[
          { value: 'application/json', text: 'application/json' },
          {
            value: 'application/x-www-form-urlencoded',
            text: 'application/x-www-form-urlencoded',
          },
        ]}
        preSelectedValue={props.mockEndpointInput.responseContentType}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          props.setMockEndpointInput({
            responseContentType: this.value as string,
          });
        }}
      />
      <LabeledSelect
        label='Charset*'
        options={[{ value: 'UTF-8', text: 'UTF-8' }]}
        preSelectedValue={props.mockEndpointInput.charset}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          props.setMockEndpointInput({ charset: this.value as string });
        }}
      />
      <LabeledTextarea
        label='HTTP Headers'
        value={props.mockEndpointInput.httpHeaders}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          props.setMockEndpointInput({ httpHeaders: this.value as string });
        }}
        description='Set as JSON object.'
        errorMessage={httpHeadersErrorMessage()}
        placeholder='{\n  "X-Foo-Bar": "Hello Mockingbird"\n}'
        rows={3}
      />
      <LabeledTextarea
        label='HTTP Response Body'
        value={props.mockEndpointInput.httpResponseBody}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          props.setMockEndpointInput({
            httpResponseBody: this.value as string,
          });
        }}
        placeholder='{\n  "id": 1,\n  "name": "John Doe",\n  "role": "ADMIN"\n}'
        rows={8}
      />
      <LabeledInput
        label='Timeout'
        value={props.mockEndpointInput.timeout}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          props.setMockEndpointInput({ timeout: this.value as string });
        }}
        suffix='ms'
        description='Set timeout for response.'
        errorMessage={timeoutErrorMessage()}
      />
      <SaveButtonWrapper>
        <SaveButton onClick={handleSaveClick} />
      </SaveButtonWrapper>
    </>
  );
};

interface MainProps {
  user: User | null;
  currentMockEndpointId: number;
  setCurrentMockEndpointId: (id: number) => void;
  mockEndpointInput: MockEndpointInput;
  setMockEndpointInput: ({}) => void;
}

const Main = (props: MainProps) => {
  return (
    <Wrapper hasMargin={!isViewportNarrow()}>
      <ContentWrapper>
        <ServerSettingsForm
          user={props.user}
          currentMockEndpointId={props.currentMockEndpointId}
          setCurrentMockEndpointId={props.setCurrentMockEndpointId}
          mockEndpointInput={props.mockEndpointInput}
          setMockEndpointInput={props.setMockEndpointInput}
        />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Main;
