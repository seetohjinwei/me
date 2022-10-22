import React from "react";
import styled from "styled-components";
import { modes } from "../context/ModeProvider";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  scale: 0.6;
  /* Hacky CSS alignment, but looks good. */
  top: -15px;
  right: 20px;

  @media (min-width: 1000px) {
    right: 0;
    top: -30px;
    scale: 0.7;
  }
`;

const Label = styled.label`
  background-color: var(--color-button-dark-mode);
  border-radius: 25px;
  cursor: pointer;
  height: 50px;
  position: absolute;
  width: 100%;
`;

const Slider = styled.span`
  border: 3px solid var(--color-text);
  border-radius: 25px;
  height: 100%;
  position: absolute;
  transition: 0.3s;
  width: 100%;

  &::before {
    background-color: var(--color-button-dark-mode);
    border-radius: 50%;
    box-shadow: inset 14px -2px 0px 0px var(--color-button-light-mode);
    content: "";
    height: 37.5px;
    left: 8px;
    position: absolute;
    top: 6.5px;
    transition: 0.3s;
    width: 37.5px;
  }
`;

const Input = styled.input`
  display: none;
  position: absolute;

  &:checked ~ ${Slider} {
    background-color: var(--color-button-light-mode);
  }

  &:checked ~ ${Slider}::before {
    transform: translateX(47.5px);
    background-color: var(--color-button-dark-mode);
    box-shadow: none;
  }
`;

/* This switcher is adapted from the link below.
Found at: https://alvarotrigo.com/blog/toggle-switch-css/
Code pen: https://codepen.io/alvarotrigo/pen/zYPydpB
*/
const DarkModeSwitcher = ({
  mode,
  onChange,
}: {
  mode: modes;
  onChange: () => void;
}): JSX.Element => {
  return (
    <Wrapper>
      <Label>
        <Input type="checkbox" checked={mode === "light"} onChange={onChange} />
        <Slider />
      </Label>
    </Wrapper>
  );
};

export default DarkModeSwitcher;
