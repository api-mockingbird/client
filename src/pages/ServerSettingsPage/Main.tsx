import { createEffect, createSignal, JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

import client from '../../api/client';
import {
  createMockEndpointMutation,
  updateMockEndpointMutation,
} from '../../api/query-documents';
import CopyIcon from '../../components/CopyIcon';
import LabeledInput from '../../components/LabeledInput';
import LabeledSelect from '../../components/LabeledSelect';
import LabeledTextarea from '../../components/LabeledTextarea';
import SaveButton from '../../components/SaveButton';
import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants';
import { isViewportNarrow } from '../../store';
import { User } from '../../types';
import { MockEndpointInput } from '../../types';
import setClientValidationErrors from '../../utils/setClientValidationErrors';
import validateInput from '../../utils/validateInput';

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
  const [endpointNameErrorMessage, setEndpointNameErrorMessage] =
    createSignal('');
  const [urlPathErrorMessage, setUrlPathErrorMessage] = createSignal('');
  const [httpHeadersErrorMessage, setHttpHeadersErrorMessage] =
    createSignal('');
  const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');

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

  const initErrors = () => {
    setEndpointNameErrorMessage('');
    setUrlPathErrorMessage('');
    setHttpHeadersErrorMessage('');
    setTimeoutErrorMessage('');
  };

  const handleSaveClick = async () => {
    initErrors();

    const validationResult = validateInput(props.mockEndpointInput);

    if (Object.keys(validationResult).length) {
      setClientValidationErrors(
        validationResult,
        setEndpointNameErrorMessage,
        setUrlPathErrorMessage,
        setHttpHeadersErrorMessage,
        setTimeoutErrorMessage
      );

      return;
    }

    const isNew = props.currentMockEndpointId === -1;
    const res = isNew ? await createMockEndpoint() : await updateMockEndpoint();

    if (res.error) {
      // set errors

      return;
    }

    if (isNew) {
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
        onInput={(event: Event) => {
          setEndpointNameErrorMessage('');
          props.setMockEndpointInput({
            endpointName: (event.target as HTMLInputElement).value,
          });
        }}
        description='A descriptive name.'
        errorMessage={endpointNameErrorMessage()}
        borderColor={endpointNameErrorMessage() && 'red'}
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
        onInput={(event: Event) => {
          setUrlPathErrorMessage('');
          props.setMockEndpointInput({
            urlPath: (event.target as HTMLInputElement).value,
          });
        }}
        description='Do not include hostname.'
        errorMessage={urlPathErrorMessage()}
        borderColor={urlPathErrorMessage() && 'red'}
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
        onInput={(event: Event) => {
          setHttpHeadersErrorMessage('');
          props.setMockEndpointInput({
            httpHeaders: (event.target as HTMLTextAreaElement).value,
          });
        }}
        description='Set as JSON object.'
        errorMessage={httpHeadersErrorMessage()}
        borderColor={httpHeadersErrorMessage() && 'red'}
        placeholder='{\n  "X-Foo-Bar": "Hello Mockingbird"\n}'
        rows={3}
      />
      <LabeledTextarea
        label='HTTP Response Body'
        value={props.mockEndpointInput.httpResponseBody}
        onInput={(event: Event) => {
          props.setMockEndpointInput({
            httpResponseBody: (event.target as HTMLTextAreaElement).value,
          });
        }}
        placeholder='{\n  "id": 1,\n  "name": "John Doe",\n  "role": "ADMIN"\n}'
        rows={8}
      />
      <LabeledInput
        label='Timeout'
        value={props.mockEndpointInput.timeout}
        onInput={(event: Event) => {
          setTimeoutErrorMessage('');
          props.setMockEndpointInput({
            timeout: (event.target as HTMLInputElement).value,
          });
        }}
        suffix='ms'
        description='Set timeout for response.'
        errorMessage={timeoutErrorMessage()}
        borderColor={timeoutErrorMessage() && 'red'}
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
