export interface ColourShape {
  pageBackground: string;
  containerBackground: string;
  text: string;
  faded: string;
  link: string;
  linkHover: string;
}

export interface ThemeShape {
  colours: ColourShape;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colours: ColourShape;
  }
}

export const darkColours: ColourShape = {
  pageBackground: "#03002e",
  containerBackground: "#010057",
  text: "#eeeeee",
  faded: "#eeeeee",
  link: "#ffc0cb",
  linkHover: "#f9536f",
};

export const lightColours: ColourShape = {
  pageBackground: "#d5d5d5",
  containerBackground: "#7ca0f5",
  text: "#424242",
  faded: "#585858",
  link: "#ed7788",
  linkHover: "#ff002b",
};

const darkTheme = {
  colours: darkColours,
};

const lightTheme = {
  colours: lightColours,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
