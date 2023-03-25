const subtotalEl = document.querySelector(".shoping__checkout > ul > li > span");
const cartItemsEl = document.querySelector(".shoping__cart__table > table > tbody");

let cart;

document.addEventListener("DOMContentLoaded", () => {

    cart = new Cart();
    renderCartItems();
    renderSubtotal();
})

// Render cart items
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.data.forEach((item) => {
        cartItemsEl.innerHTML += `
            <tr>
                <td class="shoping__cart__item">
                    <img src="${item.imgSrc}" style="height: 6em;" alt="">
                    <h5>Vegetable’s Package</h5>
                </td>
                <td class="shoping__cart__price">
                ${item.price}
                </td>
                <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <span class="qtybtn" onclick="qtybtn('minus', ${item.id})">-</span>
                            <input type="text" value="${item.numberOfUnits}">
                            <span class="qtybtn" onclick="qtybtn('plus', ${item.id})">+</span>
                        </div>
                    </div>
                </td>
                <td class="shoping__cart__total">
                ${item.price*item.numberOfUnits}
                </td>
                <td class="shoping__cart__item__close">
                    <span class="icon_close" onclick="removeItemFromCart(${item.id})"></span>
                </td>
            </tr>
        `
    });
}

// Quantyty button render 
function qtybtn(action, id) {
    cart.changeNumberOfUnits(action, id);
    renderCartItems();
    renderSubtotal();
}

// Сalculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.data.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `${totalPrice.toFixed(2)} грн.`;
}

// Remove item from cart
function removeItemFromCart(id) {
    cart.removeItemFromCart(id);
    renderCartItems();
    renderSubtotal();
}