import React from "react";
import styled from "styled-components";
import tale from "../../assets/avatar/tale.jpg";
import kelechi from "../../assets/avatar/kelechi.jpg";
import sean from "../../assets/avatar/sean.jpg";
import tigran from "../../assets/avatar/tigran.jpg";
import matt from "../../assets/avatar/matt.jpg";
import wasiu from "../../assets/avatar/wasiu.jpg";
import yusuf from "../../assets/avatar/yusuf.jpeg";
import benjamin from "../../assets/avatar/benjamin.jpg";
import remi from "../../assets/avatar/remi.jpg";
import { Card, Icon } from "antd";

const About = () => {
  const team = [
    {
      name: "Benjamin Grabow",
      title: "Full Stack Developer",
      twitter: "GrabowBenjamin",
      image: benjamin,
      linkedin: "benjamin-grabow",
      github: "BenjaminGrabow"
    },
    {
      name: "Yusuf Abdulkarim",
      title: "Full Stack Developer",
      twitter: "Haywhyze",
      image: yusuf,
      linkedin: "yusufayo",
      github: "haywhyze"
    },
    {
      name: "Tigran Asriyan",
      title: "Full Stack Developer",
      twitter: "",
      image: tigran,
      linkedin: "tigranasriyan",
      github: "hyetigran"
    },
    {
      name: "Remi Becheru",
      title: "Full Stack Developer",
      twitter: "RemiBecheru",
      image: remi,
      linkedin: "remi-becheru-870495150",
      github: "Becheru888"
    },
    {
      name: "Matthew Locklin",
      title: "Full Stack Developer",
      twitter: "MatthewLocklin6",
      image: matt,
      linkedin: "matthewlocklin",
      github: "Lockers"
    },
    {
      name: "Shaun Carmody",
      title: "Team Lead",
      image: sean,
      twitter: "shaunmcarmody",
      linkedin: "shaunmcarmody",
      github: "shaunmcarmody"
    },
    {
      name: "Kelechi Ogbonna",
      title: "Front End Developer",
      twitter: "",
      image: kelechi,
      linkedin: "kelechi-ogbonna",
      github: "Kellswork"
    },
    {
      name: "Antonio Talent",
      title: "Front End Developer",
      twitter: "",
      image: tale,
      linkedin: "talentantonio-fsse/",
      github: "sampler36"
    },
    {
      name: "Wasiu Idowu",
      title: "Back End Developer",
      twitter: "Hoxtygen",
      image: wasiu,
      linkedin: "wasiu-idowu",
      github: "Hoxtygen"
    }
  ];
  return (
    <>
      <AboutSection>
        <h1>Meet The Team</h1>
        <CardWrapper>
          {team.map(member => (
            <Card
              hoverable
              key={member.name}
              title={member.name}
              cover={<img alt={member.name} src={member.image} />}
              actions={[
                <a href={`https://www.linkedin.com/in/${member.linkedin}`}>
                  <Icon type="linkedin" key="linkedin" />
                </a>,
                <a href={`https://www.twitter.com/${member.twitter}`}>
                  <Icon type="twitter" key="twitter" />
                </a>,
                <a href={`https://github.com/sampler36/${member.github}`}>
                  <Icon type="github" key="github" />
                </a>
              ]}
            >
              <Card.Meta description={member.title} />
            </Card>
          ))}
        </CardWrapper>
      </AboutSection>
    </>
  );
};

export default About;

const AboutSection = styled.div`
  margin: 5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  justify-content: center;
  align-items: center;

  h1 {
    font-family: "Viga", sans-serif;
  }

  @media screen and (max-width: 768px) {
    margin: 5rem 3rem;
  }
  @media screen and (max-width: 560px) {
    margin: 5rem 1rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .ant-card-head {
    background: #1890ff;
    color: #fff;
  }

  .ant-card-cover img {
    object-fit: cover;
    width: 100%;
    height: 298px;
  }

  .ant-card-body {
    margin-bottom: 2.5rem;
    text-align: center;
    background: rgb(0, 20, 41);
    z-index: 45;

    h3 {
      margin-top: 1rem;
    }

    .ant-card-meta-description {
      color: white;
    }
  }

  .ant-card-actions {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .ant-card-bordered {
    height: calc(100% - 1rem);
    margin-bottom: 1.5rem;
    position: relative;
    width: 300px;
    margin-right: 1rem;
    margin-left: 1rem;
  }

  @media screen and (max-width: 768px) {
    .ant-card-bordered {
      height: calc(100% - 1rem);
      width: 45vw;
      margin-bottom: 16px;
      position: relative;
    }
  }
  @media screen and (max-width: 560px) {
    .ant-card-bordered {
      height: calc(100% - 1rem);
      width: 70vw;
      margin-bottom: 16px;
      position: relative;
    }
  }
`;
