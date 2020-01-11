import React from "react";
import styled from "styled-components";
import run from "../../assets/landingpage/diet3.gif";
import logo from "../../assets/images/beFit-logo.png";
import lift from "../../assets/landingpage/haha.gif";
import { Link } from "react-router-dom";
import { Row, Col, Card, Carousel, Button } from "antd";
import Text from "antd/lib/typography/Text";

const LandingPage = () => {
  // use a hook for fetch stuffmaybe videos from our API
  return (
    <Row
      style={{ minHeight: "calc(100vh - 5rem)", margin: "0 5rem" }}
      type="flex"
      justify="space-around"
      align="middle"
      gutter={16}
    >
      <Col span={10}>
        <StyledCol>
          <StyledHeading1>
            <img alt="befit logo" src={logo} />
            BeFit
          </StyledHeading1>
          <Text>
            Join thousands of people just like you who are planning, creating
            and tracking their workuts with beFit.
          </Text>
          <div>
            <Link to="/signup">
              <Button type="primary" size="large">
                Get Started
              </Button>
            </Link>
          </div>
        </StyledCol>
      </Col>
      <Col type="flex" justify="space-around" align="middle" span={10}>
        <Carousel autoplay autoplaySpeed={5000}>
          <Card
            hoverable
            bordered={false}
            cover={<img src={run} alt="profile" />}
          >
            <Card.Meta
              title={<h2>User Structured</h2>}
              description="Choose from hundreds of curated exercises to Create custom workouts
            specifically tailored to your needs."
            />
          </Card>
          <Card
            hoverable
            bordered={false}
            cover={<img src={lift} alt="profile" />}
          >
            <Card.Meta
              title={<h2>Keep Track of Progress</h2>}
              description="By keeping track of your progress, you can push yourself to do more each passing day"
            />
          </Card>
        </Carousel>
      </Col>
    </Row>
  );
};
export default LandingPage;

const StyledHeading1 = styled.h1`
  display: flex;
  font-size: 4rem;
  color: #1890ff;
  font-family: "Viga", sans-serif;

  img {
    width: 6rem;
    margin-right: 1rem;
  }
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .ant-typography {
    font-size: 1.1rem;
    margin: -0.5rem 0 1rem 0;
  }
`;
