import React from "react";
import styled from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";
import me from "../images/me.png";
import Divider from "./Divider";

const Section = styled(ContentSection)`
  background: #f8f89f;
`;

const Container = styled(ContentContainer)`
  @media (min-width: 1000px) {
    /* move the image to the right, if screen is large enough */
    display: flex;
    flex-direction: row-reverse;
  }
`;

// TODO: Animate image into view. Differently, based on phone or PC.
const Image = styled.img`
  display: block;
  margin: auto;

  @media (min-width: 1000px) {
    margin-left: 2em;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 1000px) {
    margin-top: 2em;
    flex-direction: row;
  }
`;

const LinkSpan = styled.span`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  margin: 0 1ch;
`;

// Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.

const githubIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 512">
    <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z" />
  </svg>
);

const linkedinIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

const mailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M0 128C0 92.65 28.65 64 64 64H448C483.3 64 512 92.65 512 128V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V128zM48 128V150.1L220.5 291.7C241.1 308.7 270.9 308.7 291.5 291.7L464 150.1V127.1C464 119.2 456.8 111.1 448 111.1H64C55.16 111.1 48 119.2 48 127.1L48 128zM48 212.2V384C48 392.8 55.16 400 64 400H448C456.8 400 464 392.8 464 384V212.2L322 328.8C283.6 360.3 228.4 360.3 189.1 328.8L48 212.2z" />
  </svg>
);

const Links = (): JSX.Element => {
  return (
    <LinkContainer>
      <LinkSpan>
        {githubIcon}
        <SocialLink
          href="https://github.com/seetohjinwei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          seetohjinwei
        </SocialLink>
      </LinkSpan>
      <LinkSpan>
        {linkedinIcon}
        <SocialLink
          href="https://www.linkedin.com/in/seetohjinwei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          seetohjinwei
        </SocialLink>
      </LinkSpan>
      <LinkSpan>
        {mailIcon}
        <SocialLink href="mailto:seetohjinwei@gmail.com">
          seetohjinwei@gmail.com
        </SocialLink>
      </LinkSpan>
    </LinkContainer>
  );
};

const AboutMe = (): JSX.Element => {
  return (
    <Section>
      <Divider {...{ colour: "#d5d5d5", width: 102 }} />
      <Container>
        <Image src={me} width={"200px"} />
        <div>
          <h1>Hey there, I'm Jin Wei! 👋</h1>
          <p>
            I'm a Backend Developer, but dabble with a bit of Frontend and
            DevOps.
          </p>
          <p>
            I'm someone who loves developing applications and finding new things
            to learn about!
          </p>
          <p>
            I'm currently studying Computer Science at National University of
            Singapore.
          </p>
          <Links />
        </div>
      </Container>
    </Section>
  );
};

export default AboutMe;