import * as React from "react";
import type { HeadFC } from "gatsby";
import AboutMe from "../components/AboutMe";
import Layout from "../components/Layout";
import ConstructionWarning from "../components/Construction";

const IndexPage = () => {
  return (
    <Layout>
      <>
        {/* <ConstructionWarning /> */}
        <AboutMe />
      </>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jin Wei</title>;
