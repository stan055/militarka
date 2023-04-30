
// Render header with container id and info email, free-shipping text, logo text
function headerWidget(id, info) {
    const header = document.getElementById(id);
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
                        <img src="img/Flag_of_Ukraine_mini.png" alt="">
                        <div>Українська</div>
                        <span class="arrow_carrot-down"></span>
                    </div>
                    <div class="header__top__right__auth">
                        <a href="#"><i class="fa fa-user"></i> Вхід</a>
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
                        <li class="active"><a href="./index.html">Головна</a></li>
                        <li><a href="./shop-grid.html">Магазин</a></li>
                        <li><a href="#">Сторінки</a>
                            <ul class="header__menu__dropdown">
                                <li><a href="./product.html">product.html</a></li>
                                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                <li><a href="./checkout.html">Check Out</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="./contact.html">Контакти</a></li>
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