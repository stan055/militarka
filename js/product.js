
let cart, product;
const overlay = document.getElementById('overlay');
const popupCart = document.getElementById('popupCart');
const body = document.getElementsByTagName('body');
const tableBody = document.querySelector('.shoping__cart__table > table > tbody');

document.addEventListener("DOMContentLoaded", () => {

    getDatabase().then(data => {
        renderHeader(data.info);
        renderHeroMenu(data.categories);

        const productId = getURLparameter('id');
        product = getProductById(productId, data.products);
        renderProductDetails();
        cart = new Cart();
    });

    overlay.addEventListener("click", (e) => closePopupCart()); // Close popup by click overlay

});



//Product remove by Index from the cart data
function remove(index) {
    cart.removeByIndex(index);
    renderPopupCart();
}

// Quantity button 
function qtybtn(action, index) {
    let value = cart.data[index].numberOfUnits;
    if (action === 'minus' && value === 1) return;
    
    value = cart.changeQuantityByIndex(action,index);
    document.getElementById(`cart_input_${index}`).value = value;
    renderSubtotal();
}

function renderPopupCart() {
    renderCartTable();
    renderSubtotal();
}

function renderCartTable() {
    tableBody.innerHTML = ``;
    cart.data.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td class="shoping__cart__item">
                    <img src="${item.imgSrc[0]}" style="height: 6em;" alt="">
                </td>
                <td>
                <p>${item.name}</p>
                </td>
                <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <span class="qtybtn" onclick="qtybtn('minus', ${index})">-</span>
                            <input type="text" id="cart_input_${index}" value="${item.numberOfUnits}">
                            <span class="qtybtn" onclick="qtybtn('plus', ${index})">+</span>
                        </div>
                    </div>
                </td>
                <td class="shoping__cart__price">
                ${item.price}
                </td>
                <td class="shoping__cart__item__close">
                    <span class="icon_close" onclick="remove(${index})"></span>
                </td>
            </tr>
        `
    });
}

function renderSubtotal() {
    document.getElementById("checkout_sum").innerHTML = `${cart.sum}₴`;
}

function addToCart() {
    try {
        cart.addProduct(product);
    } catch (error) {
        console.log(error);
        return;
    }

    renderPopupCart();
    openPopupCart();
}

function openPopupCart() {
    popupCart.classList.add('popup-open');
    overlay.classList.add('visible');
    body[0].classList.add('stop-scrolling');
}

function closePopupCart() {
    popupCart.classList.remove('popup-open');
    overlay.classList.remove('visible');
    body[0].classList.remove('stop-scrolling');
}

// Return product by Id from products database
function getProductById(id, data = []) {
    try {
        const product = data.find(element => element.id == id);
        return product;
    } catch (error) {
        console.log(error);
    }
}

function renderProductDetails() {
    if (!product) return;

    const productDetailsEl = document.querySelector(".product-details > .container > .row");

    const picturesHtml = renderPicturesHtml(product.imgSrc);
    const textHtml = renderTextHtml();
    const descriptionHtml = renderDescriptionHtml();
    productDetailsEl.innerHTML = picturesHtml + textHtml + descriptionHtml;
    productDetailsStartImgSlider();
    productDetailsPicSliderImg();
}

function renderPicturesHtml(imgSrc) {
    let sliderInnerHtml = ``;
    imgSrc.forEach(img => {
        sliderInnerHtml += `
        <img data-imgbigurl="${img}"
                src="${img}" alt="">
        `;
    });
    return `
    <div class="col-lg-6 col-md-6">
    <div class="product__details__pic">
        <div class="product__details__pic__item">
            <img class="product__details__pic__item--large"
                src="${imgSrc[0]}" alt="">
        </div>
        <div class="product__details__pic__slider owl-carousel">
            ${sliderInnerHtml}
        </div>
    </div>
    </div>
    `;
}

function renderTextHtml() {
    return `
    <div class="col-lg-6 col-md-6">
    <div class="product__details__text">
        <h3>${product.name}</h3>
        <div class="product__details__rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-half-o"></i>
            <span>(18 reviews)</span>
        </div>
        <div class="product__details__price">${product.price}₴</div>
        <p>${product.description.slice(0, 50)}</p>
        <div class="product__details__quantity">
            <div class="quantity">
                <div class="pro-qty">
                    <input type="text" value="1">
                </div>
            </div>
        </div>
        <button type="button" id="addToCartBtn" class="primary-btn" onclick="addToCart()">ДОДАТИ В КОШИК</button>
        <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
        <ul>
            <li><b>Наявність</b> <span>Так</span></li>
            <li><b>Доставка</b> <span>Так.</li>
            <li><b>Вага</b> <span>0.5 кг</span></li>
            <li><b>Поділитись</b>
                <div class="share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-pinterest"></i></a>
                </div>
            </li>
        </ul>
    </div>
    </div>
    `
}

function renderDescriptionHtml() {
    return `
    <div class="col-lg-12">
    <div class="product__details__tab">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                    aria-selected="true">Опис</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="tabs-1" role="tabpanel">
                <div class="product__details__tab__desc">
                    <h6>Загальни Інформація</h6>
                    <p>${product.description}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    `;
}



