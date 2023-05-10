
let cart, database, popupCart;
document.addEventListener("DOMContentLoaded", () => {

    database = new Database();
    database.getDatabase()
    .then(data => {
        const perform1 = performance.now();


        humbergerMenu('humberger_menu', data.info.header_logo)
        header('header', data.info, '', 'active'); //  Render logo, pages-menu, cart...
        hero('hero', data.categories, data.info.tel); // Render menu, search, tel
        footer('footer', data.info)
        

        const category = getURLparameter('category');
        if (category != null) {
            const products = data.products.filter(product => product.category == category)
            productsGrid('pagination_container', 'data_container', products)
            productSort('product_sort', products)
        } else {
            productsGrid('pagination_container', 'data_container', data.products)
            productSort('product_sort', data.products)
        }
        
        cart = new Cart();
        console.log(`Performance: ${performance.now() - perform1}`)    
    })
})


// Add product by id to shop cart
function addToCart(id) {
    cart.addToCart(id, productsData);
}

