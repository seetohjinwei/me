import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

interface ColourShape {
  pageBackground: string;
  containerBackground: string;
  text: string;
  faded: string;
  link: string;
  linkHover: string;
}

interface ThemeShape {
  colours: ColourShape;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colours: ColourShape;
  }
}

const darkColours: ColourShape = {
  pageBackground: "#03002e",
  containerBackground: "#010057",
  text: "#eeeeee",
  faded: "#eeeeee",
  link: "#ffc0cb",
  linkHover: "#f9536f",
};

const lightColours: ColourShape = {
  pageBackground: "#d5d5d5",
  containerBackground: "#7ca0f5",
  text: "#424242",
  faded: "#585858",
  link: "#ed7788",
  linkHover: "#ff002b",
};

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

const darkTheme = {
  colours: darkColours,
};

const lightTheme = {
  colours: lightColours,
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  /* TODO: introduce a mechanism to change this, and save in cookies */
  const theme: ThemeShape = themes.light;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Layout;
