import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./components/Auth/protected-route";
import Loading from "./components/Auth/Loading";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./components/Auth/LoginButton";
import LogoutButton from "./components/Auth/LogoutButton";

import Routines from "./Routines";
import Routine from "./Routine";
import RoutineEdit from "./RoutineEdit";
import Exercises from "./Exercises";
import ExerciseDetail from "./ExerciseDetail";
import RoutineCreate from "./RoutineCreate";
import RoutineActive from "./RoutineActive";
import Log from "./Log";
import Profile from "./Profile";

function App() {
  const { isLoading } = useAuth0();
  const { isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container pageBG">
          <Link className="navbar-brand" to="/">
            <h4>
              <strong>H1</strong>
            </h4>
          </Link>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav text-center">
              <li className="nav-item ">
                <Link className="nav-link" to="/routines">
                  <i className="fal fa-clipboard-list fa-fw"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/exercises">
                  <i className="fal fa-dumbbell fa-fw"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/log">
                  <i className="fal fa-clock fa-fw"></i>
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="fal fa-user-circle fa-fw"></i>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <LoginButton />
                    <LogoutButton />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container pageBG">
        <Switch>
          <ProtectedRoute exact path="/" component={Routines}></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/routines"
            component={Routines}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/create-routine"
            component={RoutineCreate}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/routine/:id"
            component={Routine}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/routine-edit/:id"
            component={RoutineEdit}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/routine-active"
            component={RoutineActive}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/exercises"
            component={Exercises}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/exercise/:id"
            component={ExerciseDetail}
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
          ></ProtectedRoute>
          <ProtectedRoute path="/log" component={Log}></ProtectedRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
