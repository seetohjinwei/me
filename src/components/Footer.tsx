import React from "react";
import styled from "styled-components";

import { StarSvg } from "./Svg";

const Foot = styled.footer`
  height: 30px;
  /* very subtle gradient */
  background-image: linear-gradient(
    var(--color-blue-background),
    transparent 30%
  );

  > * {
    color: var(--color-faded);
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

const StarSpan = styled.span`
  > svg {
    transform: scale(1);
    transition: all 0.2s ease-out;
  }

  :hover,
  :focus {
    > svg {
      fill: var(--color-link-hover);
      transform: scale(1.2);
    }
  }
`;

const Footer = (): JSX.Element => {
  return (
    <Foot>
      <LeftSide>
        Made by{" "}
        <a
          href="https://github.com/seetohjinwei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          See Toh Jin Wei
        </a>
      </LeftSide>
      <RightSide>
        <a
          href="https://github.com/seetohjinwei/me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StarSpan>{StarSvg} on GitHub</StarSpan>
        </a>
      </RightSide>
    </Foot>
  );
};

export default Footer;
