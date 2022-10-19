import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

interface ColourShape {
  pageBackground: string;
  containerBackground: string;
  text: string;
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
  link: "#ffc0cb",
  linkHover: "#f9536f",
};

const lightColours: ColourShape = {
  pageBackground: "#d5d5d5",
  containerBackground: "#7ca0f5",
  text: "#000000",
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
    font-family: "Asar";
    margin: 0;
    font-size: 120%;
  }

  h1, h2 {
    font-family: "Alegreya Sans", sans-serif;
    font-size: 200%;
  }

  a {
    color: ${(props) => props.theme.colours.link};
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.colours.linkHover};
  }

  svg {
    fill: ${(props) => props.theme.colours.text};
    height: 30px;
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
