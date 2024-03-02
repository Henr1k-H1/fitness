import React from "react";

import Set from "./Set";
import { useLocation } from "react-router-dom";
import { WEIGHTUNITS } from "./Const";
import { DISTANCEUNITS } from "./Const";

const Exercise = (props) => {
  const exercise = props.exercise;
  const location = useLocation();

  const onClickAddNewSet = (exercise) => {
    props.onClickAddNewSet(exercise);
  };

  const onClickRemoveExercise = (id) => {
    props.removeExercise(id);
  };

  const updateExercise = (exercise, incomingSet) => {
    const updatedExercise = { ...exercise };
    const setsAdded = updatedExercise.sets.map((set) =>
      set.index === incomingSet.id ? incomingSet : set
    );
    exercise.sets = setsAdded;
    props.updateExercise(updatedExercise);
  };

  const onClickRemoveSet = (exercise, index) => {
    props.removeSet(exercise, index);
  };

  const logSet = (exercise, set) => {
    props.logSet(exercise, set);
  };

  const weightUnit = () => {
    if (exercise.isDistance === true) {
      return "HH:SS";
    }
    if (Number(exercise.gymEquipment.$numberInt) === 1) {
      const output = WEIGHTUNITS + " (per Arm)";
      return output;
    }
    if (exercise.isBodyweight === true) {
      const output = WEIGHTUNITS + " (Added)";
      return output;
    }

    if (Number(exercise.gymEquipment.$numberInt) === 58) {
      const output = WEIGHTUNITS + " (Assisted)";
      return output;
    }
    return WEIGHTUNITS;
  };

  const repsDefinition = () => {
    if (exercise.isDistance === true) {
      return DISTANCEUNITS;
    }
    if (exercise.isUnilateral === true) {
      return "REPS (per Side)";
    }
    return "REPS";
  };

  return (
    <div className="">
      <h5 className="mb-3">
        <strong>{exercise.title}</strong>
        <span className="float-right">
          <i
            className="fal fa-trash-alt fa-grey addCursor"
            onClick={() => onClickRemoveExercise(exercise.id)}
          ></i>
        </span>
      </h5>
      <table width="100%">
        <tbody>
          <tr>
            <td></td>
            <td className="text-center">
              <p className="text-white littleBottomMargin">SET</p>
            </td>
            <td className="text-center">
              <p className="text-white littleBottomMargin">{weightUnit()}</p>
            </td>
            <td className="text-center">
              <p className="text-white littleBottomMargin">
                {repsDefinition()}
              </p>
            </td>
            {location === "routine-active" && <td></td>}
          </tr>

          {exercise.sets &&
            exercise.sets.map((set, index) => (
              <Set
                key={index}
                set={set}
                i={index}
                setSetCompleted={() => logSet(exercise, set)}
                handleInputChangeRepsWeights={() =>
                  updateExercise(exercise, index)
                }
                onClickRemoveSet={() => onClickRemoveSet(exercise, index)}
                location={location.pathname.split("/")[1]}
                exercise={exercise}
              />
            ))}
        </tbody>
      </table>
      <button
        className="btn btn-secondary btn-addSet mb-4"
        onClick={() => onClickAddNewSet(exercise)}
      >
        Add Set
      </button>
    </div>
  );
};

export default Exercise;
