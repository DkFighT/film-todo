function registration() {
    let content = document.querySelector('.form-content');
    content.innerHTML = `<div class="form-block">
    <h1 class="log">Registration</h1>
    <form onsubmit="return false" name="login" class="login-form">
        <input type="text" name="log" placeholder="Login" pattern="[a-zA-Z0-9]{5,}" required>
        <input type="text" name="name" placeholder="Name" pattern="[a-zA-Z0-9]{5,}" required>
        <input type="password" name="password" placeholder="Password" pattern="[a-zA-Z0-9]{3,}" required>
        <input type="password" name="onepassword" placeholder="One more password" pattern="[a-zA-Z0-9]{3,}" required>
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

function check_acc() {
    window.location.replace(`../html/index.html`);
}