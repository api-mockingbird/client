import { JSX, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled } from 'solid-styled-components';

import LabeledInput from './LabeledInput';
import LabeledSelect from './LabeledSelect';
import LabeledTextarea from './LabeledTextarea';

const MethodEndpointWrapper = styled('div')`
  margin-bottom: 1.4rem;
`;

const MethodEndpointInputsWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1.6fr 4fr;
  grid-gap: 0.8rem;
`;

const Form = () => {
  const [nameErrorMessage, setNameErrorMessage] = createSignal('');
  const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');
  const [endpointErrorMessage, setEndpointErrorMessage] = createSignal('');
  const [responseState, setResponseState] = createStore({
    name: '',
    method: 'GET',
    endpoint: '',
    status: 200,
    contentType: 'application/json',
    charset: 'UTF-8',
    headers: '',
    body: '',
    timeout: '',
  });

  return (
    <>
      <LabeledInput
        label='Response Name *'
        value={responseState.name}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setResponseState({ name: this.value as string });
        }}
        description='Unique name of endpoint.'
        errorMessage={nameErrorMessage()}
      />
      <LabeledSelect
        label='HTTP Method *'
        options={[
          { value: 'GET', text: 'GET' },
          { value: 'POST', text: 'POST' },
          { value: 'PUT', text: 'PUT' },
          { value: 'PATCH', text: 'PATCH' },
          { value: 'DELETE', text: 'DELETE' },
        ]}
        preSelectedValue={responseState.method}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ method: this.value as string });
        }}
      />
      <LabeledInput
        label='Endpoint *'
        value={responseState.endpoint}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setResponseState({ endpoint: this.value as string });
        }}
        description='Exclude base URL.'
        errorMessage={endpointErrorMessage()}
        placeholder='/api/users'
      />
      <LabeledSelect
        label='HTTP Status *'
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
        preSelectedValue={responseState.status}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ status: Number(this.value) });
        }}
      />
      <LabeledSelect
        label='Response Content Type *'
        options={[
          { value: 'application/json', text: 'application/json' },
          {
            value: 'application/x-www-form-urlencoded',
            text: 'application/x-www-form-urlencoded',
          },
        ]}
        preSelectedValue={responseState.contentType}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ contentType: this.value as string });
        }}
      />
      <LabeledSelect
        label='Charset *'
        options={[{ value: 'UTF-8', text: 'UTF-8' }]}
        preSelectedValue={responseState.charset}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ charset: this.value as string });
        }}
      />
      <LabeledTextarea
        label='HTTP Headers'
        value={responseState.headers}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          setResponseState({ headers: this.value as string });
        }}
        rows={3}
      />
      <LabeledTextarea
        label='HTTP Response Body'
        value={responseState.body}
        onChange={function (
          this: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
        ) {
          setResponseState({ body: this.value as string });
        }}
        rows={8}
      />
      <LabeledInput
        label='Timeout (ms)'
        value={responseState.timeout}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setResponseState({ timeout: this.value as string });
        }}
        description='Set timeout for response.'
        errorMessage={timeoutErrorMessage()}
      />
    </>
  );
};

export default Form;
