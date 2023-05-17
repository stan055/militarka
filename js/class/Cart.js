
class Cart {
    
    constructor() {
        this.products = this.localData();
        this.headerCart = document.querySelectorAll(".shopping-cart-li");
        this.headerSum = document.querySelectorAll(".header__cart__price");
        this.render();
    }
    
    // Set cart.length to head icon
    render() {
        try {
            const totalPrice = this.sum.toFixed(2);
            this.headerCart.forEach(element => {
                element.innerHTML = `            
                <li><a href="./shoping-cart.html"><i class="fa fa-shopping-bag"></i><span>${this.products.length}</span></a></li>`;
            });
            this.headerSum.forEach(element => {
                element.innerHTML = `
                    сумма: <span>${totalPrice}₴</span>
                `;
            });           
        } catch (error) {
            console.log('Catch Error => Cart.render()', error);            
        }

    };
    
    // Save products to local storage
    save() {
        localStorage.setItem("CART", JSON.stringify(this.products));
    }

    // Add Product
    addProduct(product) {
        if (product) {
            this.products.push({
                ...product,
                numberOfUnits: 1
            });
    
            this.save();
            this.render();
        }
    }
    
    // Add To Cart
    addToCart(id, products) {
        if (this.products.some((item) => item.id === id)) {
            this.changeNumberOfUnits('plus', id);
        } else {
            const item = products.find((product) => product.id === id);
            this.products.push({
                ...item,
                numberOfUnits: 1
            });
        }
        this.save();
        this.render();
    }

    // Change number of units
    changeNumberOfUnits(action, id) {
        this.products = this.products.map((item) => {
            let numberOfUnits = item.numberOfUnits;
            if (item.id === id) {
                if (action === 'minus' && numberOfUnits > 1) numberOfUnits--;

                if (action === 'plus' && numberOfUnits < item.instock) numberOfUnits++;
            }
            return {
                ...item,
                numberOfUnits
            };
        });
        this.save();
    }

    // Change number of units by index
    changeQuantityByIndex(action, index) {
        let value = this.products[index].numberOfUnits;
        if (action === 'minus') value--;
        if (action === 'plus') value++;
        this.products[index].numberOfUnits = value;
        this.save();
        return value;
    }

    // Remove item from cart
    remove(id) {
        const index = this.products.findIndex(element => element.id === id);
        if (index !== -1) this.products.splice(index, 1);
        this.save();
        this.render();
    }

    removeByIndex(index) {
        this.products.splice(index, 1);
        this.save();
        this.render();
    }

    // Return sum
    get sum() {
        return  this.products.reduce((accumulator, product) => 
            (accumulator + product.price * product.numberOfUnits), 0);
    }

    // Return quantity of items
    get quantity() {
        return  this.products.reduce((accumulator, product) => 
        (accumulator + product.numberOfUnits), 0);
    }

    clear() {
        localStorage.clear();
        this.products = [];
    }

    localData() {
        return JSON.parse(localStorage.getItem("CART")) || [];
    }
}

