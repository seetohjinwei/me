import React from "react";
import { ModeProvider } from "../context/ModeProvider";
import GlobalStyle from "../styles/global";

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <ModeProvider>
      <GlobalStyle />
      {children}
    </ModeProvider>
  );
};

export default Layout;
