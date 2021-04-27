import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startCase } from 'lodash';

import '../../App.css';
import styles from "./EmployeeExplorer.module.css";

import { setName, selectName, selectStatus, selectEmployees, fetchEmployeeAsync } from "./employeeExplorerSlice";

function showDirectSubordinates(currentName, employees) {
    return employees[currentName]?.subordinates?.map((subordinate) => <div key={subordinate}><span className="App-section-content-text">{subordinate}</span></div>);
};

function showAllSubordinates(currentName, employees) {
    const allSubordinates = {};

    const populateSubordinates = (name, employees, refSubordinates) => {
        refSubordinates[name] = (<div key={name}><span className="App-section-content-text">{name}</span></div>);
        employees[name]?.subordinates.forEach((subordinate) => {
            populateSubordinates(subordinate, employees, refSubordinates);
        });
    };

    employees[currentName]?.subordinates.forEach((subordinate) => {
       populateSubordinates(subordinate, employees, allSubordinates);
    });

    return Object.values(allSubordinates);
};

export function EmployeeOverview() {
    let { name } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const currentName = useSelector(selectName);
    const employees = useSelector(selectEmployees);
    const [ showAll, setShowAll ] = useState(false);

    useEffect(() => {
        dispatch(setName(name));
        dispatch(fetchEmployeeAsync(name));
    }, [name, dispatch]);

    return (
        <div>
            <div className="App-section-header">
                <span className="App-section-text">Employee Overview</span>
            </div>
            <div className="App-section-content">
                {status === 'invalid' ?
                    <span className="App-section-content-text">{`Unable to find employee ${currentName}`}</span> :
                    <div className="App-section-content-result">
                        <span className="App-section-content-text">{`Subordinates of employee ${startCase(currentName)}:`}</span>
                        <div className="App-section-content-list">
                            {showAll ?
                                showAllSubordinates(currentName, employees) :
                                showDirectSubordinates(currentName, employees)
                                }
                            {employees[currentName]?.subordinates.length === 0 && (<div><span className="App-section-content-text">None</span></div>)}
                        </div>
                    </div>
                }
            </div>
            <div className="App-section-content">
                <button
                    className={styles.button}
                    onClick={() => history.push(`/`)}
                >
                    Back
                </button>
                {!showAll && status !== 'invalid' && (<button
                    className={styles.button}
                    onClick={() => setShowAll(true)}
                >
                    Show All
                </button>)}
            </div>
        </div>
    );
}
