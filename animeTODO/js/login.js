
function registration() {
    let content = document.querySelector('.form-content');
    content.innerHTML = `<div class="form-block">
    <h1 class="log">Registration</h1>
    <form onsubmit="return false" name="login" class="login-form">
        <input type="text" name="log" placeholder="Login" pattern="[a-zA-Z0-9]{5,}" required>
        <input type="text" name="name" placeholder="Name" pattern="[a-zA-Z0-9]{5,}" required>
        <input type="password" name="password" placeholder="Password" pattern="[a-zA-Z0-9]{3,}" required>
        <input type="password" name="secpassword" placeholder="One more password" pattern="[a-zA-Z0-9]{3,}" required>
        <button class="blue-button account-btn" type="submit" onclick="create_new_acc()">Sign Up</button>
        <a class ="form-link" href="javascript:login();">Sign In</a>
    </form>
</div>`;
}

function login() {
    let content = document.querySelector('.form-content');
    content.innerHTML = `<div class="form-block">
    <h1 class="log">Login</h1>
    <form onsubmit="return false;" name="login" class="login-form">
        <input type="text" name="log" placeholder="Login" pattern="[a-zA-Z0-9]{5,}" required>
        <input type="password" name="password" placeholder="Password" pattern="[a-zA-Z0-9]{3,}" required>
        <button class="blue-button account-btn" type="submit" onclick="check_acc()">Sign In</button>
        <a class ="form-link" href="javascript:registration();">No account? Registaration</a>
    </form>
</div>`;
}
function getRequest(url) {
    return fetch(url).then(response => { return response.json(); })
}
function sendRequest(url, method, body) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
}

let bd_url = 'https://64022bef302b5d671c34bef5.mockapi.io/api/v1/film';

function create_new_acc() {
    let log = document.login.log.value;
    let us_name = document.login.name.value;
    let f_password = document.login.password.value;
    let s_password = document.login.secpassword.value;
    if (f_password == s_password) {
        getRequest(bd_url).then(data => {
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (log == data[i]['login']) {
                    alert('Данный пользователь уже существует');
                    flag = true;
                    break;
                }
            }
            let body = {
                login: log,
                password: f_password,
                lists: [{
                    name: 'First list',
                    data: [{
                        name: 'You may remove or rename this list or check some info in comment!',
                        score: 10,
                        comment: 'some info',
                        status: 1
                    }]
                }],
                name: us_name
            }
            if (!flag) {
                sendRequest(bd_url, 'POST', body);
                login();
            }
        });
    }
    else {
        alert('Пароли не совпаают');
    }
    return false;
}

function check_acc() {
    getRequest(bd_url).then(profiles => {
        let log = document.login.log.value;
        let flag = false;
        for (let i = 0; i < profiles.length; i++) {
            if (log == profiles[i]['login']) {
                flag = true;
                let password = document.login.password.value;
                if (password == profiles[i]['password']) {
                    localStorage.setItem('ID', JSON.stringify(parseInt(profiles[i]['id']), 10));
                    window.location.replace(`../html/index.html`);
                }
                else {
                    alert('Неверный пароль');
                }
                break;
            }
        }
        if (!flag) {
            alert('Неверный логин или пароль');
        }
    });
    return false;
}