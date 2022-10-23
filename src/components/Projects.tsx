import React from "react";
import styled from "styled-components";
import {
  ContentContainer,
  ContentSection,
  List,
} from "../styles/Containers.styled";
import Divider from "./Divider";

import deaths from "../images/sites/50deaths.png";
import me from "../images/sites/me.png";
import organius from "../images/sites/organius.png";
import tm from "../images/sites/tm.png";

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

const BoldUnderline = styled.b`
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

const ProjectVerticalImage = styled.img`
  height: 500px;
  width: auto;
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
      Golang backend with RESTful architecture. More details can be found in the
      Project Documentation link!
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
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

const TM = (
  <ProjectContainer>
    <ProjectTitle>Task Manager</ProjectTitle>
    <ProjectImage src={tm} />
    <p>
      Create, edit, tag, sort, re-arrange, filter, remove your tasks easily with
      this Task Manager.
    </p>
    <p>
      Features a login system, 3 themes to choose from, a variety of options,
      with configurable defaults!
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
    <TechList>
      <li>TypeScript, React</li>
      <li>Ruby on Rails, PostgreSQL</li>
      <li>Bootstrap Components</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/seetohjinwei/task-manager"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a href="https://tm.jinwei.dev" target="_blank" rel="noopener noreferrer">
        Website
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const Me = (
  <ProjectContainer>
    <ProjectTitle>Personal Site</ProjectTitle>
    <ProjectImage src={me} />
    <p>
      My very own personal site! Here, you can find all kinds of things related
      to me!
    </p>
    <p>
      This is built with Responsive Web Design in mind, so the layout adapts to
      your screen size. Go ahead and try it out!
    </p>
    <p>
      I picked the initial color mode based on your preference but check out the
      dark / light mode switcher at the top right if you wanna change things up!
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
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

const TaskBook = (
  <ProjectContainer>
    <ProjectTitle>TaskBook</ProjectTitle>
    <ProjectVerticalImage src="https://github.com/AY2223S1-CS2103T-T13-4/tp/raw/master/docs/images/Ui.png" />
    <p>
      A contact and task management desktop application, built with Software
      Engineering principles in mind!
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
    <TechList>
      <li>Java, JUnit, JavaFX</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/AY2223S1-CS2103T-T13-4/tp"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a
        href="https://github.com/AY2223S1-CS2103T-T13-4/tp/releases"
        target="_blank"
        rel="noopener noreferrer"
      >
        Application Download
      </a>
      <a
        href="https://ay2223s1-cs2103t-t13-4.github.io/tp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer and User Guide
      </a>
      <a
        href="https://ay2223s1-cs2103t-t13-4.github.io/tp/team/seetohjinwei.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        My Contribution!
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const LittleDuke = (
  <ProjectContainer>
    <ProjectTitle>Little Duke</ProjectTitle>
    <ProjectVerticalImage src="https://github.com/seetohjinwei/ip/raw/master/docs/Ui.png" />
    <p>
      A todo-list desktop application, built with Software Engineering
      principles in mind!
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
    <TechList>
      <li>Java, JUnit, JavaFX</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/seetohjinwei/ip"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a
        href="https://github.com/seetohjinwei/ip/releases"
        target="_blank"
        rel="noopener noreferrer"
      >
        Application Download
      </a>
      <a
        href="https://seetohjinwei.github.io/ip/"
        target="_blank"
        rel="noopener noreferrer"
      >
        User Guide
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const FiftyDeaths = (
  <ProjectContainer>
    <ProjectTitle>50 Deaths</ProjectTitle>
    <ProjectImage src={deaths} />
    <p>
      A short rogue-like game where you fight your way through multiple levels
      and eventually beat the final boss!{" "}
      <em>Hopefully you don't actually need 50 deaths to finish the game!</em>
    </p>
    <BoldUnderline>Tech Stack</BoldUnderline>
    <TechList>
      <li>Lua, LÖVE Framework</li>
    </TechList>
    <ProjectLinks>
      <a
        href="https://github.com/seetohjinwei/50deaths"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
      <a
        href="https://github.com/seetohjinwei/50deaths/blob/main/README.md#launching-the-game"
        target="_blank"
        rel="noopener noreferrer"
      >
        Game Download
      </a>
      <a
        href="https://www.youtube.com/watch?v=AAngr3Ti0kc"
        target="_blank"
        rel="noopener noreferrer"
      >
        Video Demo
      </a>
      <a
        href="https://github.com/seetohjinwei/50deaths/blob/main/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        Development Docs
      </a>
    </ProjectLinks>
  </ProjectContainer>
);

const DevOps = (
  <ProjectContainer>
    <ProjectTitle>DevOps Experience</ProjectTitle>
    <p>
      In most of my projects, I am the one doing the general DevOps work,
      including set up and deployment.
    </p>
    <p>
      In fact, my web projects are all hosted and deployed on my own remote
      Ubuntu server, reverse-proxied by an Nginx instance. You are being served
      content from it right now!
    </p>
    <p>
      Even though I am not aiming to do work in DevOps, I believe the general
      experience can help a lot in other areas too!
    </p>
    <BoldUnderline>Experience</BoldUnderline>
    <TechList>
      <li>General Linux / Unix CLI familiarity</li>
      <li>Continuous Integration & Continuous Deployment (CI/CD) scripts</li>
      <li>Basic Docker scripts</li>
      <li>Basic hosting and server setup</li>
      <li>Setting up various types of tech projects</li>
    </TechList>
  </ProjectContainer>
);

const Others = (
  <ProjectContainer>
    <ProjectTitle>Others</ProjectTitle>
    <p>
      <BoldUnderline>LeetCode</BoldUnderline>
      {": "}
      <a
        href="https://leetcode.com/seetohjinwei/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link
      </a>
    </p>
  </ProjectContainer>
);

const Projects = (): JSX.Element => {
  return (
    <Section id="projects">
      <Divider {...{ colour: "green", width: 274 }} />
      <Container>
        <h2>Things I've done...</h2>
        {Organius}
        {TM}
        {Me}
        {TaskBook}
        {LittleDuke}
        {FiftyDeaths}
        {DevOps}
        {Others}
      </Container>
    </Section>
  );
};

export default Projects;
