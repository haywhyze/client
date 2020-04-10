import * as type from "../actions/workoutsActions";

const initialState = {
  workouts: null,
  workoutId: null,
  allExercises: null,
  currentExercise: null,
  myWorkouts: null,
  newWorkout: null,
  loading: null,
  loadingWorkoutDetail: null,
  error: null,
  currentWorkout: null,
};

const workouts = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_WORKOUT_DETAILS:
      return {
        ...state,
        newWorkout: { ...action.payload, exercises: [] },
      };

    case type.CREATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.concat(action.payload),
        loading: false,
        error: null,
      };

    case type.LOADING_CREATE_WORKOUT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case type.CREATE_WORKOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case type.FETCH_WORKOUTS:
      return {
        ...state,
        loading: action.payload,
        error: "",
      };
    case type.FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        loading: false,
        workouts: action.payload,
        error: "",
      };
    case type.FETCH_WORKOUTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case type.FETCH_WORKOUT_DETAILS:
      return {
        ...state,
        loadingWorkoutDetail: action.payload,
        error: "",
      };

    case type.FETCH_WORKOUT_DETAILS_SUCCCESS:
      return {
        ...state,
        loadingWorkoutDetail: false,
        currentWorkout: action.payload,
        error: "",
      };

    case type.FETCH_WORKOUT_DETAILS_FAILURE:
      return {
        ...state,
        loadingWorkoutDetail: false,
        error: action.payload,
      };

    case type.CHOOSE_EXERCISE:
      const filterCurrentExercise = state.allExercises.filter(
        (exercise) => exercise.exercise_name === action.current_exercise
      );
      return {
        ...state,
        currentExercise: filterCurrentExercise,
      };

    case type.FINISH_EXERCISE:
      const deleteExerciseFromCurrent = state.currentExercise.filter(
        (exercise) => exercise.id !== action.exercise_id
      );

      const deleteExerciseAll = state.allExercises.filter(
        (exercise) => exercise.id !== action.exercise_id
      );

      return {
        ...state,
        allExercises: state.allExercises.length > 1 ? deleteExerciseAll : null,
        currentExercise:
          state.currentExercise.length > 1
            ? deleteExerciseFromCurrent
            : deleteExerciseAll[0]
            ? deleteExerciseAll.filter(
                (workout) =>
                  workout.exercise_name === deleteExerciseAll[0].exercise_name
              )
            : null,
      };

    case type.ADD_WORKOUT_SUCCESS:
      const checkIfEmpty = action.payload.length ? action.payload : null;

      return {
        ...state,
        savedWorkout: checkIfEmpty,
      };

    case type.ADD_WORKOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case type.GET_SAVED_WORKOUT:
      return {
        ...state,
        loading: true,
        error: null,
        myWorkouts: null,
      };

    case type.GET_SAVED_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        myWorkouts: action.payload,
      };

    case type.GET_SAVED_WORKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case type.DELETE_WORKOUT:
      const withoutDeletedWorkout = action.payload.length
        ? action.payload
        : null;

      return {
        ...state,
        savedWorkout: withoutDeletedWorkout,
      };

    default:
      return state;
  }
};

export default workouts;
