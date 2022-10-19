import Divider from "./Divider";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ContentContainer,
  ContentSection,
  List,
} from "../styles/Containers.styled";

// Icons from https://devicon.dev/
import cppIcon from "../images/icons/cpp.svg";
import cssIcon from "../images/icons/css.svg";
import dockerIcon from "../images/icons/docker.svg";
import gitIcon from "../images/icons/git.svg";
import goIcon from "../images/icons/go.svg";
import htmlIcon from "../images/icons/html.svg";
import javaIcon from "../images/icons/java.svg";
import luaIcon from "../images/icons/lua.svg";
import mongoIcon from "../images/icons/mongodb.svg";
import pythonIcon from "../images/icons/python.svg";
import rubyIcon from "../images/icons/ruby.svg";
import sqlIcon from "../images/icons/sql.svg";
import typescriptIcon from "../images/icons/typescript.svg";

const Section = styled(ContentSection)`
  background: #a2f6a2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  column-gap: 10px;
  row-gap: 20px;
`;

const ShowButton = styled.button`
  border: 1px solid black;
  border-radius: 10px;
  font-size: 1.5rem;
  height: 75px;
  margin: auto 0;
  /* backdrop-filter isn't supported by some smaller browsers (they will just see the same background colour as the section) */
  backdrop-filter: brightness(1.3);
  background: transparent;

  &:hover,
  &:active {
    backdrop-filter: brightness(1.5);
  }
`;

const Item = styled.div<{ show: boolean }>`
  ${(props) => !props.show && "display: none;"}

  /* backdrop-filter isn't supported by some smaller browsers (they will just see the same background colour as the section) */
  backdrop-filter: brightness(1.1);
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const Image = styled.img`
  margin-right: 1ch;
  width: 50px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled(ContentContainer)``;

const ItemElement = (
  icon: "*.svg" | null,
  name: string,
  details: JSX.Element
) => {
  return (show: boolean): JSX.Element => (
    <Item show={show}>
      <ItemTitle>
        {icon !== null && <Image src={icon} />}
        <b>{name}</b>
      </ItemTitle>
      {details}
    </Item>
  );
};

const typescript = ItemElement(
  typescriptIcon,
  "TypeScript & JavaScript",
  <List>
    <li>React</li>
    <li>Jest</li>
    <li>React Testing Library</li>
    <li>Next.js</li>
  </List>
);

const java = ItemElement(
  javaIcon,
  "Java",
  <List>
    <li>Java Standard Edition</li>
    <li>JUnit</li>
    <li>
      A <em>bit</em> of JavaFX
    </li>
  </List>
);

const golang = ItemElement(
  goIcon,
  "Golang",
  <List>
    <li>Gin Web Framework</li>
    <li>Gorilla Web Socket Framework</li>
    <li>Go Testing Library</li>
  </List>
);

const sql = ItemElement(
  sqlIcon,
  "SQL",
  <List>
    <li>PostgreSQL</li>
    <li>Relational Database</li>
  </List>
);

const mongodb = ItemElement(
  mongoIcon,
  "MongoDB",
  <List>
    <li>NoSQL</li>
  </List>
);

const css = ItemElement(
  cssIcon,
  "CSS",
  <List>
    <li>Styled Components</li>
    <li>SCSS</li>
    <li>Tailwind</li>
    <li>... and regular CSS</li>
  </List>
);

const git = ItemElement(
  gitIcon,
  "Git & GitHub",
  <List>
    <li>Git commands</li>
    <li>General GitHub usage</li>
    <li>GitHub Actions</li>
  </List>
);

const others = ItemElement(
  null,
  "Others",
  <List>
    <li>Software Engineering</li>
    <li>RESTful APIs</li>
    <li>Data Structures & Algorithms</li>
  </List>
);

const python = ItemElement(
  pythonIcon,
  "Python",
  <List>
    <li>Scripting</li>
    <li>Coding questions</li>
  </List>
);

const html = ItemElement(
  htmlIcon,
  "HTML",
  <List>
    <li>Responsive Web Design</li>
    <li>
      With a <em>bit</em> of Googling
    </li>
  </List>
);

const docker = ItemElement(dockerIcon, "Docker", <List>Know the basics</List>);

const cpp = ItemElement(
  cppIcon,
  "C & C++",
  <List>
    <li>Using for miscellaneous stuff</li>
    <li>Coding questions</li>
  </List>
);

const ruby = ItemElement(
  rubyIcon,
  "Ruby",
  <List>
    <li>Ruby on Rails</li>
  </List>
);

const lua = ItemElement(
  luaIcon,
  "Lua",
  <List>
    <li>
      Lua LÖVE Framework - <em>2D Game Engine</em>
    </li>
    <li>Light scripting</li>
  </List>
);

const Tech = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    setShow((s) => !s);
  };

  return (
    <Section id="tech">
      <Divider {...{ colour: "#f8f89f", width: 165 }} />
      <Container>
        <h2>Things I've used...</h2>
        <Grid>
          {typescript(true)}
          {java(true)}
          {golang(true)}
          {sql(true)}
          {mongodb(true)}
          {css(true)}
          {git(true)}
          {others(true)}
          {python(show)}
          {html(show)}
          {docker(show)}
          {cpp(show)}
          {ruby(show)}
          {lua(show)}
          <ShowButton onClick={handleClick}>
            {show ? "Hide Some" : "Show More"}
          </ShowButton>
        </Grid>
      </Container>
    </Section>
  );
};

export default Tech;
