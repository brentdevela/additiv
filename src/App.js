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
