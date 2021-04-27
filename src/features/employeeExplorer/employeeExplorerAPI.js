export function checkStatus(response) {
    if (response.status === 200) {
        return response.json();
    } else {
        return Promise.reject(response.status);
    }
};

export function fetchEmployee(name) {
    return fetch(`http://api.additivasia.io/api/v1/assignment/employees/${name}`)
        .then(checkStatus);
};
