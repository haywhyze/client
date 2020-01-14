import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth";

const appURL = process.env.REACT_APP_BASE_URL;

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOADING_USER = "LOADING_USER";
export const GET_USER = "GET_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const USER_ERROR = "USER_ERROR";

export const genericAction = (type, payload) => ({
  type,
  payload
});

export const doLogIn = (user, history) => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axios
    .post(`${appURL}/auth/login`, user)
    .then(response => {
      const { token, userId } = response.data;
      dispatch(genericAction(LOGIN, userId));
      localStorage.setItem("beFitToken", token);
      localStorage.setItem("userId", userId);
      history.push("/workouts");
    })
    .catch(error => {
      let { errorMessage } = error.response.data;
      dispatch(genericAction(LOGIN_ERROR, errorMessage));
    })
    .finally(() => dispatch(genericAction(LOADING_USER, false)));
};

export const doSignUp = (user, history) => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axios
    .post(`${appURL}/auth/signup`, user)
    .then(response => {
      const { token, user } = response.data;
      dispatch(genericAction(LOGIN, user.id));
      localStorage.setItem("beFitToken", token);
      localStorage.setItem("userId", user.id);
      history.push("/workouts");
    })
    .catch(error => {
      let { errorMessage } = error.response.data;
      dispatch(genericAction(SIGNUP_ERROR, errorMessage));
    })
    .finally(() => dispatch(genericAction(LOADING_USER, false)));
};

export const doLogOut = () => dispach => {
  localStorage.removeItem("beFitToken");
  dispach(genericAction(LOGOUT));
};

export const doGetUser = () => dispatch => {
  dispatch(genericAction(LOADING_USER, true));
  axiosWithAuth()
    .get(`${appURL}/profile`)
    .then(response => {
      dispatch(genericAction(GET_USER, response.data));
      dispatch(genericAction(LOADING_USER, false));
    })
    .catch(error => {
      dispatch(genericAction(USER_ERROR, error.response.data.errorMessage));
      dispatch(genericAction(LOADING_USER, false));
    });
};
