import { createSignal, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled } from 'solid-styled-components';

import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants';
import { isViewportNarrow } from '../../store';
import LabeledInput from './LabeledInput';
import LabeledSelect from './LabeledSelect';
import LabeledTextarea from './LabeledTextarea';
import SaveButton from './SaveButton';
import { User } from '../../types';

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
    max-width: 40rem;
  }
`;

const SaveButtonWrapper = styled('div')`
  position: sticky;
  bottom: 1.4rem;
`;

interface ServerSettingsFormProps {
  user: User | null;
}

const ServerSettingsForm = (props: ServerSettingsFormProps) => {
  const [nameErrorMessage, setNameErrorMessage] = createSignal('');
  const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');
  const [endpointErrorMessage, setEndpointErrorMessage] = createSignal('');
  const [mockEndpointState, setMockEndpointState] = createStore({
    responseName: '',
    httpMethod: 'GET',
    urlPath: '',
    httpStatus: 200,
    responseContentType: 'application/json',
    charset: 'UTF-8',
    httpHeaders: '',
    httpResponseBody: '',
    timeout: '',
  });

  return (
    <>
      <LabeledInput
        label='Response Name*'
        value={mockEndpointState.responseName}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setMockEndpointState({ responseName: this.value as string });
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
        ]}
        preSelectedValue={mockEndpointState.httpMethod}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setMockEndpointState({ httpMethod: this.value as string });
        }}
      />
      <LabeledInput
        label='URL Path*'
        value={mockEndpointState.urlPath}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setMockEndpointState({ urlPath: this.value as string });
        }}
        description='Do not include hostname.'
        errorMessage={endpointErrorMessage()}
        placeholder='/api/users'
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
          { value: 504, text: '504 - Gateway Timeount' },
        ]}
        preSelectedValue={mockEndpointState.httpStatus}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setMockEndpointState({ httpStatus: Number(this.value) });
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
        preSelectedValue={mockEndpointState.responseContentType}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setMockEndpointState({ responseContentType: this.value as string });
        }}
      />
      <LabeledSelect
        label='Charset*'
        options={[{ value: 'UTF-8', text: 'UTF-8' }]}
        preSelectedValue={mockEndpointState.charset}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setMockEndpointState({ charset: this.value as string });
        }}
      />
      <LabeledTextarea
        label='HTTP Headers'
        value={mockEndpointState.httpHeaders}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          setMockEndpointState({ httpHeaders: this.value as string });
        }}
        rows={3}
      />
      <LabeledTextarea
        label='HTTP Response Body'
        value={mockEndpointState.httpResponseBody}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          setMockEndpointState({ httpResponseBody: this.value as string });
        }}
        rows={8}
      />
      <LabeledInput
        label='Timeout'
        value={mockEndpointState.timeout}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setMockEndpointState({ timeout: this.value as string });
        }}
        suffix='ms'
        description='Set timeout for response.'
        errorMessage={timeoutErrorMessage()}
      />
      <SaveButtonWrapper>
        <SaveButton user={props.user} data={mockEndpointState} />
      </SaveButtonWrapper>
    </>
  );
};

interface MainProps {
  user: User | null;
}

const Main = (props: MainProps) => {
  return (
    <Wrapper hasMargin={!isViewportNarrow()}>
      <ContentWrapper>
        <ServerSettingsForm user={props.user} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Main;
