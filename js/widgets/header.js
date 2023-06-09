
// Render header with container id and info email, free-shipping text, logo text
// li* = active - Activated menu item 
function header(id, info, user=null, li1='',li2='',li3='',li4='') {
    const header = document.getElementById(id);
    let userType = 'guest'
    try {
        userType = user.type
    } catch (error) {
        console.error(error)
    }

    header.innerHTML = `
    <div class="header__top">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="header__top__left">
                    <ul>
                    <li><i class="fa fa-envelope"></i> ${info.email}</li>
                    <li>${info.free_shipping}</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="header__top__right">
                    <div class="header__top__right__social">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-pinterest-p"></i></a>
                    </div>
                    <div class="header__top__right__language">
                        <img src="img/ukr_flag.png" alt="">
                        <div>Українська</div>
                        <span class="arrow_carrot-down"></span>
                    </div>
                    <div class="header__top__right__auth">
                        <a href="#" id="login_form_btn"><i class="fa fa-user"></i> ${userType=='guest'?'Увійти':'Вийти'}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <div class="header__logo">
                <a href="./index.html"><span>${info.header_logo}</span></a>
                </div>
            </div>
            <div class="col-lg-6">
                <nav class="header__menu">
                    <ul>
                        <li class="${li1}"><a href="./index.html">Головна</a></li>
                        <li class="${li2}"><a href="./shop-grid.html">Магазин</a></li>
                        <li class="${li3}"><a href="#">Сторінки</a>
                            <ul class="header__menu__dropdown">
                                <li><a href="./product.html">product.html</a></li>
                                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                <li><a href="./checkout.html">Check Out</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li class="${li4}"><a href="./contact.html">Контакти</a></li>
                        ${userType=='admin'?'<li><a href="./admin-panel/index.html">Адмін Панель</a></li>':''}
                    </ul>
                </nav>
            </div>
            <div class="col-lg-3">
                <div class="header__cart">
                    <ul>
                        <li><a href="#"><i class="fa fa-heart"></i> <span>0</span></a></li>
                        <li class="shopping-cart-li"><a href="./shoping-cart.html"><i class="fa fa-shopping-bag"></i> <span>-0</span></a></li>
                    </ul>
                    <div class="header__cart__price">прайс: <span>₴0.00</span></div>
                </div>
            </div>
        </div>
        <div class="humberger__open">
            <i class="fa fa-bars"></i>
        </div>
    </div>
    `;
}