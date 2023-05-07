function footer(containerId, info) {
    const container = document.getElementById(containerId);
    if (container == undefined | container == null) {
        console.error(`Interesting Block: Error container, conteiner ID = ${containerId}`)
        return
    }

    let logo = info.header_logo || 'Logo'
    let address = info.address || 'address'
    let tel = info.tel || 'tel'
    let email = info.email || 'email'

    container.innerHTML += `
    <div class="container">
    <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="footer__about">
            <div class="footer__about__logo">
                <a href="./index.html"><span>${logo}</span></a>
            </div>
            <ul>
                <li>Адреса: ${address}</li>
                <li>Тел: ${tel}</li>
                <li>Email: ${email}</li>
            </ul>
        </div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
        <div class="footer__widget">
            <h6>Корисні посилання</h6>
            <ul>
                <li><a href="#">Про нас</a></li>
                <li><a href="#">Про наш магазин</a></li>
                <li><a href="#">Безпечні покупки</a></li>
                <li><a href="#">Доставка</a></li>
                <li><a href="#">Політика приватності</a></li>
                <li><a href="#">Карта сайту</a></li>
            </ul>
            <ul>
                <li><a href="#">Хто ми</a></li>
                <li><a href="#">Наш сервіс</a></li>
                <li><a href="#">Проекти</a></li>
                <li><a href="#">Контакти</a></li>
                <li><a href="#">Інновації</a></li>
                <li><a href="#">Відгуки</a></li>
            </ul>
        </div>
    </div>
    <div class="col-lg-4 col-md-12">
        <div class="footer__widget">
            <h6>Підпишіться на нашу розсилку</h6>
            <p>Отримуйте оновлення електронною поштою про спеціальні пропозиції.</p>
            <form action="#">
                <input type="text" placeholder="Введіть ваш емеіл">
                <button type="submit" class="site-btn">Підписатися</button>
            </form>
            <div class="footer__widget__social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-instagram"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-pinterest"></i></a>
            </div>
        </div>
    </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="footer__copyright">
                <div class="footer__copyright__text"><p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p></div>
                <div class="footer__copyright__payment"><img src="img/payment-item.png" alt=""></div>
            </div>
        </div>
    </div>
    </div>
    `
}



