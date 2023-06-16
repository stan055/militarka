
document.addEventListener("DOMContentLoaded", () => {
    const database = new Database();
    database.getDatabase()
    .then((data) => {
        setLogo(data.info.header_logo)
    });

    const menuItems = document.querySelectorAll('.admin-menu li')
    const iframe = document.querySelector('iframe')
    if (window.login == undefined) {
        window.login = new Login()      
    }
    if (window.login.user.type != 'admin') {
        iframe.src = 'login.html'
    }
    
    menuItems.forEach(element => {
        element.addEventListener('click', event => {
            iframe.src = event.target.getAttribute('src')})
    })
})

function setLogo(headerLogo) {
    document.getElementById('logo').innerText = headerLogo
}