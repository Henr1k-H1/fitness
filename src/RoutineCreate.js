import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ExercisesLibrary from "./ExercisesLibrary";
import Exercise from "./Exercise";
import ShortUniqueId from "short-unique-id";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Sheet from "react-modal-sheet";

const RoutineCreate = () => {
  const location = useLocation();
  const { user } = useAuth0();

  const userId = user.sub.split("|")[1];

  const uid = new ShortUniqueId({ length: 20 });
  const history = useHistory();
  const newRoutineId = uid();
  const [isOpen, setOpen] = useState(false);

  const initialFormState = { id: newRoutineId, title: "" };
  const [routine, setRoutine] = useState(initialFormState);
  const [exercises, setExercises] = useState([]);

  console.log(exercises);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRoutine({ ...routine, [name]: value });
  };

  const updateExercise = (updatedExercise) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  useEffect(() => {
    setRoutine({ ...routine, exercises: exercises });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercises]);

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
          distance: 0,
          reps: "",
          completed: false,
        };
        updatedExercise.sets = [];
        updatedExercise.sets.push(initialSet);
        updatedExercises.push(updatedExercise);
      }
    });
    // console.log(updatedExercises)
    setExercises([...exercises, ...updatedExercises]);
    setOpen(false);
  };

  const onClickCancel = () => {
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
      weight: "",
      distance: 0,
      reps: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRoutine = { ...routine };
    newRoutine.uid = userId;
    axios
      .post(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/addRoutine",
        newRoutine
      )
      .then((res) => {
        history.push(`/routine/${routine.id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      {/* {!isMobile &&

      <div className="col-md-4 mb-4">
        <ExercisesLibrary
          onClickExercise={addExercises}
          location={location.pathname.split("/")[1]}
        />
      </div>
    } */}

      <div className="col">
        <div className="row mb-3">
          <div className="col">
            <h4>
              <strong>Create Routine</strong>
              <span className="float-right">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                  disabled={
                    routine.title === ""
                      ? "disabled"
                      : exercises < 1
                      ? "disabled"
                      : null
                  }
                >
                  Save Routine
                </button>
              </span>
            </h4>
          </div>
        </div>

        <div className="card outerCard">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="title"
                    placeholder="Routine Name"
                    className="form-control darkInput"
                    value={routine.title}
                    onChange={handleInputChange}
                  />
                </div>
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
            {/* } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCreate;
