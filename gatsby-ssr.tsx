/**
 * Solution for Dark Mode problems from this amazing blog!
 * https://www.joshwcomeau.com/react/dark-mode/
 */
import React from "react";

// Make sure to update the colors in `/src/context/ModeProvider.tsx` as well!
const MagicScriptTag = () => {
  const codeToRunOnClient = `
  (function() {
  const darkColors = {
    pageBackground: "#171214",
    yellowBackground: "#5b4628",
    greenBackground: "#0b525b",
    blueBackground: "#212f45",
    text: "#eeeeee",
    faded: "#eeeeee",
    link: "#f790e8",
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

  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("mode");
    const hasPersistedPreference = typeof persistedColorPreference === "string";
    // If the user has explicitly chosen light or dark, let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // If they haven't been explicit, let's check the media query
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }
    // If they are using a browser/OS that doesn't support
    // color themes, let's default to 'light'.
    return "light";
  }

  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  const colors = colorMode === "light" ? lightColors : darkColors;
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
  root.style.setProperty("--initial-color-mode", colorMode);
  })()`;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};
