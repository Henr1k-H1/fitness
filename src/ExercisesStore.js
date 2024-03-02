import React, { useState, useEffect } from "react";
import axios from "axios";

export const ExercisesContext = React.createContext();

const ExercisesStore = ({ children }) => {
  const [availableExercises, setAvailableExercises] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getAllExercises"
      )
      .then((res) => {
        const data = res.data;
        setAvailableExercises(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ExercisesContext.Provider
      value={[availableExercises, setAvailableExercises]}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesStore;
