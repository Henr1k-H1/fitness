import React from "react";
import { muscleNumberToName, equipmentumberToName } from "./Utils";

const ExerciseDetail = (props) => {
  const exercise = props.exercise;

  const secondaryMuscleList = () => {
    const secondaryMusclesList = [];
    if (exercise.secondary < 1) {
      return "None";
    }
    exercise.secondary.forEach((muscle) => {
      secondaryMusclesList.push(muscleNumberToName(muscle));
    });
    return secondaryMusclesList.join(", ");
  };

  const getEquipment = () => {
    const primaryEquipment = equipmentumberToName(exercise.gymEquipment);
    const secondaryEquipment = equipmentumberToName(exercise.gymEquipment2);
    if (primaryEquipment === secondaryEquipment) {
      return primaryEquipment;
    }
    return primaryEquipment.concat(", ", secondaryEquipment);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-10 offset-1">
          <h5 className="mb-3">
            <strong>{exercise.title}</strong>
          </h5>
          <p className="text-white">
            Equipment: <span className="text-muted">{getEquipment()}</span>
          </p>
          <p className="text-white">
            Primary Muscle:{" "}
            <span className="text-muted">
              {muscleNumberToName(exercise.primary)}
            </span>
          </p>
          <p className="text-white">
            Secondary Muscles:{" "}
            <span className="text-muted">{secondaryMuscleList()}</span>
          </p>
          <h5>
            <strong>Instructions:</strong>
          </h5>
          <p className="text-muted fs-6">{exercise.instructions}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-10 offset-1">
          <button
            className="btn btn-primary btn100"
            onClick={(e) => props.onClickCancel()}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ExerciseDetail;
