import React, { useState, useEffect, Fragment, useContext } from "react";
// import { useExercisesStore } from "./ExercisesContext";
// import axios from 'axios';
import { muscleNumberToName } from "./Utils";
import { ExercisesContext } from "./ExercisesStore";

const ExerciseLibrary = (props) => {
  const location = props.location;

  // const exercisesStore = useExercisesStore();

  // const [availableExercises, setAvailableExercises] = useState([]);
  const [filter, setFilter] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [availableExercises] = useContext(ExercisesContext);
  const [filteredExercises, setFilteredExercises] = useState(availableExercises);

  const [selectedExercises, setSelectedExercises] = useState([]);

  //   useEffect(() => {
  //         axios.get('https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getAllExercises')
  //         .then(res => {
  //         const data = res.data;
  //         setAvailableExercises(data);
  //         })
  //         .catch(error => console.log(error))
  // }, []);

  const handleChange = (event) => {
    setFilter(Number(event.target.value));
  };

  useEffect(() => {
    if (filter === 0 && searchValue === "") {
      setFilteredExercises(availableExercises);
    }

    if (searchValue !== "" && filter === 0) {
      setFilteredExercises(
        availableExercises.filter((exercise) =>
          exercise.title.match(new RegExp(searchValue, "i"))
        )
      );
    }

    if (filter !== 0 && searchValue === "") {
      setFilteredExercises(
        availableExercises.filter(
          (exercise) => Number(exercise.primary.$numberInt) === filter
        )
      );
    }

    if (filter !== 0 && searchValue !== "") {
      const firstFilteredExercises = availableExercises.filter(
        (exercise) => Number(exercise.primary.$numberInt) === filter
      );
      setFilteredExercises(
        firstFilteredExercises.filter((exercise) =>
          exercise.title.match(new RegExp(searchValue, "i"))
        )
      );
    }
  }, [availableExercises, filter, searchValue]);

  const onClickExercise = (exercise) => {
    if (location === "exercises") {
      props.onClickExerciseMobile(exercise);
    }

    if (location === "create-routine") {
      const checkIfExeciseAlreadyAdded = !selectedExercises.find(
        (ex) => ex.id === exercise.id
      );
      if (checkIfExeciseAlreadyAdded === true) {
        setSelectedExercises([...selectedExercises, exercise]);
      } else {
        setSelectedExercises(
          selectedExercises.filter((ex) => ex.id !== exercise.id)
        );
      }
    }

    if (location === "routine-edit") {
      const checkIfExeciseAlreadyAdded = !selectedExercises.find(
        (ex) => ex.id === exercise.id
      );
      if (checkIfExeciseAlreadyAdded === true) {
        setSelectedExercises([...selectedExercises, exercise]);
      } else {
        setSelectedExercises(
          selectedExercises.filter((ex) => ex.id !== exercise.id)
        );
      }
    }

    if (location === "routine-active") {
      const checkIfExeciseAlreadyAdded = !selectedExercises.find(
        (ex) => ex.id === exercise.id
      );
      if (checkIfExeciseAlreadyAdded === true) {
        setSelectedExercises([...selectedExercises, exercise]);
      } else {
        setSelectedExercises(
          selectedExercises.filter((ex) => ex.id !== exercise.id)
        );
      }
    }
  };
  const onClickAddExercise = (selectedExercises) => {
    props.onClickExercise(selectedExercises);
  };

  const onClickCancel = () => {
    props.onClickCancel();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="card outerCard">
            {/* <div className={`list-group ${isMobile ? "contentcard" : ""}`}> */}

            <div className="card-body">
              <p className="mb-2 text-muted">Exercise Library</p>
              <div>
                <select
                  className="form-select form-select-sm darkSelect mb-3"
                  value={filter.value}
                  onChange={handleChange}
                >
                  <option value="0" selectedvalue="0">
                    All Muscles
                  </option>
                  <option value="1">Abs</option>
                  <option value="2">Back</option>
                  <option value="3">Biceps</option>
                  <option value="4">Calves</option>
                  <option value="5">Chest</option>
                  <option value="6">Glutes</option>
                  <option value="7">Hamstrings</option>
                  <option value="8">Quadriceps</option>
                  <option value="9">Shoulders</option>
                  <option value="10">Triceps</option>
                  <option value="11">Trapezius</option>
                  <option value="12">Lower Back</option>
                  <option value="13">Abductors</option>
                  <option value="14">Adductors</option>
                  <option value="15">Forearms</option>
                  <option value="16">Neck</option>
                </select>
                <div className="input-group input-group-sm">
                  <label className="input-group-text darkInput">
                    <i className="far fa-search darkIcon"></i>
                  </label>

                  <input
                    type="text"
                    name="search"
                    className="form-control darkInput"
                    placeholder="Search Exercises"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <hr />
                <p className="mb-2 text-muted">
                  Library
                  {location === "exercises" && (
                    <span className="float-right text-link addCursor">
                      Create Exercise
                    </span>
                  )}
                </p>

                <div className="list-group">
                  {/* <div className={`list-group ${isMobile ? "contentcard" : ""}`}> */}

                  {filteredExercises &&
                    filteredExercises.map((exercise, i) => (
                      <Fragment key={i}>
                        <button
                          type="button"
                          className="list-group-item list-group-item-action darkList"
                          onClick={() => onClickExercise(exercise)}
                        >
                          <div
                            className={`${
                              selectedExercises.some(
                                (ex) => ex.id === exercise.id
                              )
                                ? "verticalLine"
                                : ""
                            }`}
                          >
                            <p className="removeBottomMargin xercise.id">
                              {exercise.title}
                            </p>
                            <p className="text-muted removeBottomMargin">
                              {muscleNumberToName(exercise.primary)}
                            </p>
                          </div>
                        </button>
                        {filteredExercises.length !== i + 1 && (
                          <hr className="hrNoMargin" />
                        )}
                      </Fragment>
                    ))}
                </div>
              </div>
            </div>
            {location !== "exercises" && (
              <>
                <div className="row mb-3">
                  <div className="col-6 text-center">
                    <button
                      className="btn btn-secondary btn100modal"
                      onClick={(e) => onClickCancel()}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6 text-center">
                    <button
                      className="btn btn-primary btn100modal"
                      onClick={(e) => onClickAddExercise(selectedExercises)}
                      disabled={
                        selectedExercises.length < 1 ? "disabled" : null
                      }
                    >
                      {selectedExercises.length > 1 ? (
                        <>Add Exercises ({selectedExercises.length})</>
                      ) : (
                        <>Add Exercise ({selectedExercises.length})</>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseLibrary;
