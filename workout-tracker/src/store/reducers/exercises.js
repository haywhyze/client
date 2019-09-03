import * as type from "../actions/exerciseActions";

const initialState = {
  exercises: null,
  copyOfExercises: null,
  singleExercise: null,
  currentMuscleGroup: null,
  postsPerPage: 10,
  pageNumbers: null
};

const exercises = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_EXERCISES:
      const changeRatingOfExercise = action.exercises.map(exercise => {
        if (exercise.exercise_ratings === "n/a") {
          exercise.exercise_ratings = "5.0";
        }
        return exercise;
      });

      const indexLastPost = state.postsPerPage;

      const indexFirstPost = indexLastPost - state.postsPerPage;

      const currentPosts = changeRatingOfExercise.slice(
        indexFirstPost,
        indexLastPost
      );

      const totalExercises = changeRatingOfExercise.length;

      let ButtonNumber = [];

      for (let i = 1; i <= Math.ceil(totalExercises / state.postsPerPage); i++) {
        ButtonNumber.push(i);
      }

      return {
        ...state,
        exercises: currentPosts,
        pageNumbers: ButtonNumber,
        copyOfExercises: changeRatingOfExercise
      };

    case type.SHOW_MUSCLE_GROUP:
      let searchResultForMuscleGroup = state.copyOfExercises.filter(
        exercise => exercise.muscle === action.muscleGroup
      );

      const indexOfLastPost = state.postsPerPage;

      const indexOfFirstPost = indexOfLastPost - state.postsPerPage;

      const currentExercises = searchResultForMuscleGroup.slice(
        indexOfFirstPost,
        indexOfLastPost
      );

      const totalPosts = searchResultForMuscleGroup.length;

      let pageNumbers = [];

      for (let i = 1; i <= Math.ceil(totalPosts / state.postsPerPage); i++) {
        pageNumbers.push(i);
      }

      return {
        ...state,
        exercises: currentExercises,
        pageNumbers: pageNumbers,
        currentMuscleGroup: action.muscleGroup
      };

    case type.PAGINATE:
      let searchForMuscleGroup = state.copyOfExercises.filter(
        exercise => exercise.muscle === state.currentMuscleGroup
      );

      const indexOfTheLastPost = action.num * state.postsPerPage;

      const indexOfTheFirstPost = indexOfTheLastPost - state.postsPerPage;

      const theCurrentExercises = searchForMuscleGroup.slice(
        indexOfTheFirstPost,
        indexOfTheLastPost
      );

      return { ...state, exercises: theCurrentExercises };

    case type.SHOW_SINGLE_EXERCISE:
      const filterExercise = state.exercises.filter(
        exercise => exercise.exercise_name === action.exerciseName
      );

      return { ...state, singleExercise: filterExercise };

      case type.CLOSE_SINGLE_EXERCISE:
  
        return { ...state, singleExercise: null };

    default:
      return state;
  }
};

export default exercises;
