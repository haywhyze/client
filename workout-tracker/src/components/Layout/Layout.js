import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
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
            {this.props.location.pathname === "/login" ||
            this.props.location.pathname === "/signup" ||
            this.props.location.pathname === "/" ||
            this.props.location.pathname === "/about" ? (
              <Footer>
                <Copy>
                  <p>
                    <span>© Copyright {new Date().getFullYear()}</span>
                    <br></br>
                    Designed and built with ❤️ by the
                     <Link to="/about"> team</Link>. 
                     <br/>Code licensed{" "}
                    <a href="https://github.com/haywhyze/client/blob/master/LICENSE">
                      MIT
                    </a>
                  </p>
                </Copy>
              </Footer>
            ) : (
              ""
            )}
          </Content>
        </div>
      </StyledContainer>
    );
  }
}

const Copy = styled.div`
  p {
    text-align: center;
  }
`;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;

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
    z-index: 11;
    /* background: #0086c9; */
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
