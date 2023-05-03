class PopupCart {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.validation(this.container, containerId);
    }
    render(data) {
        let table = this.renderTable(data);
        this.container.innerHTML += this.renderCart(table);
    }
    show(overlayId, bodyId) {
        try {
            this.container.classList.add('popup-open');
            document.getElementById(overlayId).classList.add('visible');
            document.getElementById(bodyId).classList.add('stop-scrolling');    
        } catch (error) {
            console.error(error);
        }
    }
    hide() {

    }
    validation(element, elementId) {
        if (element == undefined | element == null) {
            console.error(`PopupCart: Error element, elementId: ${elementId}`);
            return false;
        }
        return true;
    }
    renderCart(table) {
        return `
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
                        <tbody>
                        ${table}
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
                        <li>Сумма <span id="subtotal">${cart.sum}₴</span></li>
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
    renderTable(data) {
        let table = ``;
        data.forEach(product => {
            table += `
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
                                <span class="qtybtn" id="qtybtn_minus_${product.id}">-</span>
                                <input type="text" id="cart_input_${product.id}" value="${product.numberOfUnits}">
                                <span class="qtybtn" id="qtybtn_plus_${product.id}">+</span>
                            </div>
                        </div>
                    </td>
                    <td class="shoping__cart__price">
                    ${product.price}
                    </td>
                    <td class="shoping__cart__item__close">
                        <span class="icon_close" id="cart_remove_${product.id}"></span>
                    </td>
                </tr>
            `;
            document.getElementById(`qtybtn_minus_${product.id}`).addEventListener('click', event => {
                console.log(event.target);
            });
            
        });
        return table;
    };
};
