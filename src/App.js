import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chart from "./Chart";
import StudentOverview from "./StudentOverview";
import StudentDetails from "./StudentDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <StudentOverview />
        <Switch>
          <Route
            path="/StudentOverview/:name"
            component={StudentDetails}
            name=":name"
          />
          <Chart />
        </Switch>
        <footer>
          <h1>Assignment Ratings</h1>
        </footer>
      </div>
    </Router>
  );
}

export default App;
