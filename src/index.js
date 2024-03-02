import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./components/Auth/auth0-provider-with-history";
import ExercisesStore from "./ExercisesStore";
import "./index.css";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <ExercisesStore>
        <App />
      </ExercisesStore>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
