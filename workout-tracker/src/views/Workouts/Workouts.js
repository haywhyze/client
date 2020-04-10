import React from "react";
import { connect } from "react-redux";
import {
  fetchWorkouts,
  fetchWorkoutDetails,
  saveWorkout,
} from "../../store/actions/workoutsActions";
import { notification, Empty } from "antd";

import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import { CardWrapper } from "../AboutUs/AboutUs";

class Workouts extends React.Component {
  componentDidMount() {
    this.props.fetchWorkouts();
  }

  addWorkout = (type, workouts_id, name) => {
    let user_id = Number(localStorage.getItem("userId"));
    const data = {
      workouts_id,
      user_id,
    };
    notification[type]({
      message: "Successful!",
      description: `The workout ${name} got added to your list.`,
    });

    this.props.saveWorkout(data);
  };

  render() {
    return (
      <>
        {this.props.workouts ? (
          <>
            <CardWrapper>
              {this.props.workouts.map((workout) => {
                return (
                  <WorkoutCard
                    key={workout.id}
                    image={
                      workout.image_url ||
                      "https://www.bodybuilding.com/images/2018/april/5-workous-that-are-insanely-efficient-at-torching-fat-signature-3-700xh.jpg"
                    }
                    fetchDetails={this.props.fetchWorkoutDetails}
                    name={workout.workout_name}
                    description={workout.workout_description}
                    difficulty={workout.level}
                    id={workout.id}
                    startWorkout={() =>
                      this.props.fetchWorkoutDetails(workout.id)
                    }
                    deleteWorkout={() => this.props.deleteWorkout(workout.id)}
                    addWorkout={() =>
                      this.addWorkout(
                        "success",
                        workout.id,
                        workout.workout_name
                      )
                    }
                    myWorkout={false}
                    exercises={this.props.allExercises}
                    currentWorkout={this.props.currentWorkout}
                    loading={this.props.loading}
                    error={this.props.error}
                  />
                );
              })}
            </CardWrapper>
          </>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{ height: 60 }}
          ></Empty>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts.workouts,
    allExercises: state.workouts.allExercises,
    currentWorkout: state.workouts.currentWorkout,
    loading: state.workouts.loading,
    error: state.workouts.error,
  };
};
export default connect(mapStateToProps, {
  fetchWorkouts,
  fetchWorkoutDetails,
  saveWorkout,
})(Workouts);
