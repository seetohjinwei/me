import Divider from "./Divider";
import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";

import cssIcon from "../images/css.svg";
import dockerIcon from "../images/docker.svg";
import gitIcon from "../images/git.svg";
import goIcon from "../images/go.svg";
import htmlIcon from "../images/html.svg";
import javaIcon from "../images/java.svg";
import luaIcon from "../images/lua.svg";
import mongoIcon from "../images/mongodb.svg";
import pythonIcon from "../images/python.svg";
import rubyIcon from "../images/ruby.svg";
import sqlIcon from "../images/sql.svg";
import typescriptIcon from "../images/typescript.svg";

const Section = styled(ContentSection)`
  background: #a2f6a2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  /* grid-template-rows: repeat(auto-fill, ); */
  column-gap: 10px;
  row-gap: 20px;
`;

const Item = styled.div``;

const List = styled.ul`
  list-style-position: outside;
  list-style-type: circle;
  margin: 0;
  padding: 0 20px;
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

const typescript = (
  <Item>
    <ItemTitle>
      <Image src={typescriptIcon} />
      <b>TypeScript & JavaScript</b>
    </ItemTitle>
    <List>
      <li>React</li>
      <li>Jest</li>
      <li>React Testing Library</li>
      <li>Next.js</li>
    </List>
  </Item>
);

const java = (
  <Item>
    <ItemTitle>
      <Image src={javaIcon} />
      <b>Java</b>
    </ItemTitle>
    <List>
      <li>Java Standard Edition</li>
      <li>JUnit</li>
      <li>
        A <em>bit</em> of JavaFX
      </li>
    </List>
  </Item>
);

const python = (
  <Item>
    <ItemTitle>
      <Image src={pythonIcon} />
      <b>Python</b>
    </ItemTitle>
    <List>
      <li>Scripting</li>
      <li>Coding questions</li>
    </List>
  </Item>
);

const html = (
  <Item>
    <ItemTitle>
      <Image src={htmlIcon} />
      <b>HTML</b>
    </ItemTitle>
    <List>
      <li>
        With a <em>bit</em> of Googling.
      </li>
    </List>
  </Item>
);

const css = (
  <Item>
    <ItemTitle>
      <Image src={cssIcon} />
      <b>CSS</b>
    </ItemTitle>
    <List>
      <li>Styled Components</li>
      <li>SASS</li>
      <li>Tailwind</li>
      <li>... and regular CSS</li>
    </List>
  </Item>
);

const golang = (
  <Item>
    <ItemTitle>
      <Image src={goIcon} />
      <b>Golang</b>
    </ItemTitle>
    <List>
      <li>Gin Web Framework</li>
      <li>Gorilla Web Socket Framework</li>
      <li>Go Testing Library</li>
    </List>
  </Item>
);

const ruby = (
  <Item>
    <ItemTitle>
      <Image src={rubyIcon} />
      <b>Ruby</b>
    </ItemTitle>
    <List>
      <li>Ruby on Rails</li>
    </List>
  </Item>
);

const lua = (
  <Item>
    <ItemTitle>
      <Image src={luaIcon} />
      <b>Lua</b>
    </ItemTitle>
    <List>
      <li>
        Lua LÖVE Framework - <em>2D Game Engine</em>
      </li>
      <li>Light scripting</li>
    </List>
  </Item>
);

const sql = (
  <Item>
    <ItemTitle>
      <Image src={sqlIcon} />
      <b>SQL</b>
    </ItemTitle>
    <List>
      <li>PostgreSQL</li>
      <li>Relational Database</li>
    </List>
  </Item>
);

const mongodb = (
  <Item>
    <ItemTitle>
      <Image src={mongoIcon} />
      <b>MongoDB</b>
    </ItemTitle>
    <List>
      <li>NoSQL</li>
    </List>
  </Item>
);

const git = (
  <Item>
    <ItemTitle>
      <Image src={gitIcon} />
      <b>Git & GitHub</b>
    </ItemTitle>
    <List>
      <li>Git commands</li>
      <li>GitHub Actions</li>
    </List>
  </Item>
);

const docker = (
  <Item>
    <ItemTitle>
      <Image src={dockerIcon} />
      <b>Docker</b>
    </ItemTitle>
    <List>
      <li>Know the basics</li>
    </List>
  </Item>
);

const Tech = (): JSX.Element => {
  return (
    <Section>
      <Divider {...{ colour: "#f8f89f", width: 165 }} />
      <Container>
        <h1>Things I've used...</h1>
        <Grid>
          {typescript}
          {java}
          {golang}
          {sql}
          {mongodb}
          {css}
          {git}
          {python}
          {html}
          {ruby}
          {lua}
          {docker}
        </Grid>
      </Container>
    </Section>
  );
};

export default Tech;
