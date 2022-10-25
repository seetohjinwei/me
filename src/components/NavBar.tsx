import { Link } from "gatsby";
import React, { useContext } from "react";
import styled from "styled-components";
import { ModeContext } from "../context/ModeProvider";
import DarkModeSwitcher from "./DarkModeSwitcher";

const NavWrapper = styled.nav`
  width: 100%;
  overflow: hidden;
  margin-top: 1em;
`;

const List = styled.ul`
  list-style: none;
`;

const LeftList = styled(List)`
  float: left;
  list-style: none;
`;

const RightList = styled(List)`
  float: right;
  list-style: none;
  margin-right: 20px;
`;

const Item = styled.li`
  padding: 0 0.5ch;

  > * {
    color: var(--color-text);
    font-size: 1.3em;
    font-weight: 600;
  }
`;

const LeftItem = styled(Item)<{ selected: boolean }>`
  ${(props) =>
    props.selected &&
    "border: 2px solid var(--color-link); border-radius: 6px;"}
  display: inline;
  padding: 0.7ch 1ch;
`;

const RightItem = styled(Item)`
  @media (min-width: 1000px) {
    display: inline;
  }
`;

type pages = "404" | "me" | "notes";

const NavBar = ({
  page,
  children,
}: {
  page: pages;
  children: JSX.Element | null;
}): JSX.Element => {
  const { mode, toggleTheme } = useContext(ModeContext);

  return (
    <NavWrapper>
      <LeftList>
        <LeftItem selected={page === "me"}>
          <Link to="/">me</Link>
        </LeftItem>
        {/* <LeftItem selected={page === "notes"}>
          <Link to="/notes">Notes</Link>
        </LeftItem> */}
      </LeftList>
      <RightList>
        {children}
        <RightItem>
          <DarkModeSwitcher mode={mode} onChange={toggleTheme} />
        </RightItem>
      </RightList>
    </NavWrapper>
  );
};

export const NavBarMain = (): JSX.Element =>
  NavBar({
    page: "me",
    children: (
      <>
        <RightItem>
          <Link to="#aboutme">About Me</Link>
        </RightItem>
        <RightItem>
          <Link to="#tech">Tech</Link>
        </RightItem>
        <RightItem>
          <Link to="#projects">Projects</Link>
        </RightItem>
      </>
    ),
  });

export const NavBar404 = (): JSX.Element =>
  NavBar({
    page: "404",
    children: null,
  });
