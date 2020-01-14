import React, { Component } from "react";
import DisplayExercise from "./DisplayExercise";
import FilterExercises from "./FilterExercises";
import SideBar from "./SideBar";
import SetsForm from "./SetsForm";
import SelectedExercises from "./SelectedExercises";
import {
  fetchExercises,
  addToSelectedExercises,
  filterMuscles,
  showSingleExercise,
  searchExercise,
  removeFromSelectedExercises
} from "../../store/actions/exerciseActions";
import { createWorkout } from "../../store/actions/workoutsActions";
import { Spin, Button, PageHeader, Icon, Badge, Modal, AutoComplete, Input } from "antd";
import { ReactHeight } from "react-height";
import { connect } from "react-redux";
import styled from "styled-components";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1394475_0d6q9r1xk5c.js',
});

const { confirm } = Modal;

function showConfirm(history) {
  confirm({
    title: 'Are you sure you want to exit this page?',
    content: 'When you click on exit, you will lose all selected exercises and sets',
    okText: 'Exit',
    onOk() {
      window.localStorage.removeItem('state');
      return history.push("/workouts")
    },
    onCancel() {},
  });
}
class AllExercises extends Component {
  state = {
    topBarHeight: "",
    saveExercise: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
      saveExercise: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  showFilters = () => {
    this.setState({
      visibleFilter: true,
    });
  };

  handleFilterOk = e => {
    this.setState({
      visibleFilter: false,
    });
  };

  handleFilterCancel = e => {
    this.setState({
      visibleFilter: false,
    });
  };

  setTopBarHeight = height => {
    this.setState({
      topBarHeight: height
    });
  };

  componentDidMount() {
    if (!this.props.exercises) this.props.fetchExercises();
  }

  render() {
    return this.props.loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Spin tip="Loading Exercices..." size="large" />
      </div>
    ) : (
      <>
        {this.props.exercises && (
          <StyledContainer>
            <div style={topBar}>
            
              <ReactHeight
                onHeightReady={height => this.setTopBarHeight(height)}
              >
                <div className="mobile-menu">
                {this.state.saveExercise && <PageHeader
                  onBack={() => this.setState({ saveExercise: false })}
                  title="Add Sets"
                />}
                <Button type="link" onClick={this.showModal}><Badge style={{ marginRight: "1rem" }} count={this.props.selectedExercises.length}>
                  <IconFont style={{ fontSize: "2rem", marginRight: "1rem" }} type="icon-musclewhitebig-copy" />
               </Badge></Button>
               {!this.state.saveExercise && 
                <Button type="link" onClick={this.showFilters}> 
                  <Icon style={{ fontSize: "2rem", marginLeft: "1rem" }} type="filter" />
                </Button>}</div>
                {!this.state.saveExercise && <AutoComplete
                  dataSource={[...new Set(this.props.exercises)].map(e => (
                    <AutoComplete.Option key={e.exercise_name} text={e.exercise_name}>
                      {e.exercise_name}
                    </AutoComplete.Option>
                  ))}
                  style={{ width: 300, margin: "1rem auto" }}
                  onChange={exercise_name => {this.props.searchExercise(exercise_name)}}
                  optionLabelProp="text"
                >
                  <Input
                    suffix={<Icon type="search" className="certain-category-icon" />}
                    placeholder="Search Exercises"
                  />
                </AutoComplete>}
                
                <div className="top-bar">
                {!this.state.saveExercise ? (
                  <FilterExercises
                    {...this.props}
                    filterMuscles={this.filterMuscles}
                  />
                ) : (
                  <PageHeader
                    onBack={() => this.setState({ saveExercise: false })}
                    title="Add Sets"
                    subTitle="Add reps, weights, duration to each set of exercise"
                  />
                )}</div>
                
              </ReactHeight>
            </div>
            <div style={{ marginTop: this.state.topBarHeight + 15,  padding: '3rem 1rem' }}>
              <div className="side-bar">
              <SideBar
                marginTop={this.state.topBarHeight + 15}
                newWorkout={this.props.newWorkout}
                selectedExercises={this.props.selectedExercises}
                saveExercise={this.state.saveExercise}
              /></div>
              <div
                className="display-exercises"
              >
                {!this.state.saveExercise ? (
                  <DisplayExercise
                    showSingleExercise={this.props.showSingleExercise}
                    addExercise={this.props.addToSelectedExercises}
                    dataSource={this.props.exercises}
                    singleExercise={this.props.singleExercise}
                  />
                ) : (
                  <SetsForm
                    exercises={this.props.selectedExercises}
                    workouts={this.props.workouts}
                    newWorkout={this.props.newWorkout}
                    createWorkout={this.props.createWorkout}
                    loading={this.props.loadingWorkouts}
                    history={this.props.history}
                    error={this.props.errorWorkouts}
                  />
                )}
              </div>
            </div>
            <Button
              type="link"
              size="large"
              icon="close"
              className="fixed-button"
              onClick={() => showConfirm(this.props.history)}
            ></Button>
            {
              !this.state.saveExercise && <Button
              type="primary"
              size="large"
              icon="check"
              disabled={!this.props.selectedExercises.length}
              className="fixed-button save-button"
              onClick={() => this.setState({ saveExercise: true })}
            >
              Add sets to exercices
            </Button>
            }
            <Modal
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                !this.state.saveExercise && <Button 
                  key="submit" 
                  disabled={!this.props.selectedExercises.length}
                  type="primary"
                  size="large"
                  onClick={this.handleOk}>
                  Add Sets to Exercices
                </Button>,
              ]}
            >
              <SelectedExercises
                remove={this.props.removeFromSelectedExercises}
                exercises={this.props.selectedExercises}
                saveExercise={this.state.saveExercise}
              />
            </Modal>
            <Modal
              visible={this.state.visibleFilter}
              onOk={this.handleFilterOk}
              onCancel={this.handleFilterCancel}
            >
              <FilterExercises
                    {...this.props}
                    filterMuscles={this.filterMuscles}
                  />
            </Modal>
          </StyledContainer>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    exercises: state.exercises.remainingExercises,
    loading: state.exercises.loading,
    newWorkout: state.workouts.newWorkout,
    error: state.exercises.error,
    selectedExercises: state.exercises.selectedExercises,
    singleExercise: state.exercises.singleExercise,
    workouts: state.workouts.workouts,
    loadingWorkouts: state.workouts.loading,
    errorWorkouts: state.workouts.error
  };
}

export default connect(
  mapStateToProps,
  {
    fetchExercises,
    searchExercise,
    addToSelectedExercises,
    filterMuscles,
    showSingleExercise,
    createWorkout,
    removeFromSelectedExercises
  }
)(AllExercises);

const topBar = {
  padding: "1rem",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 5,
  background: "#fff",
  boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, .05)"
};

const StyledContainer = styled.div`
  text-align: center;

  .fixed-button {
    position: fixed;
    right: 2rem;
    top: 1rem;
    z-index: 7;
  }

  .display-exercises {
    padding: 2rem;
    max-width: 75%;
    font-size: .8rem;
    margin-left: 24%;
  }

  .save-button {
    top: unset;
    bottom: 1rem;
    left: 1rem;
    width: calc(25% - 2rem);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, .15);
  }

  @media screen and (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    .top-bar, .side-bar, .save-button {
      display: none;
    }

    .display-exercises {
      padding: 1rem;
      max-width: 100%;
      font-size: .7rem;
      margin-left: 0;
    }
  }
`