import { createSignal } from 'solid-js';

import { MOBILE_VIEWPORT_BREAKPOINT } from '../constants/numbers';

export const [isViewportNarrow, setIsViewportNarrow] = createSignal(
  window.innerWidth < MOBILE_VIEWPORT_BREAKPOINT
);

export const [isHamburgerActive, setIsHamburgerActive] = createSignal(false);

export const [endpointNameErrorMessage, setEndpointNameErrorMessage] =
  createSignal('');
export const [httpMethodErrorMessage, setHttpMethodErrorMessage] =
  createSignal('');
export const [urlPathErrorMessage, setUrlPathErrorMessage] = createSignal('');
export const [httpHeadersErrorMessage, setHttpHeadersErrorMessage] =
  createSignal('');
export const [timeoutErrorMessage, setTimeoutErrorMessage] = createSignal('');
