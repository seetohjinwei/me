import type { HeadFC } from "gatsby";
import * as React from "react";
import AboutMe from "../components/AboutMe";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { NavBarMain } from "../components/NavBar";
import Projects from "../components/Projects";
import Tech from "../components/Tech";

import "animate.css/animate.min.css";

const IndexPage = () => {
  return (
    <Layout>
      <>
        <header>
          <NavBarMain />
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
