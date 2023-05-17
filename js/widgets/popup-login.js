function loginForm(containerId, openBtnId, loginData) {
    const container = document.getElementById(containerId)
    addStyle()
    addHTML()
    addListeners()

    function addListeners() {
        document.getElementById(openBtnId).addEventListener('click', () => formToggle())
        document.getElementById('login_close').addEventListener('click', () => formToggle())
        document.getElementById('overlay').addEventListener('click', () => formToggle())
        document.getElementById('login_login').addEventListener('click', () => signIn())

        function signIn() {
            try {
                const name = document.getElementById('login_name').value
                const pass = document.getElementById('login_password').value
                const user = loginData.find(user => user.name == name & user.pass == pass)
                if (user) {
                    localStorage.setItem("LOGIN", JSON.stringify(user))
                    formToggle()
                } else {
                    throw new Error('Login: User not finded');
                }
            } catch (error) {
                document.getElementById('login_error').innerHTML = 
                `<p style="color: var(--danger);">Невірний логін або пароль!</p>`
            }
        }
        
        function formToggle() {
            container.classList.toggle('hide')
            document.getElementById('overlay').classList.toggle('visible');
            document.getElementById('body').classList.toggle('stop-scrolling');   
        }
    }

    function addHTML() { 
        container.innerHTML += `
        <div class="form-popup">
            <form class="form-container">
            <h2>Вхід</h2>
            <br>
            <label for="name"><b>Імя</b></label>
            <input type="text" id="login_name" placeholder="Введіть Імя" name="name" required>

            <label for="psw"><b>Пароль</b></label>
            <input type="password" id="login_password" placeholder="Введіть Пароль" name="psw" required>
            <div id="login_error"></div>
            <button type="button" class="btn" id="login_login">Вхід</button>
            <button type="button" class="btn cancel" id="login_close">Закрити</button>
            </form>
        </div>`}

    function addStyle () { 
        const styleSheet = document.createElement("style")
        styleSheet.innerText = `
        .form-popup {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            border: 3px solid #f1f1f1;
            z-index: 9999;
            transform: translate(-50%, -50%)
        }

        .form-container {
            max-width: 300px;
            padding: 10px;
            background-color: white;
        }

        .form-container input[type=text], .form-container input[type=password] {
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            border: none;
            background: #f1f1f1;
        }

        .form-container input[type=text]:focus, .form-container input[type=password]:focus {
            background-color: #ddd;
            outline: none;
        }

        .form-container .btn {
            background-color: var(--success);
            color: white;
            padding: 16px 20px;
            border: none;
            cursor: pointer;
            width: 100%;
            margin-bottom:10px;
            opacity: 0.8;
        }

        .form-container .cancel {
            background-color: var(--danger);
        }

        .form-container .btn:hover, .open-button:hover {
            opacity: 1;
        }`
        document.head.appendChild(styleSheet)
    }
}