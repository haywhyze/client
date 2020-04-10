import React from "react";
import { Link } from "react-router-dom";
import { Spin, Modal, Card, Col, Icon, List, Tooltip } from "antd";

const { Meta } = Card;

class WorkoutCard extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.props.fetchDetails(this.props.id);
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Col>
          <Card
            cover={
              <img
                alt="cover"
                src={this.props.image}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
              />
            }
            title={this.props.name}
            actions={[
              <Tooltip placement="bottom" title="Start Workout">
                <Link onClick={this.props.startWorkout} to="/Workout_session">
                  <Icon
                    style={{ fontSize: "16px" }}
                    type="play-circle"
                    key="play"
                  />
                </Link>
              </Tooltip>,
              !this.props.myWorkout ? (
                <Tooltip placement="bottom" title="Add to My Workouts">
                  <Icon type="plus-circle" onClick={this.props.addWorkout} />
                </Tooltip>
              ) : (
                <Tooltip placement="bottom" title="Remove from My workouts">
                  <Icon
                    type="minus-circle"
                    onClick={this.props.deleteWorkout}
                  />
                </Tooltip>
              ),
              <Tooltip placement="bottom" title="More info">
                <Icon type="info-circle" onClick={this.showModal} />
              </Tooltip>,
            ]}
          >
            <Meta description={this.props.description} />
          </Card>
        </Col>
        <Modal
          title={this.props.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <h4>Description: </h4>
            <p>{this.props.description}</p>
          </div>
          <div>
            {this.props.loading ? (
              <div style={{ textAlign: "center" }}>
                <Spin tip="Loading Exercices..." size="large" />
              </div>
            ) : (
              this.props.currentWorkout &&
              this.props.currentWorkout.exercises && (
                <div>
                  <List
                    size="small"
                    header={<h3>Exercises</h3>}
                    bordered
                    dataSource={this.props.currentWorkout.exercises}
                    renderItem={(item) => (
                      <List.Item>{item.exercise_name}</List.Item>
                    )}
                  />
                </div>
              )
            )}
          </div>
        </Modal>
      </>
    );
  }
}
export default WorkoutCard;
