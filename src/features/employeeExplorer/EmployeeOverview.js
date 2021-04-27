import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startCase } from 'lodash';

import '../../App.css';
import styles from "./EmployeeExplorer.module.css";

import { setName, selectName, selectStatus, selectDetails, fetchEmployeeAsync } from "./employeeExplorerSlice";


export function EmployeeOverview() {
    let { name } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const currentName = useSelector(selectName);
    const details = useSelector(selectDetails);

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
                            {details
                                .directSubordinates?.map((subordinate) => <div><span className="App-section-content-text">{subordinate}</span></div>)}
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
            </div>
        </div>
    );
}
