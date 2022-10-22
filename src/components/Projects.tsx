import React from "react";
import styled from "styled-components";
import {
  ContentContainer,
  ContentSection,
  List,
} from "../styles/Containers.styled";
import Divider from "./Divider";

// TODO: update this, with dark + light mode
import me from "../images/sites/me.png";
import organius from "../images/sites/organius.png";

const Section = styled(ContentSection)`
  background: var(--color-blue-background);
`;

const Container = styled(ContentContainer)``;

const ProjectContainer = styled.div`
  /* backdrop-filter isn't supported by some smaller browsers (they will just see the same background colour as the section) */
  backdrop-filter: brightness(1.1);
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px 40px;
  margin-bottom: 1em;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 0.3em;
`;

const TechList = styled(List)`
  > * {
    font-size: 90%;
  }
`;

const TechStack = styled.b`
  text-decoration: underline;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProjectImage = styled.img`
  width: 100%;
`;

const ProjectLinks = styled.div`
  display: flex;
  margin-top: 0.5em;
  justify-content: space-around;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Organius = (
  <ProjectContainer>
    <ProjectTitle>OrgaNiUS</ProjectTitle>
    <ImageContainer>
      <ProjectImage src={organius} />
    </ImageContainer>
    <p>A central hub for forming, planning and organising group work.</p>
    <p>
      Key features include managing projects, events and tasks, both at an
      individual and project level. Do check out the promotional video if this
      sounds interesting!
    </p>
    <p>
      This is a complete full-stack web application with a React frontend and
      Golang backend with RESTful architecture, and was developed with a friend
      of mine as part of a University module! More details can be found in the
      Project Documentation link!
    </p>
    <p>
      Design is pretty simple because time was spent perfecting everything else
      instead :p
    </p>
    <TechStack>Tech Stack</TechStack>
    <TechList>
      <li>TypeScript, React, Create React App</li>
      <li>Golang, Gin Web Framework, Gorilla Web Socket Framework</li>
      <li>Jest, React Testing Library, Go Testing Library</li>
      <li>Styled Components, Tailwind</li>
      <li>MongoDB</li>
      <li>Docker</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/organius/organius"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a
        href="https://organius.jinwei.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website
      </a>
      <a
        href="https://docs.google.com/document/d/1i6PSnL6ETGeS_o3-guyhrTmHUamMz73ZENaw63N_GPI/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Project Documentation
      </a>
      <a
        href="https://www.youtube.com/watch?v=An4ZFKv77Oc"
        target="_blank"
        rel="noopener noreferrer"
      >
        Promotional Video (with Demo)
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const Me = (
  <ProjectContainer>
    <ProjectTitle>Personal Site</ProjectTitle>
    <ProjectImage src={me} />
    <p>My very own personal site!</p>
    <p>
      The site is built with Responsive Web Design in mind, so the layout adapts
      to your screen size. Go ahead and try it out!
    </p>
    <p>As I am not much of a designer, I opted for a simpler look :D</p>
    <p>
      Check out the dark / light mode switcher on the top right of the page!
    </p>
    <p>Deployed and hosted on my own remote server!</p>
    <TechStack>Tech Stack</TechStack>
    <TechList>
      <li>TypeScript, React, Gatsby</li>
      <li>Styled Components</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/seetohjinwei/me"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a href="https://jinwei.dev" target="_blank" rel="noopener noreferrer">
        Website (here!)
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const Projects = (): JSX.Element => {
  return (
    <Section id="projects">
      <Divider {...{ colour: "green", width: 274 }} />
      <Container>
        <h2>Things I've made...</h2>
        {Organius}
        {Me}
      </Container>
    </Section>
  );
};

export default Projects;
