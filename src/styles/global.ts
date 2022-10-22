import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${(props) => props.theme.colours.pageBackground};
    color: ${(props) => props.theme.colours.text};
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
    color: ${(props) => props.theme.colours.link};
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.colours.linkHover};
  }
`;

export default GlobalStyle;
