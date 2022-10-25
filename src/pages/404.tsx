import { HeadFC, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { NavBar404 } from "../components/NavBar";
import { ContentContainer } from "../styles/Containers.styled";

const NotFoundPage = () => {
  return (
    <Layout>
      <>
        <header>
          <NavBar404 />
        </header>
        <ContentContainer>
          <h1>Hey, this isn't a valid page :/</h1>
          <p>
            You might want to go to my <Link to="/">home page</Link> instead!
          </p>
        </ContentContainer>
      </>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
