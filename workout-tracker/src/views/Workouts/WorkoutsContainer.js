import React from "react";
import styled from "styled-components";
import { Row, Divider } from "antd";
import "antd/dist/antd.css";

import Workouts from "./Workouts";
import WorkoutPage from "../customWorkout/WorkoutPage";
import MyWorkouts from "./MyWorkouts/MyWorkouts";

class WorkoutContainer extends React.Component {
  render() {
    return (
      <StyledContainer>
        <WorkoutPage {...this.props} />
        <Row>
          <Divider orientation="left" dashed>
            My Workouts
          </Divider>
        </Row>
        <Row type="flex" gutter={16}>
          <MyWorkouts {...this.props} />
        </Row>
        <Row>
          <Divider orientation="left" dashed>
            All Workouts
          </Divider>
        </Row>
        <Row type="flex" gutter={16}>
          <Workouts />
        </Row>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding: 1.5rem 3rem;
  background: rgb(240, 242, 245);

  .ant-row-flex:first-child {
    background-color: transparent;
    padding: 0;
    justify-content: flex-end;
    box-shadow: none;
  }

  .ant-row-flex {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: white;
    padding: 30px;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .ant-card-meta-description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default WorkoutContainer;
