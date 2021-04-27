import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';

import styles from './EmployeeExplorer.module.css';
import '../../App.css';

export function EmployeeExplorer() {
    let history = useHistory();
    const [name, setName] = useState(null);

    const redirectToOverview = () => {
      if (!isEmpty(name)) {
          history.push(`/overview/${name}`);
      }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            redirectToOverview();
        }
    };

    return (
        <div>
            <div className="App-section-header">
                <span className="App-section-text">Employee Explorer</span>
            </div>
            <div className="App-section-content">
                <input
                    className={styles.textbox}
                    aria-label="Type employee name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={onKeyPress}
                />
                <button
                    className={styles.button}
                    onClick={() => redirectToOverview()}
                >
                    Search
                </button>
            </div>
        </div>
    );
}
