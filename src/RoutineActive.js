import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Exercise from "./Exercise";
import ExercisesLibrary from "./ExercisesLibrary";

import ShortUniqueId from "short-unique-id";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import Sheet from "react-modal-sheet";

import useTimer from "./Timer";

const RoutineActive = () => {
  const location = useLocation();
  const uid = new ShortUniqueId({ length: 20 });
  const { user } = useAuth0();

  const userId = user.sub.split("|")[1];

  const history = useHistory();

  const [routine, setRoutine] = useState();
  const [exercises, setExercises] = useState("");
  const [setsToLog, setSetsToLog] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const {
    timer,
    // isActive,
    isPaused,
    handleStart,
    handlePause,
    // handleResume,
    handleReset,
  } = useTimer(0);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
    axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getActiveRoutine"
      )
      .then((res) => {
        const data = res.data;
        setRoutine(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const logSet = (exercise, set) => {
    const isSetLogged = setsToLog.some((s) => s.id === set.id);
    if (isSetLogged) {
      setSetsToLog(setsToLog.filter((s) => s.id !== set.id));
    } else {
      const newSet = {
        title: exercise.title,
        isCardio: exercise.isCardio,
        gymEquipment: exercise.gymEquipment,
        id: set.id,
        reps: set.reps,
        weight: set.weight,
        completedOn: new Date(),
      };
      setSetsToLog([...setsToLog, newSet]);
    }
  };

  useEffect(() => {
    if (routine && routine.exercises) {
      setExercises(routine.exercises);
    }
  }, [routine]);

  useEffect(() => {
    handleStart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateExercise = (updatedExercise) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  const addExercises = (selectedExercises) => {
    const updatedExercises = [];
    selectedExercises.forEach((selectedExercise) => {
        // console.log(selectedExercise.id.$numberInt)
        const checkIfExeciseAlreadyAdded = exercises.some(
          (ex) => ex.id.$numberInt === selectedExercise.id.$numberInt
        );
        if (checkIfExeciseAlreadyAdded === false) {
          const updatedExercise = { ...selectedExercise };
          const initialSet = {
            index: 0,
            id: uid(),
            weight: "",
            reps: "",
            completed: false,
          };
          updatedExercise.sets = [];
          updatedExercise.sets.push(initialSet);
          updatedExercises.push(updatedExercise);
        }
      });
    setExercises([...exercises, ...updatedExercises]);
    setOpen(false);
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const onClickAddNewSet = (exercise) => {
    const updatedExercise = { ...exercise };
    const newSet = {
      index: updatedExercise.sets.length,
      id: uid(),
      reps: "",
      weight: "",
      completed: false,
    };
    updatedExercise.sets.push(newSet);
    setExercises(
      exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  const removeSet = (exercise, index) => {
    const updatedExercise = { ...exercise };
    const updatedSets = updatedExercise.sets;
    updatedSets.splice(index, 1);
    updatedExercise.sets = updatedSets;
    setExercises(
      exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  const groupSetsToRoutines = (sets) => {
    const setsToExercises = sets.reduce(
      (r, { title, isCardio, gymEquipment, ...rest }) => {
        const key = `${title}`;
        r[key] = r[key] || { title, isCardio, gymEquipment, sets: [] };
        r[key]["sets"].push(rest);
        console.log(r);
        return r;
      },
      {}
    );

    const timeTable = Object.values(setsToExercises);

    return Object.values(timeTable);
  };

  const onClickCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRoutine = {
      title: routine.title,
      id: routine.id,
      uid: userId,
      completedOn: new Date(),
      duration: timer,
      exercises: groupSetsToRoutines(setsToLog),
    };
    console.log(newRoutine);
    axios
      .post(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/addLoggedRoutine",
        newRoutine
      )
      .then((res) => {
        handleReset();

        history.push("/log");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {routine && (
        <>
          <div className="row">
            <div className="col"></div>
          </div>

          <div className="row">
            <div className="col">
              <div className="row mb-3">
                <div className="col">
                  {/* <h4>
              <strong>Active Workout Routine</strong> */}
                  {/* <span className="float-right"> */}
                  <button
                    className="btn btn-success btn100"
                    disabled={setsToLog.length < 1 ? "disabled" : null}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Finish Workout Routine
                  </button>
                  {/* </span> */}
                  {/* </h4> */}
                </div>
              </div>

              <div className="card outerCard">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <strong>{routine.title}</strong>
                      </h4>
                      <h3>
                        <span className="text-white float-right">
                          {/* <i className="fas fa-stopwatch fa-fw"></i> */}
                          <small>{formatTime()} </small>
                          <i
                            className={`fas fa-blue fa-fw fa-sm ${
                              isPaused ? "fa-pause" : "fa-play"
                            }`}
                            onClick={handlePause}
                          ></i>
                        </span>
                      </h3>
                    </div>
                  </div>
                  <hr />

                  {exercises.length > 0 ? (
                    exercises.map((exercise, i) => (
                      <Exercise
                        key={i}
                        exercise={exercise}
                        onClickAddNewSet={onClickAddNewSet}
                        removeSet={removeSet}
                        updateExercise={updateExercise}
                        removeExercise={removeExercise}
                        logSet={logSet}
                        location={location.pathname.split("/")[1]}
                      />
                    ))
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-list-ol fa-3x fa-blue"></i>
                      <h5 className="mt-3">
                        <strong>Get started</strong>
                      </h5>
                      <p className="text-muted">
                        Start by adding an exercise to your routine.
                      </p>
                    </div>
                  )}
                  {/* {isMobile &&  */}
                  <div className="row">
                    <button
                      className="btn btn-primary addSet"
                      onClick={(e) => setOpen(true)}
                    >
                      Add Exercises
                    </button>

                    <Sheet
                      isOpen={isOpen}
                      onClose={() => setOpen(false)}
                      // disableDrag={true}
                    >
                      <Sheet.Container>
                        {/* <Sheet.Header /> */}
                        <Sheet.Content>
                          <ExercisesLibrary
                            onClickExercise={addExercises}
                            location={location.pathname.split("/")[1]}
                            isOpen={isOpen}
                            onClickCancel={onClickCancel}
                            disableDrag={true}
                          />
                        </Sheet.Content>
                      </Sheet.Container>
                      <Sheet.Backdrop />
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RoutineActive;
