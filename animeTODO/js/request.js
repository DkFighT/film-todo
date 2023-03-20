// получить запрос с сервера
export function getRequest(url) {
    return fetch(url).then(response => { return response.json(); })
}
// отправить запрос на сервер
export function sendRequest(url, method, body) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
}