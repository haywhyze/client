import * as type from "../actions/exerciseActions";

const initialState = {
  exercises: null,
  copyOfExercises: null,
  singleExercise: null,
  currentMuscleGroup: null,
  exercisesPerPage: 5, 
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
      const filterOnlyGroupChest = changeRatingOfExercise.filter(
        exercise => exercise.muscle === "Chest"
      );

      const indexFirstExercise = 1;
      const indexLastExercise = state.exercisesPerPage;

      const currentExercises = filterOnlyGroupChest.slice(
        indexFirstExercise,
        indexLastExercise
      );
     
      return {
        ...state,
        exercises: currentExercises,
        copyOfExercises: changeRatingOfExercise,
        currentMuscleGroup: "Chest"
      };

    case type.SHOW_MUSCLE_GROUP:
      let searchResultForMuscleGroup = state.copyOfExercises.filter(
        exercise => exercise.muscle === action.muscleGroup
      );
      const indexOfFirstExercise = 1;
      const indexOfLastExercise = 5;
     
      const theCurrentExercises = searchResultForMuscleGroup.slice(
        indexOfFirstExercise,
        indexOfLastExercise
      );
     
      return {
        ...state,
        exercises: theCurrentExercises,
        currentMuscleGroup: action.muscleGroup,
        exercisesPerPage: indexOfLastExercise
      };

      case type.LOAD_MORE:
          let searchMuscleGroup = state.copyOfExercises.filter(
            exercise => exercise.muscle === state.currentMuscleGroup
          );
          const indexOfTheFirstExercise = 1;
          const indexOfTheLastExercise = state.exercisesPerPage + state.exercisesPerPage;
         
          if(indexOfTheLastExercise > searchMuscleGroup.length) {
            indexOfTheLastExercise = searchMuscleGroup.length;
          }

          const actualExercises = searchMuscleGroup.slice(
            indexOfTheFirstExercise,
            indexOfTheLastExercise
          );

          return { ...state, exercises: actualExercises, exercisesPerPage: indexOfTheLastExercise  };
         

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
