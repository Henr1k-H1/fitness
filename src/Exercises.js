import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ExercisesLibrary from "./ExercisesLibrary";
import ExerciseDetail from "./ExerciseDetail";
import Sheet from "react-modal-sheet";

const Exercises = () => {
  const location = useLocation();
  const [selectedExercise, setSelectedExercise] = useState("");
  const [isOpen, setOpen] = useState(false);

  const onClickSelectedExerciseMobile = (exercise) => {
    setOpen(true);
    setSelectedExercise(exercise);
  };

  const onClickCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <ExercisesLibrary
            // onClickExercise={onClickSelectedExercise}
            onClickExerciseMobile={onClickSelectedExerciseMobile}
            location={location.pathname.split("/")[1]}
          />
        </div>

        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container>
            {/* <Sheet.Header /> */}
            <Sheet.Content>
              <ExerciseDetail
                exercise={selectedExercise}
                onClickCancel={onClickCancel}
                onClickExercise={onClickSelectedExerciseMobile}
                disableDrag={true}
              />
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </div>
    </>
  );
};

export default Exercises;
