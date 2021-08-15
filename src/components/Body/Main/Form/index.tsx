import { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

import LabeledSelect from './LabeledSelect';
import LabeledTextarea from './LabeledTextarea';

const Form = () => {
  const [responseState, setResponseState] = createStore({
    status: 201,
    contentType: 'application/json',
    charset: 'UTF-8',
    headers: '',
    body: '',
  });

  return (
    <>
      <LabeledSelect
        label='HTTP Status'
        options={[
          { value: 200, text: '200 - OK' },
          { value: 201, text: '201 - Created' },
        ]}
        preSelectedValue={responseState.status}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ status: Number(this.value) });
        }}
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
        rows={4}
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
    </>
  );
};

export default Form;
