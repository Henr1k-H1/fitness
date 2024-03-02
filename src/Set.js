import React, { useState, useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import NumberFormat from "react-number-format";

const Set = (props) => {
  const location = props.location;
  const uid = new ShortUniqueId({ length: 20 });

  const set = props.set;

  const i = props.i;

  useEffect(() => {
    set.completed = false;
    if (location === "routine-active") {
      set.id = uid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [setComplete, setSetcomplete] = useState(false);
  const [exercise, setExercise] = useState();
  const [isDistance, setIsDistance] = useState(false);
  const [isTimed, setIsTimed] = useState(false);
  const [isAssisted, setIsAssisted] = useState(false);

  useEffect(() => {
    setExercise(props.exercise);
  }, [props.exercise]);

  useEffect(() => {
    if (exercise) {
      if (exercise.isDistance === true) {
        setIsDistance(true);
      }
      if (exercise.isTimed === true) {
        setIsTimed(true);
      }
      if (Number(exercise.gymEquipment.$numberInt) === 58) {
        setIsAssisted(true);
      }
    }
  }, [exercise]);

  const handleInputChangeRepsWeights = (exercise, index, set, event) => {
    const { name, value } = event.target;
    console.log(name, value);
    set[name] = value;
    props.handleInputChangeRepsWeights(exercise, set);
  };

  const toggleCompleted = (exercise, set) => {
    set.completed = !set.completed;
    setSetcomplete(!setComplete);
    props.setSetCompleted(exercise, set);
  };

  const onClickRemoveSet = (exercise, index) => {
    props.onClickRemoveSet(exercise, index);
  };

  return (
    <>
      {set && (
        <tr bgcolor={setComplete ? "seagreen" : null}>
          <td className="text-center">
            {!setComplete ? (
              <i
                className="fal fa-trash-alt fa-grey addCursor"
                onClick={() => onClickRemoveSet(exercise, set.index)}
              ></i>
            ) : (
              <i className="fal fa-trash-alt fa-transparent"> </i>
            )}
          </td>
          <td className="text-center">
            <p className="text-white littleBottomMargin">
              <strong>{i + 1}</strong>
            </p>
          </td>
          <td className="text-center">
            {location !== "create-routine" ? (
              <NumberFormat
                value={isTimed ? set.duration : set.weight}
                format={isTimed ? "##:##" : isAssisted ? "-###" : "###"}
                name={isTimed ? "duration" : "weight"}
                placeholder={isTimed ? "00:00" : "-"}
                disabled={setComplete ? true : false}
                className={
                  setComplete
                    ? "form-control form-control-sm greenInput lbsRepInput"
                    : "form-control form-control-sm veryDarkInput lbsRepInput"
                }
                onChange={(e) =>
                  handleInputChangeRepsWeights(exercise, i, set, e)
                }
              />
            ) : (
              <NumberFormat
                format={isTimed ? "##:##" : isAssisted ? "-###" : "###"}
                name={isTimed ? "duration" : "weight"}
                placeholder={isTimed ? "00:00" : "-"}
                disabled={setComplete ? true : false}
                className={
                  setComplete
                    ? "form-control form-control-sm greenInput lbsRepInput"
                    : "form-control form-control-sm veryDarkInput lbsRepInput"
                }
                onChange={(e) =>
                  handleInputChangeRepsWeights(exercise, i, set, e)
                }
              />
            )}
          </td>
          <td className="text-center">
            {location !== "create-routine" ? (
              <NumberFormat
                value={isDistance ? set.distance : set.reps}
                format={isDistance ? "##.##" : "###"}
                name={isDistance ? "distance" : "reps"}
                placeholder={isDistance ? "00.00" : "-"}
                disabled={setComplete ? true : false}
                className={
                  setComplete
                    ? "form-control form-control-sm greenInput lbsRepInput"
                    : "form-control form-control-sm veryDarkInput lbsRepInput"
                }
                onChange={(e) =>
                  handleInputChangeRepsWeights(exercise, i, set, e)
                }
              />
            ) : (
              <NumberFormat
                format={isDistance ? "##.##" : "###"}
                name={isDistance ? "distance" : "reps"}
                placeholder={isDistance ? "00.00" : "-"}
                disabled={setComplete ? true : false}
                className={
                  setComplete
                    ? "form-control form-control-sm greenInput lbsRepInput"
                    : "form-control form-control-sm veryDarkInput lbsRepInput"
                }
                onChange={(e) =>
                  handleInputChangeRepsWeights(exercise, i, set, e)
                }
              />
            )}
          </td>
          {location === "routine-active" && (
            <td className="text-center">
              <i
                className="fas fa-check-square fa-grey addCursor"
                onClick={() => toggleCompleted(exercise, set)}
              ></i>
            </td>
          )}
        </tr>
      )}
    </>
  );
};

export default Set;
