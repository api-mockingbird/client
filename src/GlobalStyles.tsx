import { createGlobalStyles } from 'solid-styled-components';

import { MOBILE_VIEWPORT_BREAKPOINT } from './constants';

const GlobalStyles = () => {
  const Styles = createGlobalStyles`
    html {
      font-size: 58%;

      @media only screen and (min-width: 300px) {
        font-size: 60%;
      }

      @media only screen and (min-width: ${MOBILE_VIEWPORT_BREAKPOINT}px) {
        font-size: 62.5%;
      }
    }

    body {
      margin: 0;
      font-size: 16px;
      font-size: 1.6rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    a,
    label,
    button,
    [type='checkbox'],
    [type='radio'] {
      color: inherit;
      text-decoration: none;
    }

    button {
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }

    ul,
    ol,
    li {
      margin: 0;
      padding: 0;
    }

    ul,
    ol {
      list-style: none;
    }
  `;

  return <Styles />;
};

export default GlobalStyles;
