import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";
import Divider from "./Divider";

const Section = styled(ContentSection)`
  background: #a2f6a2;
`;

const Container = styled(ContentContainer)``;

const Tech = (): JSX.Element => {
  return (
    <Section>
      <Divider {...{ colour: "#f8f89f", width: 165 }} />
      <Container>
        <h1>Technologies</h1>
      </Container>
    </Section>
  );
};

export default Tech;
