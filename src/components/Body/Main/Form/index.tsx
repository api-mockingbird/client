import { JSX, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled } from 'solid-styled-components';

import LabeledSelect from './LabeledSelect';

const Form = () => {
  const [responseState, setResponseState] = createStore({
    httpStatus: 201,
    contentType: 'application/json',
    charset: 'UTF-8',
  });

  return (
    <>
      <LabeledSelect
        label='HTTP Status'
        options={[
          { value: 200, text: '200 - OK' },
          { value: 201, text: '201 - Created' },
        ]}
        preSelectedValue={responseState.httpStatus}
        onChange={function (this: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
          setResponseState({ httpStatus: Number(this.value) });
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
    </>
  );
};

export default Form;
