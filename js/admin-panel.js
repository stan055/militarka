
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.admin-menu li')
    console.log(items)
    items.forEach(element => {
        element.addEventListener('click', event => {
            switch(event.target.getAttribute('value')) {
                case 'general':
                    document.querySelectorAll('.admin-main-item').forEach(element => {
                        element.classList.add('hide')
                    })
                    document.getElementById('general').classList.remove('hide')
                    break
                case 'add_product':
                    document.querySelectorAll('.admin-main-item').forEach(element => {
                        element.classList.add('hide')
                    })
                    document.getElementById('add_product').classList.remove('hide')
                    break
                default:
                    break
            }
        })
    });
})