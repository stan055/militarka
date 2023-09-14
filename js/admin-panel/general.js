document.addEventListener("DOMContentLoaded", () => {
    if (window.parent.length == 1) {
        const login = new Login()
        if (login.user.type == 'admin') {
            btnListeners()
        }
        else {
            window.location.href = './login' //load to ./admin-panel
        }
    } 
    else {
        window.location.href = './' //load to ./admin-panel  
    }  
})

function btnListeners () {
    document.getElementById('nameBtn').addEventListener('click', () => {
        const name = document.getElementById('inputName').value
        const regexName = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        if (regexName.test(name)){
            document.getElementById('inputNameError').classList.add('hide')
            alert('Логін адміністратора успішно змінений')
        } else {
            document.getElementById('inputNameError').classList.remove('hide')
        }
    })
}

