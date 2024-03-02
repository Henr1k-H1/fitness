import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutinesExercise from "./RoutinesExercise";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      const userID = user.sub.split("|")[1];
      axios
        .get(
          "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getRoutinesByUserId?userID=" +
            userID
        )
        .then((res) => {
          const data = res.data;
          setRoutines(data);
        })
        .catch((error) => console.log(error));
    }
  }, [user, setRoutines]);

  return (
    <>
      <div className="row">
        <div className="col">
          <Link className="btn btn-secondary btn100 mb-3" to="/create-routine">
            <i className="fal fa-clipboard-list fa-blue fa-lg fa-fw"></i> New
            Routine
          </Link>
          <h5>
            <strong>My Routines</strong>
          </h5>
        </div>
      </div>
      {routines && (
        <div className="row">
          <div className="col">
            {routines.length > 0 ? (
              routines.map((routine) => (
                <RoutinesExercise key={routine.id} routine={routine} />
              ))
            ) : (
              <div className="text-center">
                <i className="fas fa-list-ol fa-3x fa-blue"></i>
                <h5 className="mt-3">
                  <strong>Get started</strong>
                </h5>
                <p className="text-muted">
                  Start by creating a new workout routine.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Routines;
