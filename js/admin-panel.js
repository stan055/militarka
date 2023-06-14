
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('.admin-menu li')
    const iframe = document.querySelector('iframe')
    
    database = new Database();
    database.getDatabase()
    .then((data) => {
        if (window.login == undefined) {
            window.login = new Login()      
        }

        if (window.login.user.type == 'admin') {
            menuItems.forEach(element => {
                element.addEventListener('click', event => {
                    iframe.src = event.target.getAttribute('src')
                })
            });
        } else {
            iframe.src = './login.html'
            // loginForm('login_popup_form', 'login_form_btn', data.login)
        }
    })
})