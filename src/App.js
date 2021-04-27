import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import logo from './logo_additiv.png';
import './App.css';

import { EmployeeExplorer } from './features/employeeExplorer/EmployeeExplorer';
import { EmployeeOverview } from './features/employeeExplorer/EmployeeOverview';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/*<p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>*/}
      </header>
      <Router>
        <Switch>
            <Route exact path="/">
                <EmployeeExplorer />
            </Route>
            <Route path="/overview/:name">
                <EmployeeOverview />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
