import React, { Component } from "react";
import DisplayExercise from "./DisplayExercise";
import FilterExercises from "./FilterExercises";
import SideBar from "./SideBar";
import SetsForm from "./SetsForm";
import {
  fetchExercises,
  addToSelectedExercises,
  filterMuscles,
  showSingleExercise,
  searchExercise
} from "../../store/actions/exerciseActions";
import { createWorkout } from "../../store/actions/workoutsActions";
import { Spin, Button, PageHeader } from "antd";
import { ReactHeight } from "react-height";
import { connect } from "react-redux";

class AllExercises extends Component {
  state = {
    topBarHeight: "",
    saveExercise: false
  };

  setTopBarHeight = height => {
    this.setState({
      topBarHeight: height
    });
  };

  componentDidMount() {
    this.props.fetchExercises();
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
          <div>
            <div style={topBar}>
              <ReactHeight
                onHeightReady={height => this.setTopBarHeight(height)}
              >
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
                )}
              </ReactHeight>
            </div>
            <div style={{ marginTop: this.state.topBarHeight + 15 }}>
              <SideBar
                marginTop={this.state.topBarHeight + 15}
                newWorkout={this.props.newWorkout}
                selectedExercises={this.props.selectedExercises}
                saveExercise={this.state.saveExercise}
              />
              <div
                style={{
                  padding: "2rem",
                  maxWidth: "75%",
                  fontSize: ".8rem",
                  marginLeft: "24%"
                }}
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
                  />
                )}
              </div>
            </div>
            <Button
              type="link"
              size="large"
              icon="close"
              style={floatingButtons}
              onClick={() => this.props.history.push("/workouts")}
            ></Button>
            {
              !this.state.saveExercise && <Button
              type="primary"
              size="large"
              icobn="check"
              style={{ ...floatingButtons, ...bottom }}
              onClick={() => this.setState({ saveExercise: true })}
            >
              Add sets to exercices
            </Button>
            } 
          </div>
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
    createWorkout
  }
)(AllExercises);

const floatingButtons = {
  position: "fixed",
  right: "2rem",
  top: "1rem",
  zIndex: 7
};

const bottom = {
  top: "unset",
  bottom: "1rem",
  left: "1rem",
  width: "calc(25% - 2rem)",
  boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, .15)"
};

const topBar = {
  padding: "1rem",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 5,
  background: "#fff",
  boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, .05)"
};
