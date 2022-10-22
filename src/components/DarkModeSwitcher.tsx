import React from "react";
import styled from "styled-components";

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
  background-color: ${(props) => props.theme.colours.buttonDarkMode};
  border-radius: 25px;
  cursor: pointer;
  height: 50px;
  position: absolute;
  width: 100%;
`;

const Slider = styled.span`
  border: 3px solid ${(props) => props.theme.colours.text};
  border-radius: 25px;
  height: 100%;
  position: absolute;
  transition: 0.3s;
  width: 100%;

  &::before {
    background-color: ${(props) => props.theme.colours.buttonDarkMode};
    border-radius: 50%;
    box-shadow: inset 14px -2px 0px 0px ${(props) => props.theme.colours.buttonLightMode};
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
    background-color: ${(props) => props.theme.colours.buttonLightMode};
  }

  &:checked ~ ${Slider}::before {
    transform: translateX(47.5px);
    background-color: ${(props) => props.theme.colours.buttonDarkMode};
    box-shadow: none;
  }
`;

/* This switcher is adapted from the link below.
Found at: https://alvarotrigo.com/blog/toggle-switch-css/
Code pen: https://codepen.io/alvarotrigo/pen/zYPydpB
*/
const DarkModeSwitcher = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}): JSX.Element => {
  return (
    <Wrapper>
      <Label>
        <Input type="checkbox" checked={checked} onChange={onChange} />
        <Slider />
      </Label>
    </Wrapper>
  );
};

export default DarkModeSwitcher;
