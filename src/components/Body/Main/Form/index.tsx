import { JSX, createSignal, createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';

import Input from '../../../Input';
import Select from '../../../Select';

const Form = () => {
  return (
    <>
      <Input width='100%' onChange={() => console.log('hi')} />
    </>
  );
};

export default Form;
