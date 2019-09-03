import React from "react";
import AllExercises from "../../components/Exercises/AllExercises";
import SingleExercise from "../../components/Exercises/SingleExercise";
import { fetchExercises, showMuscleGroup, paginate, showSingleExercise, closeSingleExercise } from "../../store/actions/exerciseActions";
import { connect } from "react-redux";

class ExerciseLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.fetchExercises();
  }

  render() {
    if (this.props.singleExercise) {
      return (
        <SingleExercise 
        exercise={this.props.singleExercise[0]}
        closeExercise={this.props.closeSingleExercise} />
       )
    }
    return (
      <AllExercises
        exercises={this.props.exercises}
        showMuscleGroup={e => this.props.showMuscleGroup(e.target.textContent)}
        currentButtons={this.props.currentButtons}
        paginate={e => this.props.paginate(e.target.textContent)}
        showSingleExercise={(e) => this.props.showSingleExercise(e.target.textContent)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises.exercises,
    singleExercise: state.exercises.singleExercise,
    currentButtons: state.exercises.currentButtons,
  };
};

export default connect(
  mapStateToProps,
  { fetchExercises, showMuscleGroup, paginate, showSingleExercise, closeSingleExercise }
)(ExerciseLibrary);
