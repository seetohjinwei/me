import * as React from "react";
import type { HeadFC } from "gatsby";
import AboutMe from "../components/AboutMe";
import Layout from "../components/Layout";
import ConstructionWarning from "../components/Construction";
import Tech from "../components/Tech";
import Projects from "../components/Projects";

const IndexPage = () => {
  return (
    <Layout>
      <>
        {/* Add a header. */}
        {/* <ConstructionWarning /> */}
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
