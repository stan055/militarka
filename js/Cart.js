
class Cart {
    
    constructor() {
        this.data = JSON.parse(localStorage.getItem("CART")) || [];
        this.headerCart = document.querySelectorAll(".shopping-cart-li");
        this.headerPartPrice = document.querySelectorAll(".header__cart__price");
        this.render();
    }
    
    // Set cart.length to head icon
    render() {
        const totalPrice = this.subtotal().totalPrice.toFixed(2);
        
        this.headerCart.forEach(element => {
            element.innerHTML = `            
            <li><a href="./shoping-cart.html"><i class="fa fa-shopping-bag"></i> <span>${this.data.length}</span></a></li>
        `
        });
        this.headerPartPrice.forEach(element => {
            element.innerHTML = `
                прайс: <span>${totalPrice}₴</span>
            `;
        });
    };
    
    // Save data to local storage
    save() {
        localStorage.setItem("CART", JSON.stringify(this.data));
    }

    // Add Product
    addProduct(product) {
        const faShoppingBag = document.querySelectorAll('.fa.fa-shopping-bag');
        this.data.push({
            ...product,
            numberOfUnits: 1
        });

        this.save();
        this.render();
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
        console.log(this.data);
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

    // Remove item from cart
    remove(id) {
        const index = this.data.findIndex(element => element.id === id);
        if (index !== -1) this.data.splice(index, 1);
        this.save();
        this.render();
    }

    // Calculate subtotal
    subtotal() {
        let totalPrice = 0,
            totalItems = 0;
    
        this.data.forEach((item) => {
            totalPrice += item.price * item.numberOfUnits;
            totalItems += item.numberOfUnits;
        });
    
        return {totalPrice, totalItems};
    }
}

