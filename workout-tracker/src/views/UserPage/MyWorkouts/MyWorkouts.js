import React from 'react';
import { connect } from 'react-redux';
import { fetchWorkoutDetails, deleteWorkout } from '../../../store/actions/workoutsActions';
import {Link } from 'react-router-dom';
import WorkoutPage from '../../customWorkout/WorkoutPage'
import { Empty } from 'antd';
// import styled from 'styled-components';

// const StyledWorkoutView = styled.div``;

class WorkoutView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};



  }
  render() {
   
    return <div>
      <h1>
        My Workouts
            </h1>
      <div className='land-wrapper'>
        {this.props.myWorkouts ? (this.props.myWorkouts.map((workout, index) => {
          return <div key={index} className='workout-card'>
            <img src={workout.image_url} alt='workout' className='workout-img' />
            <h1>{workout.workout_name}</h1>
            <p>{workout.workout_description}</p>
            <Link onClick={() => this.props.fetchWorkoutDetails(workout.id)} to='/Workout_session' className='btn'>
              Start Workout
              </Link>
            <p onClick={() => this.props.deleteWorkout(workout.id)} className='btn'>
              Delete Workout
              </p>
        </div> 
      })) : (<Link to='/Workouts'><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Add some workouts'}/></Link>)}
    </div>
     <WorkoutPage /> 
            </div>;
  }
}

const mapStateToProps = state => {
  return {
    myWorkouts: state.workouts.myWorkouts
  };
};

export default connect(
  mapStateToProps,
  { fetchWorkoutDetails, deleteWorkout }
)(WorkoutView);
