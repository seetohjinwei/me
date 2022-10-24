import type { HeadFC } from "gatsby";
import * as React from "react";
import AboutMe from "../components/AboutMe";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import Projects from "../components/Projects";
import Tech from "../components/Tech";

import "animate.css/animate.min.css";

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
        <Footer />
      </>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Jin Wei</title>;
