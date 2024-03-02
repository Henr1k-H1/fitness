import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import ExerciseShow from "./ExerciseShow";
import axios from "axios";

const Routine = () => {
  const history = useHistory();

  const { id } = useParams();
  const [routine, setRoutine] = useState();

  useEffect(() => {
    axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getRoutineById?id=" +
          id
      )
      .then((res) => {
        const data = res.data;
        setRoutine(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const onClickDeleteRoutine = () => {
    axios
      .delete(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/deleteRoutine?id=" +
          id
      )
      .then((res) => {
        history.push("/routines");
      })
      .catch((error) => console.log(error));
  };

  const onClickStartWorkout = () => {
    axios
      .post(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/setActiveRoutine",
        routine
      )
      .then((res) => {
        history.push("/routine-active");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {routine && (
        <>
          <div className="row">
            <div className="col mb-3">
              <h5>
                <strong>{routine.title}</strong>
              </h5>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                className="btn btn-secondary btn100"
                onClick={() => onClickStartWorkout()}
              >
                <i className="fal fa-play fa-blue fa-fw"></i>
                {"  "}
                Start Routine
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Link
                className="btn btn-secondary mt-1 btn100"
                to={`/routine-edit/${routine.id}`}
              >
                <i className="fal fa-pen fa-blue fa-fw"></i>
                {"  "}
                Edit Routine
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                className="btn btn-secondary mt-1 btn100"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this routine? It will be gone forever"
                    )
                  ) {
                    onClickDeleteRoutine(routine.id);
                  }
                }}
              >
                <i className="fal fa-trash-alt fa-blue fa-fw"></i>
                {"  "}
                Delete Routine
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col mt-3">
              <h5 className="mb-3">
                <strong>Exercises</strong>
              </h5>

              {routine.exercises &&
                routine.exercises.map((exercise, i) => (
                  <ExerciseShow key={i} exercise={exercise} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Routine;
