import React from "react";
// import Watch from "../../components/Watch/Watch";
import { connect } from "react-redux";
import {
  PageHeader,
  Statistic,
  Row,
  Col,
  Card,
  Icon,
  Button,
  Modal,
  Carousel,
  Spin,
  Alert,
  Tabs,
} from "antd";
import {
  chooseExercise,
  finishExercise,
  endWorkout,
} from "../../../store/actions/workoutsActions";
import styled from "styled-components";

const { TabPane } = Tabs;

const StyledWorkoutSession = styled.div`
  /* font-size: .8rem; */
  line-height: 1;
  .top {
    display: flex;
  }
  .exercise-picture {
    width: 50%;
  }
  .text {
    width: 50%;
  }
  .picture-text {
    display: flex;
    width: 66%;
  }
  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }
  .exercise {
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    .carousel {
      display: none;
    }
  }
  @media only screen and (min-width: 768px) {
    .cover {
      display: none;
    }
  }
`;

class WorkoutSession extends React.Component {
  componentDidMount = () => {
    // const startButton = document.querySelector(".btn-start");
    // startButton.click();
  };

  endWorkout = () => {
    this.props.endWorkout(this.props.workoutId);
  };

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  componentWillUnmount() {
    this.setState({ initial: 0 });
  }

  endWorkout = () => {
    this.props.endWorkout(this.props.workoutId, this.props.history);
  };
  render() {
    if (this.props.loading) {
      return (
        <div style={{ marginTop: 70, textAlign: "center" }}>
          <Spin tip="Loading Session..." size="large" />
        </div>
      );
    }
    let mergedExercises =
      this.props.allExercises &&
      this.props.allExercises.reduce((acc, current) => {
        const x = acc.find(
          (item) => item.exercise_name === current.exercise_name
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

    if (mergedExercises) {
      const currentPosition = mergedExercises.findIndex(
        (item) =>
          item.exercise_name === this.props.currentExercise[0].exercise_name
      );

      console.log(currentPosition);

      if (currentPosition !== 0) {
        mergedExercises.unshift(this.props.currentExercise[0]);
        mergedExercises.splice(currentPosition + 1, 1);
      }

      console.log(mergedExercises);
    }
    return (
      this.props.currentWorkout && (
        <StyledWorkoutSession>
          <Row type="flex">
            <PageHeader
              onBack={() => window.history.back()}
              title={this.props.currentWorkout.workout_name}
            />
            {/* <Watch /> */}
          </Row>

          {this.props.currentExercise ? (
            <>
              <Tabs
                tabPosition="top"
                type="card"
                onTabClick={(key) => this.props.chooseExercise(key)}
              >
                {mergedExercises.map((i) => (
                  <TabPane tab={`${i.exercise_name}`} key={i.exercise_name}>
                    <Row type="flex" gutter={24} justify="center" align="top">
                      <Col md={10}>
                        <Card
                          cover={
                            <>
                              <div className="carousel">
                                <Carousel
                                  dots={false}
                                  effect="fade"
                                  autoplay
                                  easing="linear"
                                  autoplaySpeed={1000}
                                >
                                  <div>
                                    <img
                                      alt="Exercise explanation"
                                      src={
                                        this.props.currentExercise[0]
                                          .picture_one
                                      }
                                    />
                                  </div>
                                  <div>
                                    <img
                                      alt="Exercise explanation"
                                      src={
                                        this.props.currentExercise[0]
                                          .picture_two
                                      }
                                    />
                                  </div>
                                </Carousel>
                              </div>
                              <div className="cover">
                                <img
                                  alt="Exercise explanation"
                                  src={
                                    this.props.currentExercise[0].picture_one
                                  }
                                />
                              </div>
                            </>
                          }
                          title={this.props.currentExercise[0].exercise_name}
                          actions={[
                            <Statistic
                              title="Sets to complete"
                              prefix={<Icon type="unordered-list" />}
                              style={{ cursor: "default" }}
                              value={this.props.currentExercise.length}
                            />,
                            <Statistic
                              title={
                                this.props.currentExercise[0].reps ||
                                this.props.currentExercise[0].reps === 0
                                  ? "Repetitions"
                                  : "Duration"
                              }
                              prefix={
                                !this.props.currentExercise[0].reps ? "" : (
                                  <Icon type="sync" spin />
                                )
                              }
                              value={
                                this.props.currentExercise[0].reps === 0 ? "till tired" :
                                this.props.currentExercise[0].reps ||
                                this.props.currentExercise[0].duration
                              }
                              style={{ cursor: "default" }}
                            />,
                            <Statistic
                              title="Next Exercise"
                              prefix={
                                <Icon
                                  onClick={() =>
                                    this.props.finishExercise(
                                      this.props.currentExercise[0].id
                                    )
                                  }
                                  type="double-right"
                                />
                              }
                              style={{ cursor: "default" }}
                              value=" "
                            />,
                          ]}
                        >
                          <Card.Meta
                            description={`Equipment Needed: ${this.props.currentExercise[0].equipment}`}
                          />
                        </Card>
                      </Col>
                      <Col md={10}>
                        <Card bordered={false} style={{ lineHeight: 1.2 }}>
                          <Alert
                            message="Instructions"
                            description={
                              this.props.currentExercise[0].description
                            }
                            type="info"
                          />
                          <div
                            style={{
                              margin: "1rem",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button type="primary" onClick={this.showModal}>
                              Video Instruction
                            </Button>
                          </div>
                          {/* {`${this.state.initial} ==> ${this.props.currentExercise.length} ===> ${this.props.allExercises.length}`} */}
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                ))}
              </Tabs>

              <Row type="flex" gutter={24} justify="center" align="top">
                <Col md={7}>
                  {this.props.allExercises ? (
                    <div></div>
                  ) : (
                    <p className="button" onClick={this.endWorkout}>
                      Finish Workout
                    </p>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            <Button type="primary" onClick={this.endWorkout}>
              End Workout
            </Button>
          )}
          {this.props.currentExercise ? (
            <Modal
              title={this.props.currentExercise[0].exercise_name}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onOk={this.handleOk}
            >
              {this.state.visible && (
                <video width="100%" height="auto" autoPlay controls>
                  <source
                    src={this.props.currentExercise[0].video}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </Modal>
          ) : null}
        </StyledWorkoutSession>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allExercises: state.workouts.allExercises,
    currentExercise: state.workouts.currentExercise,
    workoutId: state.workouts.workoutId,
    currentWorkout: state.workouts.currentWorkout,
    loading: state.workouts.loadingWorkoutDetail,
    error: state.workouts.error,
  };
};

export default connect(mapStateToProps, {
  chooseExercise,
  finishExercise,
  endWorkout,
})(WorkoutSession);
