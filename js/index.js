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
        blogInteresting(data);
        bottonRender(data.info);
        
        cart = new Cart();
        popupCart = new PopupCart('popup_cart', cart);
    });
    
});

function bottonRender(info) {
    const footerAbout = document.querySelector('.footer__about');
    footerAbout.innerHTML = `
        <div class="footer__about__logo">
        <a href="./index.html"><span>${info.header_logo}</span></a>
        </div>
        <ul>
            <li>Адреса: ${info.address}</li>
            <li>Тел: ${info.tel}</li>
            <li>Email: ${info.email}</li>
        </ul>   
    `;
}

function blogInteresting(data) {
    const quantity = 3;
    const blogInteresting = document.querySelector('.blog-interesting');
    for (i=0; i<quantity; i++) {
        blogInteresting.innerHTML += `
        <div class="col-lg-4 col-md-4 col-sm-6">
        <div class="blog__item">
            <div class="blog__item__pic">
                <img src="${data.products[i].imgSrc}" alt="">
            </div>
            <div class="blog__item__text">
                <ul>
                    <li><i class="fa fa-calendar-o"></i> May 4,2019</li>
                    <li><i class="fa fa-comment-o"></i> 5</li>
                </ul>
                <h5><a href="#">${data.products[i].name}</a></h5>
                <p>${data.products[i].description.slice(0,250)}...</p>
            </div>
        </div>
        </div>
        `;
    }

}

function vertivalSlider(data) {
    const sliderLenght = 6;

    if (data.products.length > sliderLenght+1) {
        // Old products
        verticalSlider('vertical_slider', data.products, 'Рейтингові')
        
        // New products
        const newProd = data.products.reverse();
        verticalSlider('vertical_slider', newProd, 'Нове')

        // Expensive products
        const sortedByPrice = data.products.sort((a, b) => a.price - b.price);
        const expensiveProd = sortedByPrice.reverse();
        verticalSlider('vertical_slider', expensiveProd, 'У Топі')

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