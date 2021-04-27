import {isEmpty} from "lodash";

export function checkStatus(response) {
    if (response.status === 200) {
        return response.json();
    } else {
        return Promise.reject(response.status);
    }
};

export function fetchEmployee(name)  {
    return fetch(`http://api.additivasia.io/api/v1/assignment/employees/${name}`)
        .then(checkStatus)
        .then(response => {
            const [position, subordinates = { 'direct-subordinates': [] } ] = response;
            return {
                name,
                position,
                subordinates: subordinates["direct-subordinates"],
            };
        });
};

export async function* fetchEmployeeTree(employeeName) {
    const response = await fetchEmployee(employeeName);
    yield response;

    for (let subordinate of response.subordinates) {
        for await (const employee of fetchEmployeeTree(subordinate)) {
            yield employee;
        }
    }
};
