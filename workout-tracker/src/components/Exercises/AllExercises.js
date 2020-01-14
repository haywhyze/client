import React, { Component } from "react";
import DisplayExercise from "../../views/customWorkout/DisplayExercise";
import FilterExercises from "../../views/customWorkout/FilterExercises";
import SetsForm from "../../views/customWorkout/SetsForm";
import {
  fetchExercises,
  addToSelectedExercises,
  filterMuscles,
  showSingleExercise,
  searchExercise
} from "../../store/actions/exerciseActions";
import { createWorkout } from "../../store/actions/workoutsActions";
import { Spin, PageHeader, AutoComplete, Input, Icon } from "antd";
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
          <div>
            <div style={topBar}>
              <ReactHeight
                onHeightReady={height => this.setTopBarHeight(height)}
              >
                {!this.state.saveExercise ? (
                  <><FilterExercises
                    {...this.props}
                    filterMuscles={this.filterMuscles}
                  />
                  <AutoComplete
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
                  </AutoComplete></>
                ) : (
                  <PageHeader
                    onBack={() => this.setState({ saveExercise: false })}
                    title="Add Sets"
                    subTitle="Add reps, weights, duration to each set of exercise"
                  />
                )}
              </ReactHeight>
            </div>
            <div style={{ marginTop: this.state.topBarHeight + 15, padding: '3rem' }}>
              {!this.state.saveExercise ? (
                <DisplayExercise
                  showSingleExercise={this.props.showSingleExercise}
                  addExercise={this.props.addToSelectedExercises}
                  dataSource={this.props.exercises}
                  singleExercise={this.props.singleExercise}
                  location={this.props.location}
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

const topBar = {
  padding: "1rem",
  position: "fixed",
  top: 0,
  width: "100%",
  textAlign: 'center',
  zIndex: 5,
  background: "#fff",
  boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, .05)"
};
