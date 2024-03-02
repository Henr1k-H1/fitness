import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { WEIGHTUNITS,BODYWEIGHT } from "./Const";

const RoutinesExercise = (props) => {
  const history = useHistory();

  const routine = props.routine;
  const exerciseList = [];

  const onClickRoutine = (id) => {
    history.push(`/routine/${id}`);
  };

  const exerciseTitlesString = (routine) => {
    const exerciseList = [];
    routine.exercises.forEach((exercise) => {
      exerciseList.push(exercise.title);
    });

    const truncate = (str, max, suffix) =>
      str.length < max
        ? str
        : `${str.substr(
            0,
            str.substr(0, max - suffix.length).lastIndexOf(" ")
          )}${suffix}`;
    return truncate(exerciseList.join(", "), 50, "...");
  };

  useEffect(() => {
    routine.exercises.forEach((exercise) => {
      exerciseList.push(exercise.title);
    });
  }, [exerciseList, routine.exercises]);


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

  return (
    <div className="card mb-2 mt-2 innerCard" key={routine.id}>
      {routine && (
        <div className="card-body">
          <button
            className="blankButton"
            onClick={() => onClickRoutine(routine.id)}
          >
            <h5 className="mb-1">
              <strong>{routine.title}</strong>
            </h5>
          </button>
          <p className="text-muted">
            {exerciseTitlesString(routine)}
          </p>
          <div className="row">
            <div className="col">
              <span className="smallDiv">
                <i className="far fa-redo fa-fw fa-blue"></i>{" "}
                <small>
                  {totalSets()} {totalSets() === 1 ? "Set" : "Sets"}{" "}
                </small>
              </span>
              <span className="smallDiv">
                <i className="fas fa-weight-hanging fa-fw fa-blue"></i>{" "}
                <small>
                  {totalWeight()} {" " + WEIGHTUNITS}{" "}
                </small>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutinesExercise;
