import { createSignal } from 'solid-js';

import { MOBILE_VIEWPORT_BREAKPOINT } from './constants';

export const [isViewportNarrow, setIsViewportNarrow] = createSignal(
  window.innerWidth < MOBILE_VIEWPORT_BREAKPOINT
);

export const [isHamburgerActive, setIsHamburgerActive] = createSignal(false);
