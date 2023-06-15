document.addEventListener("DOMContentLoaded", () => {
    if (window.parent.length == 0) window.location.href = './' //load to ./admin-panel
    
    database = new Database();
    database.getDatabase()
    .then((data) => {
        if (window.login == undefined) {
            window.login = new Login()      
        }
        loginForm('login_popup_form', 'login_form_btn', data.login)
    });
})