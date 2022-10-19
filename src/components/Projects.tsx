import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";
import Divider from "./Divider";

const Section = styled(ContentSection)`
  background: #ade4f9;
`;

const Container = styled(ContentContainer)``;

const Projects = (): JSX.Element => {
  return (
    <Section>
      <Divider {...{ colour: "#a2f6a2", width: 274 }} />
      <Container>
        <h1>Things I've made...</h1>
      </Container>
    </Section>
  );
};

export default Projects;
