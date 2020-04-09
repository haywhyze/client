import React from "react";
import { Button } from "antd";

const AddWorkoutButton = props => {
  return (
    <Button type="primary" size="large" style={myStyle} onClick={props.modal}>
      Create New Workout
    </Button>
  );
};

const myStyle = {
  position: "fixed",
  top: "2rem",
  right: "2rem",
  zIndex: "3",
  boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, .15)"
};

export default AddWorkoutButton;
