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

export let bd_url = 'https://64022bef302b5d671c34bef5.mockapi.io/api/v1/film';