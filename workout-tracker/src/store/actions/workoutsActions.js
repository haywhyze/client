import axios from 'axios';

// actions
export const FETCH_WORKOUTS = 'FETCH_WORKOUTS';


const workouts = `${process.env.REACT_APP_BASE_URL}/workouts`;

// action dispatcher
export const fetchWorkouts = () => dispatch => {
  // type LOADING needs to be added (also for the redux state) 
  return axios.get(workouts)
    .then(res => {
      dispatch({ type: FETCH_WORKOUTS, workouts: res.data });
    })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
    });
};

export const fetchWorkoutDetails = () => dispatch => {
  // type LOADING needs to be added (also for the redux state) 
  return axios.get(`${workouts}/workouts/1`)
    .then(res => {
      debugger
      dispatch({ type: FETCH_WORKOUTS, workoutD: res.data });
    })
    .catch(err => {
   // type ERROR needs to be added (also for the redux state)
   debugger
    });
};