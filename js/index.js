let cart;
document.addEventListener("DOMContentLoaded", () => {
    getData('./database.json')
    .then((data) => {       
        renderHeader('header', data.info);
        renderHeroMenu(data.categories);
        setHeroBanner(data);
        categorySlider(data); // Render category-slider.js
        featuredProduct(data); // Render featured-product.js
        vertivalSlidersStart(data);
        blogInteresting(data);
        bottonRender(data.info);
        cart = new Cart();
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

// Featured Product
// function featuredProduct(data) {
//     // Return if products.lenght too short
//     if (data.products.length < 12) {console.log("Data product array too short... Add more products!"); return};
//     // Generate eight random value
//     const randoms = generateArrayRandomValues(0,data.products.length-1,8);

//     // Get eight random products
//     let categories = [];
//     try {
//         randoms.forEach(index => {
//             let categoryIndexOf = categories.indexOf(data.products[index].category);
//             if (categoryIndexOf === -1) categories.push(data.products[index].category);
//         });
//     } catch (error) {
//         console.log(error);
//         return;
//     }    
    
//     const featuredControls = document.querySelector('.featured__controls');
//     const rowFeaturedFilter = document.querySelector('.row.featured__filter');
    
//     // Set Menu Featured Products

//     featuredControls.innerHTML = `
//     <ul style="text-transform: capitalize;">
//         <li class="active" data-filter="*">Усе</li>
//         <li data-filter=".${categories[0]}">${data.categories[categories[0]]}</li>
//         <li data-filter=".${categories[1]}">${data.categories[categories[1]]}</li>
//         <li data-filter=".${categories[2]}">${data.categories[categories[2]]}</li>
//         <li data-filter=".${categories[3]}">${data.categories[categories[3]]}</li>
//     </ul>
//     `;

//     // Set Fetured Products  Items
//     rowFeaturedFilter.innerHTML = ``;
//     randoms.forEach(index => {
//         rowFeaturedFilter.innerHTML += `
//         <div class="col-lg-3 col-md-4 col-sm-6 mix ${data.products[index].category}">
//         <div class="featured__item">
//         <div class="featured__item__pic set-bg" style="background-image: url(${data.products[index].imgSrc});">
//         <ul class="featured__item__pic__hover">
//         <li><a href="#"><i class="fa fa-heart"></i></a></li>
//         <li><a href="#"><i class="fa fa-retweet"></i></a></li>
//         <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
//         </ul>
//         </div>
//         <div class="featured__item__text">
//         <h6><a href="./product.html?id=${data.products[index].id}">${data.products[index].name}</a></h6>
//         <h5>${data.products[index].price}₴</h5>
//         </div>
//         </div>
//         </div>
//         `;
//     });

//         /*------------------
//             Gallery filter
//         --------------------*/

//     $('.featured__controls li').on('click', function () {
//         $('.featured__controls li').removeClass('active');
//         $(this).addClass('active');
//     });
//     if ($('.featured__filter').length > 0) {
//         var containerEl = document.querySelector('.featured__filter');
//         var mixer = mixitup(containerEl);
//     }
// }

// Set Home Hero Banner
function setHeroBanner(data) {
    const product = data.products.findLast(element => element.category == 'sale');
    if (product === undefined) return;
    else {
        const heroBannerDiv = document.querySelector('#home_page_slider');
        const arrayWords = product.name.split(' ');
        const firstWord = arrayWords.shift();
        const secondWordS = arrayWords.join(' ');
        const href = `${document.location.origin}/product.html?id=${product.id}`
        heroBannerDiv.outerHTML = `
            <div class="hero__item set-bg" data-setbg="${product.imgSrc}" 
            style="
                background-image: url(&quot;${product.imgSrc}&quot;);
            ">
                <div class="hero__text" 
                style="border-radius: 50%; 
                box-shadow: 0px 0px 4em 4em rgba(255, 255, 255, 0.2), 
                            inset 0px 0px 4em 5em rgba(255, 255, 255, 0.2);>
                    <span"></span>
                    <h2>${firstWord} <br />${secondWordS}</h2>
                    <p>Розпродаж. Встигніть замовити</p>
                    <a href="${href}" class="primary-btn">ЗАМОВИТИ</a>
                </div>
            </div>
        `;
    }
}

// Getting the categoryes
async function getData(address) {
    try {
        let result = await fetch(address)
        let data = await result.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function generateRandom(min, max, exclude) {
    let random;
    while (!random) {
      const x = Math.floor(Math.random() * (max - min) + 1) + min;
      if (exclude.indexOf(x) === -1) random = x;
    }
    return random;
};

function generateArrayRandomValues (min, max, length) {
    let randoms = [];
    while(randoms.length !== length) {
        let ran = generateRandom(min, max, randoms);
        randoms.push(ran);
    };
    return randoms;
};