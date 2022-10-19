import React from "react";
import styled from "styled-components";

import starIcon from "../images/star.svg";
import { SmallIcon } from "../styles/Containers.styled";

const Foot = styled.footer`
  height: 30px;
  /* very subtle gradient */
  background-image: linear-gradient(#ade4f9, transparent 30%);

  > * {
    color: ${(props) => props.theme.colours.faded};
    margin: 1em 0;
  }
`;

const LeftSide = styled.div`
  float: left;
  margin-left: 2em;
`;

const RightSide = styled.div`
  float: right;
  margin-right: 2em;
`;

const Footer = (): JSX.Element => {
  return (
    <Foot>
      <LeftSide>
        Made by <a href="https://github.com/seetohjinwei/">See Toh Jin Wei</a>
      </LeftSide>
      <RightSide>
        <a href="https://github.com/seetohjinwei/me">
          <SmallIcon src={starIcon} /> on GitHub
        </a>
      </RightSide>
    </Foot>
  );
};

export default Footer;
