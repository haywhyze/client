import React from 'react';
import { connect } from 'react-redux';
import { fetchWorkoutDetails } from '../../../store/actions/workoutsActions';
import styled from 'styled-components';

const StyledWorkoutView = styled.div``;

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
      {this.props.myWorkouts ? (this.props.myWorkouts.map((workout, index) =>{
        return <div key={index} className='workout-card'> 
          <img src={workout.image_url} alt='workout' className='workout-img'/>
          <h1>{workout.workout_name}</h1>
          <p>{workout.workout_description}</p>
          <Link onClick={this.props.fetchWorkoutDetails(workout.id)} to='Workout_session' className='btn'>
                Start Workout
              </Link>
        </div> 
      })) : null}
    </div>
            </div>;
  }
}

const mapStateToProps = state => {
  return {
    // currentWorkout: state.currentWorkout.currentWorkout
  };
};

export default connect(mapStateToProps, { fetchWorkoutDetails })(WorkoutView);
