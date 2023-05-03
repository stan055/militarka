let cart, database;
document.addEventListener("DOMContentLoaded", () => {
    database = new Database();
    database.getDatabase()
    .then((data) => {       
        header('header', data.info); //  Render logo, pages-menu, cart...
        hero('hero', data.categories, data.info.tel); // Render menu, search, tel
        heroBanner('home_page_slider', data.products); // Render Main Big Banner
        categorySlider('categories', data); // Render category-slider.js
        featuredProduct('featured', data); // Render featured-product.js
        vertivalSlidersStart(data);
        blogInteresting(data);
        bottonRender(data.info);
        cart = new Cart();
        const popupCart = new PopupCart('body');
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

function vertivalSlidersStart(data) {
    const sliderLenght = 6;

    if (data.products.length > sliderLenght+1) {
        oldProductsSlider(data);
        latestProductSlider(data);
        topPriceProductsSlider(data);
        owlCaruselStart();                
    } else {
        console.log(`Error...Products length is too short...Product length=${data.products.length}`);
    }
}

function oldProductsSlider(data) {
    const oldProductSlider = document.querySelector('.old-product__slider');
    oldProductSlider.innerHTML = verticalSliderRenderHtml(data.products);
}

function owlCaruselStart() {
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });
}

function verticalSliderRenderHtml(array) {
    let html = ``;
    for (i=0; i<=3; i+=3) {
        html += `<div class="latest-prdouct__slider__item">`;
        for (y=0; y<3; y++) {
            const index = i + y;
            html += `
            <a href="#" class="latest-product__item">
            <div class="latest-product__item__pic">
                <img src="${array[index].imgSrc[0]}" alt="">
            </div>
            <div class="latest-product__item__text">
                <h6>${array[index].name}</h6>
                <span>${array[index].price}₴</span>
            </div>
            </a>
            `;
        };
        html += `</div>`;
    }
    return html;
}

// Top Price Product Slider
function topPriceProductsSlider(data) {
    const topPriceProductSlider = document.querySelector('.top-rated-product__slider');
    const sortedByPrice = data.products.sort((a, b) => a.price - b.price);
    const reversed = sortedByPrice.reverse();
    topPriceProductSlider.innerHTML = verticalSliderRenderHtml(reversed);

}

// Latest Product Slider
function latestProductSlider(data) {
    const latestProductOriginSlider = document.querySelector('.latest-product-origin__slider');
    const reversed = data.products.reverse();
    latestProductOriginSlider.innerHTML = verticalSliderRenderHtml(reversed);
}







function addToCart(id) {
    cart.addProduct(database.getProduct(id));
}