import React from "react";
import { connect } from "react-redux";
import {
  fetchWorkouts,
  fetchWorkoutDetails,
  saveWorkout,
} from "../../store/actions/workoutsActions";
import { notification, Empty, Spin } from "antd";

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
    const {
      loading,
      workouts,
      allExercises,
      currentWorkout,
      error,
      deleteWorkout,
      fetchWorkoutDetails,
      loadingWorkoutDetail,
    } = this.props;

    if (loading) {
      return (
        <div style={{ textAlign: "center" }}>
          <Spin tip="Loading Workouts..." size="large" />
        </div>
      );
    }
    return (
      <>
        {workouts ? (
          <>
            <CardWrapper>
              {workouts.map((workout) => {
                return (
                  <WorkoutCard
                    key={workout.id}
                    image={
                      workout.image_url ||
                      "https://www.bodybuilding.com/images/2018/april/5-workous-that-are-insanely-efficient-at-torching-fat-signature-3-700xh.jpg"
                    }
                    fetchDetails={fetchWorkoutDetails}
                    name={workout.workout_name}
                    description={workout.workout_description}
                    difficulty={workout.level}
                    id={workout.id}
                    startWorkout={() => fetchWorkoutDetails(workout.id)}
                    deleteWorkout={() => deleteWorkout(workout.id)}
                    addWorkout={() =>
                      this.addWorkout(
                        "success",
                        workout.id,
                        workout.workout_name
                      )
                    }
                    myWorkout={false}
                    exercises={allExercises}
                    currentWorkout={currentWorkout}
                    loading={loadingWorkoutDetail}
                    error={error}
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
    loadingWorkoutDetail: state.workouts.loadingWorkoutDetail,
    loading: state.workouts.loading,
    error: state.workouts.error,
  };
};
export default connect(mapStateToProps, {
  fetchWorkouts,
  fetchWorkoutDetails,
  saveWorkout,
})(Workouts);
