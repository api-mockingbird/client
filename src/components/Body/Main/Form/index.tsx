import { JSX, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import LabeledInput from './LabeledInput';
import LabeledSelect from './LabeledSelect';
import LabeledTextarea from './LabeledTextarea';

const Form = () => {
  const [nameErrorMessage, setNameErrorMessage] = createSignal('');
  const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');
  const [responseState, setResponseState] = createStore({
    name: '',
    status: 201,
    contentType: 'application/json',
    charset: 'UTF-8',
    headers: '',
    body: '',
    timeout: '',
  });

  return (
    <>
      <LabeledInput
        label='Response Name'
        value={responseState.name}
        onChange={function (this: JSX.InputHTMLAttributes<HTMLInputElement>) {
          setResponseState({ timeout: this.value as string });
        }}
        description='Unique name of endpoint.'
        errorMessage={nameErrorMessage()}
      />
      <LabeledSelect
        label='Response Content Type'
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
        label='Charset'
        options={[{ value: 'UTF-8', text: 'UTF-8' }]}
        preSelectedValue={responseState.charset}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ contentType: this.value as string });
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
