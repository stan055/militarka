import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js'
import firebaseConfig from "./service/firebase-config.js";


let cart, database, popupCart;
document.addEventListener("DOMContentLoaded", async () => {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const citiesCol = collection(db, 'products');
    const citySnapshot = await getDocs(citiesCol);
    citySnapshot.docs.map(doc => {
        console.log(doc.data())
    });

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
            priceRange('price_range', products)

        } else {
            productsGrid('pagination_container', 'data_container', data.products)
            productSort('product_sort', data.products)
            priceRange('price_range', data.products)
        }
        
        const sixLastProd = data.products.slice(data.products.length-7,data.products.length-1)
        verticalSlider('slider_new_products', sixLastProd, 'Нове')
        verticalSliderStart()
        
        const saleOff = data.products.filter(product => product.category == 'sale')
        saleOffSlider('product_discount', saleOff)

        cart = new Cart();
        console.log(`Performance: ${performance.now() - perform1}`)    
    })
})


// Add product by id to shop cart
function addToCart(id) {
    cart.addToCart(id, productsData);
}
