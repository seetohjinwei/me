import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";

const Section = styled(ContentSection)`
  background: orange;
`;

const Container = styled(ContentContainer)`
  color: black;
  text-align: center;
  padding: 1px;
`;

const Text = styled.p`
  font-size: 3em;
`;

const ConstructionWarning = (): JSX.Element => {
  return (
    <Section>
      <Container>
        <Text>Site is under construction!</Text>
      </Container>
    </Section>
  );
};

export default ConstructionWarning;
