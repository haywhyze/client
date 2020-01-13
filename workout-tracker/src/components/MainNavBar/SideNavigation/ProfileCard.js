import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

import { fetchSettings } from "../../../store/actions/settingActions";
import { fetchWorkoutsHistory } from "../../../store/actions/historyActions";

class ProfileCard extends React.Component {
  componentDidMount = () => {
    this.props.fetchSettings();
    this.props.fetchWorkoutsHistory();
  };
  render() {
    return (
      <StyledImage>
        <div>
          <Link to="/dashboard">
            <Avatar size={64} icon="user" />
            <p>
              {this.props.settings &&
                "Welcome, " + this.props.settings[0].username}
            </p>
          </Link>
        </div>
        <section>
          <span>
            {this.props.history
              ? `You have completed a total of ${this.props.history.length} workouts`
              : "No workout completeted yet"}
          </span>
        </section>
      </StyledImage>
    );
  }
}

const StyledImage = styled.div`
  margin-top: 1rem;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  p {
    color: white;
    font-size: inherit;
    font-weight: 600;
    margin-bottom: 0;
  }
  section {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    background-color: inherit;
    color: white;
    span {
      height: auto;
      width: auto;
    }
  }

  .ant-avatar {
    color: #fff;
    background: transparent;
    width: 72px;
    height: 72px;
    border-radius: 30%;
  }
`;
const mapStateToProps = state => {
  return {
    settings: state.settings.settings,
    history: state.history.history
  };
};

export default connect(mapStateToProps, {
  fetchSettings,
  fetchWorkoutsHistory
})(ProfileCard);
