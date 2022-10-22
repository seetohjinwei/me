import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-page-background);
    color: var(--color-text);
    font-family: "Kaisei HarunoUmi", sans-serif;
    margin: 0;
    font-size: 100%;
  }

  h1, h2, h3 {
    font-family: "Alegreya Sans", sans-serif;
  }

  h1, h2 {
    font-size: 2em;
  }

  a {
    color: var(--color-link);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-link-hover);
  }
`;

export default GlobalStyle;
