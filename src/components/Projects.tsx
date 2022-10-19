import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";
import Divider from "./Divider";

const Section = styled(ContentSection)`
  background: #ade4f9;
`;

const Container = styled(ContentContainer)``;

const ProjectContainer = styled.div``;

const Project = (
  <ProjectContainer>
    <h3>Personal Site</h3>
  </ProjectContainer>
);

const Projects = (): JSX.Element => {
  return (
    <Section id="projects">
      <Divider {...{ colour: "#a2f6a2", width: 274 }} />
      <Container>
        <h2>Things I've made...</h2>
        {Project}
      </Container>
    </Section>
  );
};

export default Projects;
