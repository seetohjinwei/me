import React from "react";
import styled, { keyframes } from "styled-components";
import { ContentContainer, ContentSection } from "../styles/Containers.styled";
import Divider from "./Divider";

import { AnimationOnScroll } from "react-animation-on-scroll";
import me from "../images/icons/me.png";
import { GitHubSvg, LinkedinSvg, MailSvg } from "./Svg";

const Section = styled(ContentSection)`
  background: var(--color-yellow-background);
`;

const Container = styled(ContentContainer)`
  @media (min-width: 1000px) {
    /* move the image to the right, if screen is large enough */
    display: flex;
    flex-direction: row-reverse;
  }

  font-size: 120%;
`;

const LineBreak = styled.span`
  display: inline-block;
  line-height: 100%;
`;

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

const waveAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const WaveEmoji = styled.span`
  display: inline-block;

  :hover,
  :focus {
    animation: ${waveAnimation} 0.7s linear infinite;
  }
`;

const Links = (): JSX.Element => {
  return (
    <LinkContainer>
      <LinkSpan>
        {GitHubSvg}
        <SocialLink
          href="https://github.com/seetohjinwei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          seetohjinwei
        </SocialLink>
      </LinkSpan>
      <LinkSpan>
        {LinkedinSvg}
        <SocialLink
          href="https://www.linkedin.com/in/seetohjinwei/"
          target="_blank"
          rel="noopener noreferrer"
        >
          seetohjinwei
        </SocialLink>
      </LinkSpan>
      <LinkSpan>
        {MailSvg}
        <SocialLink href="mailto:seetohjinwei@gmail.com">
          seetohjinwei@gmail.com
        </SocialLink>
      </LinkSpan>
    </LinkContainer>
  );
};

const AboutMe = (): JSX.Element => {
  return (
    <Section id="aboutme">
      <Divider {...{ colour: "page", width: 102 }} />
      <Container>
        <AnimationOnScroll animateIn={"animate__fadeInRight"}>
          <Image src={me} width={"200px"} />
        </AnimationOnScroll>
        <div>
          {/* Force line breaks to occur at that point. */}
          <h1>
            <LineBreak>Hey there,&nbsp;</LineBreak>
            <LineBreak>
              I'm Jin Wei! <WaveEmoji>👋</WaveEmoji>
            </LineBreak>
          </h1>
          <p>
            I'm a <b>Software Engineer</b>, mainly doing work in <b>Backend</b>{" "}
            but dabble with a bit of Frontend and DevOps too!
          </p>
          <p>
            I'm someone who loves developing applications and finding new things
            to learn about!
          </p>
          <p>
            I'm currently studying Computer Science at National University of
            Singapore.
          </p>
          <p>PS: I love watching and reading sci-fi shows and books!</p>
          <Links />
        </div>
      </Container>
    </Section>
  );
};

export default AboutMe;
