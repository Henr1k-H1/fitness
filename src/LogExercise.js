import React, { useState, useEffect } from "react";
import moment from "moment";
import { WEIGHTUNITS,BODYWEIGHT } from "./Const";

const LogExercise = (props) => {
  const [showExerciseList, setShowExerciseList] = useState(false);

  const routine = props.routine;
  const exerciseList = [];

  const exerciseTitlesString = (routine) => {
    const exerciseList = [];
    routine.exercises.forEach((exercise) => {
      exerciseList.push(exercise.title);
    });
    return exerciseList;
  };

  useEffect(() => {
    routine.exercises.forEach((exercise) => {
      exerciseList.push(exercise.title);
    });
  }, [exerciseList, routine.exercises]);

  const toggleExerciseList = () => {
    setShowExerciseList(!showExerciseList);
  };

  const totalSets = () => {
    var sum = 0;
    routine.exercises.forEach((exercise) => {
      sum += exercise.sets.length;
    });
    return sum;
  };

  const totalWeight = () => {
    var sum = 0;
    routine.exercises.forEach((exercise) => {
      if (exercise.isCardio === true) {
        return 0;
      }
      exercise.sets.forEach((set) => {
        if (Number(exercise.gymEquipment.$numberInt) === 1) {
          sum += Number(set.weight) * Number(set.reps) * 2;
        } else if (Number(exercise.gymEquipment.$numberInt) === 58) {
          sum += (BODYWEIGHT+Number(set.weight)) * Number(set.reps);
        } else if (exercise.isBodyweight === true) {
          sum += (BODYWEIGHT+Number(set.weight)) * Number(set.reps);
        } else {
          sum += Number(set.weight) * Number(set.reps);
        }
      });
    });
    return Number(sum);
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <>
      <h5 className="mb-3">
        <strong>{routine.title}</strong> -{" "}
        <small>{moment(routine.completedOn).fromNow()}</small>
      </h5>
      <p className="small">
        <i className="fas fa-stopwatch fa-lg fa-fw fa-blue"></i>{" "}
        {formatTime(routine.duration.$numberInt)}
      </p>
      <div>
        <span
          className="smallDiv addCursor"
          onClick={() => toggleExerciseList()}
        >
          <i className="far fa-tasks fa-fw fa-blue"></i>{" "}
          <small>
            {routine.exercises.length}{" "}
            {routine.exercises.length === 1 ? "Exercise" : "Exercises"}{" "}
            <i
              className={
                showExerciseList ? "far fa-chevron-up" : "far fa-chevron-down"
              }
            ></i>
          </small>
        </span>
        <span className="smallDiv">
          <i className="far fa-redo fa-fw fa-blue"></i>{" "}
          <small>
            {totalSets()} {totalSets() === 1 ? "Set" : "Sets"}{" "}
          </small>
        </span>
        <span className="smallDiv">
          <i className="fas fa-weight-hanging fa-fw fa-blue"></i>{" "}
          <small>
            {totalWeight()}
            {" " + WEIGHTUNITS}
          </small>
        </span>
      </div>
      <div className="d-flex flex-wrap flex-row mt-2">
        {showExerciseList &&
          exerciseTitlesString(routine).map((title, i) => (
            <div key={i} className="d-flex smallDivTags text-muted">
              <small>{title}</small>
            </div>
          ))}
      </div>
    </>
  );
};

export default LogExercise;
