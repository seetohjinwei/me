import styled from "styled-components";

export const ContentSection = styled.section`
  padding-top: 5%;
  position: relative;
  width: 100%;
`;

// TODO: slight gradient on background
export const ContentContainer = styled.div`
  /* background: ${(props) => props.theme.colours.containerBackground}; */
  border-radius: 20px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 3em;
  width: clamp(200px, 95%, 900px);
`;

export const Icon = styled.img`
  fill: ${(props) => props.theme.colours.text};
  height: 30px;
`;

export const SmallIcon = styled.img`
  fill: ${(props) => props.theme.colours.text};
  height: 20px;
`;
