let cart, database, popupCart;
document.addEventListener("DOMContentLoaded", () => {
    database = new Database();
    database.getDatabase()
    .then((data) => {       
        header('header', data.info); //  Render logo, pages-menu, cart...
        hero('hero', data.categories, data.info.tel); // Render menu, search, tel
        heroBanner('home_page_slider', data.products); // Render Main Big Banner
        categorySlider('categories', data); // Render category-slider.js
        featuredProduct('featured', data); // Render featured-product.js
        vertivalSlider(data);
        interestingBlock('interesting_block', data.products);
        footer('footer', data.info)
        
        cart = new Cart();
        popupCart = new PopupCart('popup_cart', cart);
    });
    
});

function vertivalSlider(data) {
    const sliderLenght = 6;

    if (data.products.length > sliderLenght+1) {
        // Old products
        verticalSlider('vertical_slider', data.products, 'Рейтингові')
        // New products
        const newProd = data.products.reverse();
        verticalSlider('vertical_slider', newProd, 'Нове')
        // Expensive products
        const sortedByPrice = data.products.sort((a, b) => b.price - a.price);
        verticalSlider('vertical_slider', sortedByPrice, 'У Топі')
        // Start slider carusel
        verticalSliderStart()              
    } else {
        console.log(`Error...Products length is too short...Product length=${data.products.length}`);
    }
}

function addToCart(id) {
    cart.addProduct(database.getProduct(id));
    popupCart.render();
    popupCart.show();
}