class PopupCart {

    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.validation(this.container, containerId);
    }

    render(products) {
        this.renderCart(this.container);
        const table = document.getElementById('popup_cart_tbody');
        this.renderTable(table, products);
        this.addListeners(products);
    }

    show(bodyId, overlayId) {
        try {
            this.container.classList.add('popup-open');
            document.getElementById(overlayId).classList.add('visible');
            document.getElementById(bodyId).classList.add('stop-scrolling');    
        } catch (error) {
            console.error(error);
        }
    }

    hide(bodyId, overlayId) {
        try {
            this.container.classList.remove('popup-open');
            document.getElementById(overlayId).classList.remove('visible');
            document.getElementById(bodyId).classList.remove('stop-scrolling');            
        } catch (error) {
            console.error(error);
        }

    }

    validation(element, elementId) {
        if (element == undefined | element == null) {
            console.error(`PopupCart: Error element, elementId: ${elementId}`);
            return false;
        }
        return true;
    }

    renderCart(container) {
        container.innerHTML += `
        <div class="row m-0 p-3 sticky-top head-popup-cart">
        <div class="col">
            <h3>Кошик</h3>
        </div>
        <div class="col">
            <button type="button" class="close fa-2x" onclick="closePopupCart()" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        </div>
        <div class="cart-table">
        <div class="px-2">
        <div class="row">
            <div class="col-lg-12">
                <div class="shoping__cart__table">
                    <table>
                        <tbody id="popup_cart_tbody">
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row sticky-bottom">
            <div class="col-lg-5 align-self-end">
                <div class="shoping__continue">
                    <div class="shoping__discount">
                        <button type="button" class="primary-btn cart-btn w-100" onclick="closePopupCart()">
                            ПРОДОВЖИТИ ПОКУПКИ
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="shoping__checkout">
                    <ul>
                        <li>Сумма <span id="subtotal">${'cart.sum'}₴</span></li>
                    </ul>
                    <button type="button" onclick="closePopup()" class="primary-btn w-100">
                        Оформити замовлення
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>
        `;
    }

    renderTable(container, products) {
        products.forEach((product,index) => {
            container.innerHTML += `
                <tr>
                    <td class="shoping__cart__item">
                        <img src="${product.imgSrc[0]}" style="height: 6em;" alt="">
                    </td>
                    <td>
                    <p>${product.name}</p>
                    </td>
                    <td class="shoping__cart__quantity">
                        <div class="quantity">
                            <div class="pro-qty">
                                <span class="qtybtn" id="qtybtn_minus_${index}">-</span>
                                <input type="text" id="cart_input_${index}" value="${product.numberOfUnits}">
                                <span class="qtybtn" id="qtybtn_plus_${index}">+</span>
                            </div>
                        </div>
                    </td>
                    <td class="shoping__cart__price">
                    ${product.price}
                    </td>
                    <td class="shoping__cart__item__close">
                        <span class="icon_close" id="cart_remove_${index}"></span>
                    </td>
                </tr>
            `;
        });
    };

    addListeners(products) {
        products.forEach((product,index) => {
            document.getElementById(`qtybtn_minus_${index}`).addEventListener('click', event => {
                product.numberOfUnits = product.numberOfUnits > 0 ? product.numberOfUnits-1 : 0;
                document.getElementById(`cart_input_${index}`).value = product.numberOfUnits;
            });
            document.getElementById(`qtybtn_plus_${index}`).addEventListener('click', event => {
                product.numberOfUnits += 1;
                document.getElementById(`cart_input_${index}`).value = product.numberOfUnits;
            });
        });
    }
};
