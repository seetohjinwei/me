import React from "react";
import styled from "styled-components";
import { ContentContainer } from "../styles/Containers.styled";

const Container = styled(ContentContainer)`
  background: orange;
  color: black;
  margin-top: 3%;
  text-align: center;
  padding: 1px;
`;

const Text = styled.p`
  font-size: 3em;
`;

const ConstructionWarning = (): JSX.Element => {
  return (
    <Container>
      <Text>Site is under construction!</Text>
    </Container>
  );
};

export default ConstructionWarning;
