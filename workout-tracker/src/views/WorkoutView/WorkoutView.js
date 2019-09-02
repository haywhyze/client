import React from "react";
import Watch from "../../components/Watch/Watch";
import { connect } from "react-redux";
import { fetchWorkoutDetails } from "../../store/actions/workoutsActions";
import styled from "styled-components";

const StyledWorkoutView = styled.div`
  font-size: 1rem;
`;

class WorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExercise: null,
      set: "",
      reps: "",
      time: "", 
      weight: ""
    };
  }

  componentDidMount = () => {
    this.props.fetchWorkoutDetails();
  };

  chooseExercise = e => {
    const filterCurrentExercise = [this.props.workoutDetails][0].exercises.filter(
    exercise => exercise.exercise_name === e.target.textContent
    );

    this.setState({
      currentExercise: filterCurrentExercise,
    });
  };

  render() {
    return (
      <StyledWorkoutView>
        {this.state.currentExercise ? (
          <div>
            <div className="exercise-picture">
            <img src={this.state.currentExercise[0].picture_one} alt="Exercise explanation"/>
            </div>
            <div>
              <div className="row">
              <p>Set</p>
              <input type="number" value={this.state.set} onChange={this.handleChange} placeholder={} name="set"/> 
              </div>
              <div className="row">
              <p>Reps</p>
              <input type="number" value={this.state.reps} onChange={this.handleChange} placeholder={} name="reps"/> 
              </div>
              <div className="row">
              <p>Time</p>
              <input type="number" value={this.state.time} onChange={this.handleChange} placeholder={} name="time"/> 
              </div>
              <div className="row">
              <p>Weight</p>
              <input type="number" value={this.state.weight} onChange={this.handleChange} placeholder={} name="weight"/> 
              </div>
            </div>
          </div>
        ) : null}
        <Watch />

        <p>Choose exercise:</p>
        {/* Display Exercises(but without duplicates) */}
        {this.props.workoutDetails
          ? this.props.workoutDetails.exercises
              .reduce((acc, current) => {
                const x = acc.find(
                  item => item.exercise_name === current.exercise_name
                );
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, [])
              .map((exercise, index) => {
                return (
                  <div key={index}>
                    <p onClick={this.chooseExercise}>
                      {exercise.exercise_name}
                    </p>
                  </div>
                );
              })
          : null}
      </StyledWorkoutView>
    );
  }
}

const mapStateToProps = state => {
  return {
    workoutDetails: state.workouts.workoutDetails
  };
};

export default connect(
  mapStateToProps,
  { fetchWorkoutDetails }
)(WorkoutView);
