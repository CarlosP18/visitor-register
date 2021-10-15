const baseUrl = 'http://localhost:4000/api';

export const fetchHelper = (data, method = 'GET') => {
    const url = `${baseUrl}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
};
