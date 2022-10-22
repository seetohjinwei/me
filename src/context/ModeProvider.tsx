import React, { createContext, useReducer } from "react";

type modes = "light" | "dark";
// Simple type validation: https://stackoverflow.com/a/57065841
const isValidMode = (maybeMode: string | null): maybeMode is modes => {
  if (maybeMode === null) {
    return false;
  }
  return ["light", "dark"].includes(maybeMode);
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

// Check for browser preference: https://stackoverflow.com/a/57795495
const isPrefersDarkMode = (): boolean => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

const localStorageKey = "mode";

const setStorage = (mode: modes): void => {
  window.localStorage.setItem(localStorageKey, mode);
};

const getStorage = (): modes => {
  const storedMode: string | null =
    window.localStorage.getItem(localStorageKey);

  if (isValidMode(storedMode)) {
    return storedMode;
  } else if (isPrefersDarkMode()) {
    setStorage("dark");
    return "dark";
  } else {
    setStorage("light");
    return "light";
  }
};

type ModeState = { mode: modes };
type ModeAction = "toggle" | "light" | "dark";
// Reducer also handles update to the storage.
const reducer = (state: ModeState, action: ModeAction): ModeState => {
  switch (action) {
    case "toggle":
      const toggledMode: modes = switcher[state.mode];
      setStorage(toggledMode);
      return { mode: toggledMode };
    default:
      setStorage(action);
      return { mode: action };
  }
};

export const ModeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [mode, dispatch] = useReducer(reducer, { mode: getStorage() });

  const bundle = {
    mode: mode.mode,
    toggleTheme: () => dispatch("toggle"),
  };

  return <ModeContext.Provider value={bundle}>{children}</ModeContext.Provider>;
};
