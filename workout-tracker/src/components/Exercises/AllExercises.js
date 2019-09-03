import React from "react";
import styled from "styled-components";

const StyledAllExercises = styled.div`
  margin-top: 3rem;
`;

const AllExercises = props => {
  const muscles = [
    "Neck",
    "Lats",
    "Middle Back",
    "Lower Back",
    "Shoulders",
    "Chest",
    "Forearms",
    "Hamstrings",
    "Calves",
    "Biceps",
    "Triceps",
    "Traps",
    "Abdominals",
    "Glutes",
    "Quadriceps",
    "Adductors",
    "Abductors"
  ];

  return (
    <StyledAllExercises className="all-exercise">
      <div className="muscle-groups">
        {muscles.map((muscleGroup, index) => (
          <button key={index} onClick={props.showMuscleGroup}>
            {muscleGroup}
          </button>
        ))}
      </div>
      {props.exercises
        ? props.exercises.map((exercise, index) => {
            return (
              <div key={index}>
                <p onClick={props.showSingleExercise}>
                  {exercise.exercise_name}
                </p>
              </div>
            );
          })
        : null}
      {props.pageNumbers
        ? props.pageNumbers.map((num, index) => {
            return (
              <button key={index} onClick={props.paginate}>
                {num}
              </button>
            );
          })
        : null}
    </StyledAllExercises>
  );
};

export default AllExercises;
