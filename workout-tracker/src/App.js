import React, { Component } from "react";
import styled from "styled-components";
import Settings from "./views/Settings/Settings";
import ExercisesLibrary from "./views/ExerciseLibrary/ExercisesLibrary";
import Stats from "./views/Stats/Stats";
import About from "./views/AboutUs/AboutUs";
import LandingPage from "./views/LandingPage/LandingPage";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import WorkoutSession from "./views/Workouts/WorkoutSession/WorkoutSession";
import PrivateRoute from "./auth/PrivateRoute";
import Auth from "./auth/auth";
import SignupPage from "./views/Auth/Signup";
import LoginPage from "./views/Auth/Login";
import MainNavBar from "./components/MainNavBar/MainNavBar";
import MainLayout from "./components/Layout/Layout";
import ProfileCard from "./components/MainNavBar/SideNavigation/ProfileCard";
import "./App.css";
import DashboardNavItem from "./components/MainNavBar/SideNavigation/DashboardNavItem";
import WorkoutContainer from "./views/Workouts/WorkoutsContainer";
import { Button, Menu } from "antd";
import logo from "./assets/images/beFit-logo.png";
import AllExercises from "./views/customWorkout/AllExercises";

class App extends Component {
  state = {
    showMobileNav: false,
    showBackdrop: false
  };

  render() {
    let sider = (
      <>
        <div style={{ marginTop: "3rem" }}>
          <ProfileCard />
        </div>
        <DashboardNavItem isAuth={Auth.isAuthenticated()} />
        <div className="space" style={{ flex: 1 }}></div>
        <StyledHeading1>
          <img alt="befit logo" src={logo} />
          <span>BeFit</span>
        </StyledHeading1>
      </>
    );
    let routes = (
      <>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/login" render={props => <LoginPage {...props} />} />
          <Route path="/signup" render={props => <SignupPage {...props} />} />
          <Redirect to="/" />
        </Switch>
      </>
    );
    if (Auth.isAuthenticated()) {
      routes = (
        <Switch>
          <PrivateRoute path={"/Dashboard"} component={Stats} />
          <PrivateRoute path={"/Exercises"} component={ExercisesLibrary} />
          <PrivateRoute path={"/Settings"} component={Settings} />
          <PrivateRoute
            path={"/workouts/new/add_exercises"}
            component={AllExercises}
          />
          <PrivateRoute exact path={"/Workouts"} component={WorkoutContainer} />
          <PrivateRoute path={"/Workout_session"} component={WorkoutSession} />
          <Redirect to="/workouts" />
        </Switch>
      );
    }

    return (
      <>
        <MainLayout
          {...this.props}
          header={
            this.props.location.pathname !== "/workouts/new/add_exercises" && (
              <MainNavBar
                onLogout={this.logoutHandler}
                isAuth={Auth.isAuthenticated()}
              />
            )
          }
          sider={
            this.props.location.pathname !== "/workouts/new/add_exercises" &&
            sider
          }
          routes={routes}
        />
      </>
    );
  }
}

export default withRouter(App);

const StyledHeading1 = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #fff;
  font-family: "Viga", sans-serif;

  span {
    display: block;
  }

  img {
    width: 5rem;
    /* margin-right: 1rem; */

    @media screen and (max-width: 750px) {
      width: 3rem;
      /* margin-right: 0.5rem; */
    }
  }

  @media screen and (max-width: 750px) {
    font-size: 2rem;
  }
`;
