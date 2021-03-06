import { axiosWithAuth } from "../axiosWithAuth";

export const FETCH_SETTINGS = "FETCH_SETTINGS";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

const settings = `${process.env.REACT_APP_BASE_URL}/profile`;
// adress get's changed later

export const fetchSettings = () => dispatch => {
  // type LOADING needs to be added (also for the redux state)

  axiosWithAuth()
  .get(`${settings}`)
  .then(res => {
      dispatch({ type: FETCH_SETTINGS, settings: res.data.user });
    })
    .catch(err => {
      // type ERROR needs to be added (also for the redux state)
    });
  };
  
  export const updateSettings = updatedSettings => dispatch => {  
    axiosWithAuth()
    .put(settings, updatedSettings)
    .then(res => {
         dispatch({ type: UPDATE_SETTINGS, updatedSettings: res.data.user });
    })
    .catch(err => {
      // type ERROR needs to be added (also for the redux state)
    });
};
