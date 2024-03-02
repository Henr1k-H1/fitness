import React, { useState, useEffect } from "react";
import LogExercise from "./LogExercise";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Log = (props) => {
  const { user } = useAuth0();

  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (user) {
      const userID = user.sub.split("|")[1];
      axios
        .get(
          "https://us-east-1.aws.data.mongodb-api.com/app/fitness-chtxe/endpoint/getLoggedRoutinesByUserId?userID=" +
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
          <h4 className="mb-3">
            <strong>Completed Routines</strong>
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {routines.length > 0 ? (
            routines.map((routine, i) => (
              <div className="card mb-2 mt-2 innerCard" key={i}>
                <div className="card-body">
                  <LogExercise routine={routine} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-4">
              <i className="fas fa-list-ol fa-3x fa-blue"></i>
              <h5 className="mt-3">
                <strong>Get started</strong>
              </h5>
              <p className="text-muted">Complete your first workout</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Log;
