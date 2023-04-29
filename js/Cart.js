
class Cart {
    
    constructor() {
        this.data = this.localData();
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
                <li><a href="./shoping-cart.html"><i class="fa fa-shopping-bag"></i><span>${this.data.length}</span></a></li>`;
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
    
    // Save data to local storage
    save() {
        localStorage.setItem("CART", JSON.stringify(this.data));
    }

    // Add Product
    addProduct(product) {
        if (product) {
            this.data.push({
                ...product,
                numberOfUnits: 1
            });
    
            this.save();
            this.render();
        }
    }
    
    // Add To Cart
    addToCart(id, products) {
        if (this.data.some((item) => item.id === id)) {
            this.changeNumberOfUnits('plus', id);
        } else {
            const item = products.find((product) => product.id === id);
            this.data.push({
                ...item,
                numberOfUnits: 1
            });
        }
        this.save();
        this.render();
    }

    // Change number of units
    changeNumberOfUnits(action, id) {
        this.data = this.data.map((item) => {
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
        let value = this.data[index].numberOfUnits;
        if (action === 'minus') value--;
        if (action === 'plus') value++;
        this.data[index].numberOfUnits = value;
        this.save();
        return value;
    }

    // Remove item from cart
    remove(id) {
        const index = this.data.findIndex(element => element.id === id);
        if (index !== -1) this.data.splice(index, 1);
        this.save();
        this.render();
    }

    removeByIndex(index) {
        this.data.splice(index, 1);
        this.save();
        this.render();
    }

    // Return sum
    get sum() {
        return  this.data.reduce((accumulator, product) => 
            (accumulator + product.price * product.numberOfUnits), 0);
    }

    // Return quantity of items
    get quantity() {
        return  this.data.reduce((accumulator, product) => 
        (accumulator + product.numberOfUnits), 0);
    }

    clear() {
        localStorage.clear();
        this.data = [];
    }

    localData() {
        return JSON.parse(localStorage.getItem("CART")) || [];
    }
}

