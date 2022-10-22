import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { ModeContext, ModeProvider } from "../context/ModeProvider";
import { themes } from "../styles/colours";
import GlobalStyle from "../styles/global";

const ThemeProviderWithMode = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { mode } = useContext(ModeContext);
  return <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>;
};

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <ModeProvider>
      <ThemeProviderWithMode>
        <GlobalStyle />
        {children}
      </ThemeProviderWithMode>
    </ModeProvider>
  );
};

export default Layout;
