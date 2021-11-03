import { createEffect, createSignal, JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

import client from '../../api/client';
import {
  createMockEndpointMutation,
  updateMockEndpointMutation,
} from '../../api/mutations';
import CopyIcon from '../../components/CopyIcon';
import LabeledInput from '../../components/LabeledInput';
import LabeledSelect from '../../components/LabeledSelect';
import LabeledTextarea from '../../components/LabeledTextarea';
import SaveButton from '../../components/SaveButton';
import * as DESCRIPTION from '../../constants/inputDescriptions';
import {
  ENDPOINT_ALREADY_EXISTS,
  TOO_MANY_MOCK_ENDPOINTS,
  TOO_MANY_REQUESTS,
} from '../../constants/messages';
import { MOBILE_VIEWPORT_BREAKPOINT } from '../../constants/numbers';
import * as STATUS from '../../constants/statusOptions';
import { isViewportNarrow } from '../../store';
import {
  endpointNameErrorMessage,
  httpHeadersErrorMessage,
  httpMethodErrorMessage,
  setEndpointNameErrorMessage,
  setHttpHeadersErrorMessage,
  setHttpMethodErrorMessage,
  setTimeoutErrorMessage,
  setUrlPathErrorMessage,
  timeoutErrorMessage,
  urlPathErrorMessage,
} from '../../store';
import { User } from '../../types';
import { MockEndpointInput } from '../../types';
import handleServerErrors from '../../utils/handleServerErrorsOnSave';
import initFormErrors from '../../utils/initFormErrors';
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
  const [isNew, setIsNew] = createSignal(true);
  const [isFetching, setIsFetching] = createSignal(false);

  createEffect(() => {
    setIsNew(props.currentMockEndpointId === -1);
  });

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
    initFormErrors();

    if (props.user?.mockEndpoints.length! >= 10) {
      alert(TOO_MANY_MOCK_ENDPOINTS);

      return;
    }

    const validationResult = validateInput(props.mockEndpointInput);

    if (Object.keys(validationResult).length) {
      setClientValidationErrors(validationResult, {
        setEndpointNameErrorMessage,
        setUrlPathErrorMessage,
        setHttpHeadersErrorMessage,
        setTimeoutErrorMessage,
      });

      return;
    }

    setIsFetching(true);

    const res = isNew()
      ? await createMockEndpoint()
      : await updateMockEndpoint();

    setIsFetching(false);

    if (res.error) {
      handleServerErrors(res.error, {
        setHttpMethodErrorMessage,
        setUrlPathErrorMessage,
      });

      return;
    }

    if (isNew()) {
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
        description={props.user?.isTemp ? DESCRIPTION.EXPIRY_NOTICE : ''}
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
        description={DESCRIPTION.ENDPOINT_NAME}
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
          setHttpMethodErrorMessage('');

          if (urlPathErrorMessage() === ENDPOINT_ALREADY_EXISTS) {
            setUrlPathErrorMessage('');
          }

          props.setMockEndpointInput({ httpMethod: this.value as string });
        }}
        errorMessage={httpMethodErrorMessage()}
        borderColor={httpMethodErrorMessage() && 'red'}
      />
      <LabeledInput
        label='URL Path*'
        value={props.mockEndpointInput.urlPath}
        onInput={(event: Event) => {
          setUrlPathErrorMessage('');

          if (httpMethodErrorMessage() === ENDPOINT_ALREADY_EXISTS) {
            setHttpMethodErrorMessage('');
          }

          props.setMockEndpointInput({
            urlPath: (event.target as HTMLInputElement).value,
          });
        }}
        description={DESCRIPTION.URL_PATH}
        errorMessage={urlPathErrorMessage()}
        borderColor={urlPathErrorMessage() && 'red'}
        placeholder='/api/users/1'
      />
      <LabeledSelect
        label='HTTP Status*'
        options={[
          { value: 200, text: STATUS.STATUS_200 },
          { value: 201, text: STATUS.STATUS_201 },
          { value: 204, text: STATUS.STATUS_204 },
          { value: 400, text: STATUS.STATUS_400 },
          { value: 401, text: STATUS.STATUS_401 },
          { value: 403, text: STATUS.STATUS_403 },
          { value: 404, text: STATUS.STATUS_404 },
          { value: 405, text: STATUS.STATUS_405 },
          { value: 500, text: STATUS.STATUS_500 },
          { value: 502, text: STATUS.STATUS_502 },
          { value: 503, text: STATUS.STATUS_503 },
          { value: 504, text: STATUS.STATUS_504 },
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
        description={DESCRIPTION.HTTP_HEADERS}
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
        description={DESCRIPTION.RESPONSE_BODY}
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
        description={DESCRIPTION.TIMEOUT}
        errorMessage={timeoutErrorMessage()}
        borderColor={timeoutErrorMessage() && 'red'}
      />
      <SaveButtonWrapper>
        <SaveButton
          onClick={handleSaveClick}
          isFetching={isFetching()}
          isNew={isNew()}
        />
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
