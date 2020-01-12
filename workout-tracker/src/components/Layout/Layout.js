import React from "react";
import { Layout } from "antd";
import Auth from "../../auth/auth";
import styled from "styled-components";

const { Header, Content, Sider, Footer } = Layout;

class MainLayout extends React.Component {
  render() {
    return (
      <StyledContainer>
        {!Auth.isAuthenticated() ? (
          <Header style={{ position: "fixed", zIndex: 10, width: "100%" }}>
            {this.props.header}
          </Header>
        ) : (
          ""
        )}
        {this.props.mobileNav}
        <div className="content-container">
          {Auth.isAuthenticated()
            ? this.props.location.pathname !==
                "/workouts/new/add_exercises" && (
                <Sider breakpoint="lg" collapsedWidth="0">
                  {this.props.sider}
                </Sider>
              )
            : ""}
          <Content>
            {this.props.routes}
            {this.props.location.pathname === "/workouts/new/add_exercises" ||
            this.props.location.pathname === "/login" ||
            this.props.location.pathname === "/signup" ||
            this.props.location.pathname === "/" ||
            this.props.location.pathname === "/about" ? (
              ""
            ) : (
              <Footer>
                <FooterContent
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <h4>Our statement</h4>
                    <p>
                      If you can make it that far,<br></br> what's stopping you
                      from one more mile or one more set of reps?
                    </p>
                  </div>
                  <div className="team-wrapper">
                    <h4 style={{ textAlign: "center" }}>The team behind</h4>
                    <div className="team">
                      <div className="team-right">
                        <a href="https://github.com/benjamingrabow ">
                          Benjamin Grabow FS
                        </a>
                        <a href="https://github.com/hyetigran">
                          Tigran Asriyan FS
                        </a>
                        <a href="https://github.com/Becheru888">
                          Remi Becheru FS
                        </a>
                        <a>Matt Locklin FS</a>
                      </div>
                      <div className="team-left">
                        <a>Yusuf Abdulkarim FS</a>
                        <a>Kelechi Ogbonna FS</a>
                        <a>Talent Antonio FS</a>
                        <a>Wasiu Idowu FS</a>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      TEAM LEADER <a>Shaun Carmody</a>
                    </div>
                  </div>
                </FooterContent>
                <Copy>
                  <p>
                    <span>© Copyright {new Date().getFullYear()}</span>
                    <br></br>
                    All rights reserved. Powered by <a href="#!">BeFit</a>
                  </p>
                </Copy>
              </Footer>
            )}
          </Content>
        </div>
      </StyledContainer>
    );
  }
}

const Copy = styled.div`
  p {
    position: relative;
    bottom: 20px;
    text-align: center;
    padding: 0;
  }
`;

const FooterContent = styled.div`
  .team {
    display: flex;
    font-size: 1rem;
  }
  .team-right {
    width: 150px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .team-left {
    width: 150px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid gray;
    text-align: right;
  }

  p {
    padding: 0px;
  }
`;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;

  .content-container {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .ant-layout-header {
    @media screen and (max-width: 800px) {
      padding: 0 2rem;
    }
    @media screen and (max-width: 500px) {
      padding: 0 1rem;
    }
  }

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }

  .ant-layout-content {
    min-height: 100vh;
    min-width: 0;
    overflow: auto;
  }

  .ant-layout-sider {
    position: absolute;
    z-index: 1000;
    background: #0086c9;
    min-height: 100vh;
  }

  .nav-items {
    padding: 2rem 0.5rem;
  }

  @media (min-width: 992px) {
    .ant-layout-sider {
      padding: 0.5rem;
      overflow: auto;
      position: relative;
    }
  }
`;
export default MainLayout;
