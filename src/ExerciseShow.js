import React from "react";
import { WEIGHTUNITS } from "./Const";

const ExerciseShow = (props) => {
  const exercise = props.exercise;

  const numberOfSets = exercise.sets.length;

  const repRange = [];
  // const weightRange = [];

  exercise.sets.forEach((set) => {
    repRange.push(set.reps);
    // weightRange.push(set.weight);
  });

  // const findAverage = (thing) => {
  //     const array = [];
  //     exercise.sets.forEach((set) => {
  //       array.push(Number(set[thing]));
  //     });
  //     console.log(array.reduce((a, b) => a + b) / array.length)
  //     return array.reduce((a, b) => a + b) / array.length
  // }


  // const average = (array) => array.reduce((a, b) => a + b) / array.length

  return (
    <div className="card mb-3 innerCard">
      <div className="card-body">
        <h5 className="mb-3">
          <strong>{exercise.title}</strong>
        </h5>
        <div>
          <span className="smallDiv">
            <i className="far fa-tasks fa-fw fa-blue"></i>{" "}
            <small>{numberOfSets} Sets</small>
          </span>
          <span className="smallDiv">
            <i className="far fa-redo fa-fw fa-blue"></i>{" "}
            <small>
              {Math.min(...repRange)} - {Math.max(...repRange)} reps
            </small>
          </span>
          {/* <span className="smallDiv">
            <i className="far fa-weight-hanging fa-fw fa-blue"></i>{" "}
            <small>
              {Math.min(...weightRange)} - {Math.max(...weightRange)} {findAverage('weight')}{" "}
              {" " + WEIGHTUNITS}
            </small>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ExerciseShow;
