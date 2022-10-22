export interface ColourShape {
  pageBackground: string;
  yellowBackground: string;
  greenBackground: string;
  blueBackground: string;
  text: string;
  faded: string;
  link: string;
  linkHover: string;
  buttonDarkMode: string;
  buttonLightMode: string;
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
  pageBackground: "#171214",
  yellowBackground: "#5b4628",
  greenBackground: "#0b525b",
  blueBackground: "#212f45",
  text: "#eeeeee",
  faded: "#eeeeee",
  link: "#f6e1d3",
  linkHover: "#ffc1cc",
  buttonDarkMode: "#424242",
  buttonLightMode: "#eeeeee",
};

export const lightColours: ColourShape = {
  pageBackground: "#d5d5d5",
  yellowBackground: "#f8f89f",
  greenBackground: "#a2f6a2",
  blueBackground: "#ade4f9",
  text: "#424242",
  faded: "#585858",
  link: "#ed7788",
  linkHover: "#ff002b",
  buttonDarkMode: "#424242",
  buttonLightMode: "#eeeeee",
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
