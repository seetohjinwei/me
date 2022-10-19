import * as React from "react";
import type { HeadFC } from "gatsby";
import AboutMe from "../components/AboutMe";
import Layout from "../components/Layout";
import Tech from "../components/Tech";
import Projects from "../components/Projects";
import NavBar from "../components/NavBar";

const IndexPage = () => {
  return (
    <Layout>
      <>
        <header>
          <NavBar page="me" />
        </header>
        <AboutMe />
        <Tech />
        <Projects />
        {/* Add a footer. */}
      </>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jin Wei</title>;
