import React from 'react';
import Tabs from './views/Tabs/Tabs';
import ExercisesLibrary from './views/ExerciseLibrary/ExercisesLibrary';
import UserPage from './views/UserPage/UserPage';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Tabs />
        <Route path={'/My Workouts'} component={ExercisesLibrary} />
        <Route path={'/tracker'} component={UserPage} />
    </div>
  );
}

export default App;
