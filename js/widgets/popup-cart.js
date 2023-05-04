class PopupCart {
    bodyId = 'body';
    overlayId = 'overlay';

    constructor(containerId, cart) {
        if (cart == undefined | cart == null) console.error(`PopupCart Error: cart=${cart}`);
        this.cart = cart;
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.validation(this.container, containerId);
    }

    render() {
        this.renderCart(this.container);
        const table = document.getElementById('popup_cart_tbody');
        this.renderTable(table, this.cart.products);
        this.addListeners(this.cart.products);
    }

    show() {
        try {
            this.container.classList.add('popup-open');
            document.getElementById(this.overlayId).classList.add('visible');
            document.getElementById(this.bodyId).classList.add('stop-scrolling');    
        } catch (error) {
            console.error(error);
        }
    }

    hide() {
        try {
            this.container.classList.remove('popup-open');
            document.getElementById(this.overlayId).classList.remove('visible');
            document.getElementById(this.bodyId).classList.remove('stop-scrolling');            
        } catch (error) {
            console.error(error);
        }

    }

    renderCart(container) {
        container.innerHTML = ``;
        container.innerHTML += `
        <div class="row m-0 p-3 sticky-top head-popup-cart">
        <div class="col">
            <h3>Кошик</h3>
        </div>
        <div class="col">
            <button type="button" class="close fa-2x" id="cart_btn_close" aria-label="Close">
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
                        <button type="button" class="primary-btn cart-btn w-100" id="cart_btn_continue">
                            ПРОДОВЖИТИ ПОКУПКИ
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="shoping__checkout">
                    <ul>
                        <li>Сумма <span id="subtotal">${this.cart.sum}₴</span></li>
                    </ul>
                    <a href="./checkout.html">
                    <button type="button" class="primary-btn w-100">
                        Оформити замовлення
                    </button>
                    </a>
                </div>
            </div>
        </div>
        </div>
        </div>
        `;
    }

    renderTable(table) {
        table.innerHTML = ``;
        this.cart.products.forEach((product,index) => {
            table.innerHTML += `
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
                                <button class="qtybtn" id="qtybtn_minus_${index}">-</button>
                                <input type="text" id="cart_input_${index}" value="${product.numberOfUnits}">
                                <button class="qtybtn" id="qtybtn_plus_${index}">+</button>
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

    addListeners() {
        this.cart.products.forEach((product,index) => {
            document.getElementById(`qtybtn_minus_${index}`).addEventListener('click', event => {
                product.numberOfUnits = product.numberOfUnits > 0 ? product.numberOfUnits-1 : 0;
                document.getElementById(`cart_input_${index}`).value = product.numberOfUnits;
            });
            document.getElementById(`qtybtn_plus_${index}`).addEventListener('click', event => {
                product.numberOfUnits += 1;
                document.getElementById(`cart_input_${index}`).value = product.numberOfUnits;
            });
            document.getElementById(`cart_remove_${index}`).addEventListener('click', event => {
                this.cart.remove(product.id);
                this.render();
            }); 
        });
        document.getElementById(`cart_btn_close`).addEventListener('click', event => {
            this.cart.save();
            this.hide();
        });
        document.getElementById(`cart_btn_continue`).addEventListener('click', event => {
            this.cart.save();
            this.hide();
        });
        
    };

    validation(element, elementId) {
        if (element == undefined | element == null) {
            console.error(`PopupCart: Error element, elementId: ${elementId}`);
            return false;
        }
        return true;
    }
};
