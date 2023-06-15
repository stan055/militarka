
document.addEventListener("DOMContentLoaded", () => {

    if (window.parent.length == 1) {
        const login = new Login()
        if (login.user.type == 'admin') window.parent.location.reload() //load to ./admin-panel
        else {
            const database = new Database();
            database.getDatabase()
            .then((data) => {
                loginForm('login_popup_form', 'login_form_btn', data.login, login)
            });
        }
    } 
    else {
        window.location.href = './' //load to ./admin-panel  
    }  
})
