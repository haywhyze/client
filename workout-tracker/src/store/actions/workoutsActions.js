import { axiosWithAuth } from "../axiosWithAuth";
// import axiosWithAuth from 'axios';
// actions
export const FETCH_WORKOUTS = "FETCH_WORKOUTS";
export const FETCH_WORKOUT_DETAILS = "FETCH_WORKOUT_DETAILS";
export const FETCH_WORKOUT_DETAILS_SUCCCESS = "FETCH_WORKOUT_DETAILS_SUCCCESS";
export const FETCH_WORKOUT_DETAILS_FAILURE = "FETCH_WORKOUT_DETAILS_FAILURE";
export const START_WORKOUT = "START_WORKOUT";
export const CHOOSE_EXERCISE = "CHOOSE_EXERCISE";
export const FINISH_EXERCISE = "FINISH_EXERCISE";
export const END_WORKOUT = "END_WORKOUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";
export const CREATE_WORKOUT = "CREATE_WORKOUT";
export const LOADING_CREATE_WORKOUT = "LOADING_CREATE_WORKOUT";
export const CREATE_WORKOUT_ERROR = "CREATE_WORKOUT_ERROR";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const ADD_WORKOUT_DETAILS = "ADD_WORKOUT_DETAILS";
export const ADD_WORKOUT_SUCCESS = "ADD_WORKOUT_SUCCESS";
export const ADD_WORKOUT_FAILURE = "ADD_WORKOUT_FAILURE";
export const GET_SAVED_WORKOUT = "GET_SAVED_WORKOUT";
export const GET_SAVED_WORKOUT_SUCCESS = "GET_SAVED_WORKOUT_SUCCESS";
export const GET_SAVED_WORKOUT_FAILURE = "GET_SAVED_WORKOUT_FAILURE";

const workouts = `${process.env.REACT_APP_BASE_URL}/workouts`;

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const addWorkoutDetails = workoutDetails => {
  return { type: ADD_WORKOUT_DETAILS, payload: workoutDetails };
};

export const createWorkout = (fullWorkoutDetails, history) => dispatch => {
  dispatch({
    type: LOADING_CREATE_WORKOUT,
    payload: true
  });
  axiosWithAuth()
    .post(workouts, fullWorkoutDetails)
    .then(res => {
      dispatch({
        type: CREATE_WORKOUT,
        payload: res.data
      });
      history.push('/workouts');
    })
    .catch(error => {
      dispatch({
        type: CREATE_WORKOUT_ERROR,
        payload: error.response.data.errorMessage
      });
    })
    .finally(() => ({
      type: LOADING_CREATE_WORKOUT,
      payload: false
    }));
};

// action dispatcher
export const fetchWorkouts = () => dispatch => {
  // type LOADING needs to be added (also for the redux state)
  axiosWithAuth()
    .get(workouts)
    .then(res => {
      dispatch({ type: FETCH_WORKOUTS, workouts: res.data });
    })
    .catch(err => {
      // type ERROR needs to be added (also for the redux state)
    });
};

export const fetchWorkoutDetails = (workout_id) => dispatch => {
  dispatch({
    type: FETCH_WORKOUT_DETAILS,
    payload: true
  });
  axiosWithAuth()
    .get(`${workouts}/${workout_id}`)
    .then(res => {
      dispatch({
        type: FETCH_WORKOUT_DETAILS_SUCCCESS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_WORKOUT_DETAILS_FAILURE,
        payload: err.response.data.errorMessage
      });
    });
};

export const chooseExercise = exercise_name => {
  return { type: CHOOSE_EXERCISE, current_exercise: exercise_name };
};

export const finishExercise = exercise_id => {
  return { type: FINISH_EXERCISE, exercise_id: exercise_id };
};

export const endWorkout = (workout_id, history) => dispatch => {
  // type LOADING needs to be added (also for the redux state)

  return axiosWithAuth()
    .post(`${workouts}/${workout_id}/end`)
    .then(res => {
      return axiosWithAuth()
        .get(`${process.env.REACT_APP_BASE_URL}/workouts/history`)
        .then(res => {
          dispatch({ type: END_WORKOUT, session: res.data.workoutHistory });
          if (history) {
            setTimeout(() => history.push("/dashboard/stats"), 1500);
          }
        });
    })
    .catch(err => {
      // type ERROR needs to be added (also for the redux state)
    });
};

export const deleteWorkout = workout_id => dispatch => {
  const userId = Number(localStorage.getItem("userId"));

  const workoutAndUser = {
    workouts_id: workout_id,
    user_id: userId
  };
  axiosWithAuth()
    .delete(`${workouts}/all-saved`, { data: workoutAndUser })
    .then(res => {
      return axiosWithAuth()
        .get(`${workouts}/all-saved/${userId}`)
        .then(res => {
          dispatch(genericAction(DELETE_WORKOUT, res.data));
        });
    })
    .catch(err => {
      dispatch(genericAction(GET_SAVED_WORKOUT_FAILURE, err));
    });
};

export const saveWorkout = data => dispatch => {
  dispatch(genericAction(ADD_WORKOUT, true));
  axiosWithAuth()
    .post(`${workouts}/save-workout`, data)
    .then(res => {
      return axiosWithAuth()
        .get(`${workouts}/all-saved/${data.user_id}`)
        .then(res => {
          dispatch(genericAction(ADD_WORKOUT_SUCCESS, res.data));
        });
    })
    .catch(err => {
      dispatch(genericAction(ADD_WORKOUT_FAILURE, err));
    });
};

export const getSavedWorkout = () => dispatch => {
  dispatch(genericAction(GET_SAVED_WORKOUT, true));
  const userId = localStorage.getItem("userId");
  axiosWithAuth()
    .get(`${workouts}/all-saved/${userId}`)
    .then(res => {
      dispatch(genericAction(GET_SAVED_WORKOUT_SUCCESS, res.data));
    })
    .catch(err => {
      dispatch(genericAction(GET_SAVED_WORKOUT_FAILURE, err));
    });
};
