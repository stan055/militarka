document.addEventListener("DOMContentLoaded", () => {
    if (window.parent.length == 0) window.location.href = './' //load to ./admin-panel
    if (window.login == undefined) window.login = new Login()      
    if (window.login.user.type == 'admin') window.parent.location.reload() //load to ./admin-panel

    database = new Database();
    database.getDatabase()
    .then((data) => {
        loginForm('login_popup_form', 'login_form_btn', data.login)
    });
})