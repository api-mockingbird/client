import { createSignal } from 'solid-js';

export const [isViewportNarrow, setIsViewportNarrow] = createSignal(
  window.innerWidth < 480
);

export const [isHamburgerActive, setIsHamburgerActive] = createSignal(false);
