import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const NavWrapper = styled.nav`
  width: 100%;
  overflow: hidden;
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
    color: ${(props) => props.theme.colours.text};
    font-weight: 600;
  }
`;

const LeftItem = styled(Item)<{ selected: boolean }>`
  ${(props) =>
    props.selected &&
    "border: 2px solid " + props.theme.colours.link + "; border-radius: 6px;"}
  display: inline;
`;

const RightItem = styled(Item)`
  @media (min-width: 1000px) {
    display: inline;
  }
`;

type pages = "me" | "notes";

const NavBar = ({ page }: { page: pages }): JSX.Element => {
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
        <RightItem>
          <Link to="#aboutme">About Me</Link>
        </RightItem>
        <RightItem>
          <Link to="#tech">Tech</Link>
        </RightItem>
        <RightItem>
          <Link to="#projects">Projects</Link>
        </RightItem>
      </RightList>
    </NavWrapper>
  );
};

export default NavBar;