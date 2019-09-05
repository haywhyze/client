import { axiosWithAuth } from '../axiosWithAuth';
// import axiosWithAuth from 'axios';

// actions
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';
export const FETCH_WORKOUT_DETAILS = 'FETCH_WORKOUT_DETAILS';
export const START_WORKOUT = 'START_WORKOUT';
export const CHOOSE_EXERCISE = 'CHOOSE_EXERCISE';
export const FINISH_EXERCISE = 'FINISH_EXERCISE';
export const END_WORKOUT = 'END_WORKOUT';
export const ADD_WORKOUT = 'ADD_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

const workouts = `${process.env.REACT_APP_BASE_URL}/workouts`;

// action dispatcher
export const fetchWorkouts = () => dispatch => {

  // type LOADING needs to be added (also for the redux state) 
  axiosWithAuth().get(workouts)
    .then(res => {
     
      dispatch({ type: FETCH_WORKOUTS, workouts: res.data });
    })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
    });
};

export const fetchWorkoutDetails = (workout_id) => dispatch => {
  // type LOADING needs to be added (also for the redux state) 
  
  axiosWithAuth().get(`${workouts}/${workout_id}`)
    .then(res => {
      dispatch({ type: FETCH_WORKOUT_DETAILS, workoutDetails: res.data.data, workout_id: workout_id });
    
      return axiosWithAuth().post(`${workouts}/${workout_id}/start`)
      .then(res => {
        dispatch({ type: START_WORKOUT });
      });
    })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
    });
};

export const chooseExercise = (exercise_name) => {  
    return{ type: CHOOSE_EXERCISE, current_exercise: exercise_name };
};

export const finishExercise = (exercise_id) => {  
  return{ type: FINISH_EXERCISE, exercise_id: exercise_id };
};

export const endWorkout = (workout_id) => dispatch => {
  // type LOADING needs to be added (also for the redux state) 

      return axiosWithAuth().post(`${workouts}/${workout_id}/end`)
      .then(res => {
        dispatch({ type: END_WORKOUT });
      })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
    });
};

export const addWorkout = (workout_id) => {
 return { type: ADD_WORKOUT, workout_id: workout_id };
};