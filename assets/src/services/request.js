import qs from 'query-string';
import 'whatwg-fetch';
import config from '../configs';

const urlPrefix = config.apiPath;

function filterStatus(res) {
    const status = res.status;
    const statusText = res.statusText;

    if (status >= 200 && status < 300) {
        return res;
    }
    return res.json().then(body => {
        let error = new Error(statusText);
        error.body = body;
        error.type = 'http';
        error.status = status;
        throw error;
    });
}

function filterJSON(res) {
    return res.json(); // res.json() 是一个promise
}

export function get(url, params) {
    url = urlPrefix + url;
    if (params) {
        url += `?${qs.stringify(params)}`;
    }

    return fetch(url)
        .then(filterStatus)
        .then(filterJSON);
}


export function post(url, body) {
    url = urlPrefix + url;
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(filterStatus)
        .then(filterJSON);
}

export function put(url, body) {
    url = urlPrefix + url;
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(filterStatus)
        .then(filterJSON);
}

export function del(url, body) {
    url = urlPrefix + url;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(filterStatus)
        .then(filterJSON);
}
