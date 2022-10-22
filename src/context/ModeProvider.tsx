import React, { createContext, useEffect, useReducer } from "react";

export type modes = undefined | "light" | "dark";
// Simple type validation: https://stackoverflow.com/a/57065841
const isValidMode = (
  maybeMode: string | null | undefined
): maybeMode is modes => {
  if (maybeMode === null) {
    return false;
  }
  return ["light", "dark", undefined].includes(maybeMode);
};

const switcher: { [initial: string]: modes } = {
  light: "dark",
  dark: "light",
};

interface IModeContext {
  mode: modes;
  toggleTheme: () => void;
}

export const ModeContext = createContext<IModeContext>({} as IModeContext);

const darkColors = {
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

const lightColors = {
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

const localStorageKey = "mode";

const updateCSS = (mode: modes): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (mode === undefined) {
    return;
  }

  const root = document.documentElement;
  const colors = mode === "light" ? lightColors : darkColors;
  root.style.setProperty("--color-page-background", colors.pageBackground);
  root.style.setProperty("--color-yellow-background", colors.yellowBackground);
  root.style.setProperty("--color-green-background", colors.greenBackground);
  root.style.setProperty("--color-blue-background", colors.blueBackground);
  root.style.setProperty("--color-text", colors.text);
  root.style.setProperty("--color-faded", colors.faded);
  root.style.setProperty("--color-link", colors.link);
  root.style.setProperty("--color-link-hover", colors.linkHover);
  root.style.setProperty("--color-button-dark-mode", colors.buttonDarkMode);
  root.style.setProperty("--color-button-light-mode", colors.buttonLightMode);
  root.style.setProperty("--initial-color-mode", mode);

  // Set storage as well.
  window.localStorage.setItem(localStorageKey, mode);
};

type ModeState = { mode: modes };
type ModeAction = "toggle" | "light" | "dark";
// Reducer also handles update to the storage.
const reducer = (state: ModeState, action: ModeAction): ModeState => {
  switch (action) {
    case "toggle":
      const toggledMode: modes =
        state.mode === undefined ? undefined : switcher[state.mode];
      updateCSS(toggledMode);
      return { mode: toggledMode };
    default:
      updateCSS(action);
      return { mode: action };
  }
};

export const ModeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [mode, dispatch] = useReducer(reducer, { mode: undefined });

  const bundle = {
    mode: mode.mode,
    toggleTheme: () => dispatch("toggle"),
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );

    dispatch(initialColorValue as ModeAction);
  }, []);

  return <ModeContext.Provider value={bundle}>{children}</ModeContext.Provider>;
};
