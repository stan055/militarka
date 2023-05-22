
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll('.admin-menu li')
    const iframe = document.querySelector('iframe')
    
    menuItems.forEach(element => {
        element.addEventListener('click', event => {
            iframe.src = event.target.getAttribute('src')
        })
    });
})