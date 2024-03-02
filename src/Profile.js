import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import {
  Bar,
  BarChart,
  // LineChart,
  // Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Log = (props) => {
  const [routines, setRoutines] = useState([]);
  const { user, isAuthenticated } = useAuth0();

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

  console.log(routines)

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="card outerCard p-2">
            <div className="card-body">
              {isAuthenticated && (
                <div className="row">
                  <div className="col-4">
                    <img
                      className="img-fluid circleImg"
                      src={user.picture}
                      alt={user.name}
                    />
                  </div>
                  <div className="col-8">
                    <h5 className="mt-2">
                      <strong>Name: {user.nickname}</strong>
                    </h5>
                    <p className="text-white">Email: {user.email}</p>
                    <p className="text-muted small">
                      UID: {user.sub.split("|")[1]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="card outerCard p-2">
            <div className="card-body">
              <div className="card mb-2 mt-2 innerCard">
                <div className="card-body">
                  <BarChart width={400} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pv" fill="#007bff" />
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Log;
