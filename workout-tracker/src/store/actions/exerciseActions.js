import axios from 'axios';

export const FETCH_EXERCISES = 'FETCH_EXERCISES';
export const SHOW_MUSCLE_GROUP = 'SHOW_MUSCLE_GROUP';
export const SHOW_SINGLE_EXERCISE = 'SHOW_SINGLE_EXERCISE';
export const CLOSE_SINGLE_EXERCISE = 'CLOSE_SINGLE_EXERCISE';
export const GO_BACK = 'GO_BACK';
export const GO_FORWARD = 'GO_FORWARD';


const exercises = `${process.env.REACT_APP_BASE_URL}/exercises`;
// adress get's changed later

export const fetchExercises = () => dispatch => {
  // type LOADING needs to be added (also for the redux state) 
  return axios.get(exercises)
    .then(res => {
      dispatch({ type: FETCH_EXERCISES, exercises: res.data });
    })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
    });
};

export const showMuscleGroup = (muscleGroup) => {
  return { type: SHOW_MUSCLE_GROUP, muscleGroup: muscleGroup };   
};

export const showSingleExercise = (exerciseName) => {
  return { type: SHOW_SINGLE_EXERCISE, exerciseName: exerciseName }; 
};

export const closeSingleExercise = () => {
  return { type: CLOSE_SINGLE_EXERCISE}; 
};

export const goForward = () => {
  return { type: GO_FORWARD}; 
};

export const goBack = () => {
  return { type: GO_BACK}; 
};