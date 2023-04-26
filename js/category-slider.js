// Slider of categories
function categorySlider(data) {
    const categoriesSlider = document.querySelector('.categories__slider');
    categoriesSlider.innerHTML = ``;

    Object.entries(data.categories).forEach(category => {
        const product = data.products.find(element => element.category === category[0]);
        if (product) {
            categoriesSlider.innerHTML += render(product, category[0], category[1]);
        }
    });

    function render (product, categoryKey, categoryText) {
        const href=`${document.location.origin}/shop-grid.html?category=${categoryKey}`;
        return `
            <div class="col-lg-3">
            <div style="height: 260px; display:flex;align-items: center;">    
            <a href="${href}">
                <img src='${product.imgSrc[0]}'></img>
            </div>
            <a href="${href}">
                <h5 style="text-align: center; background-color: white;">${categoryText}</h5>
            </a>
            </div>
        `;
    }

    // Owl carousel
    $(".categories__slider").owlCarousel({
        loop: true, margin: 0, items: 4, dots: false, nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut', animateIn: 'fadeIn', smartSpeed: 1200, autoHeight: false, autoplay: true,
        responsive: {
            0: { items: 1,},
            480: { items: 2,},
            768: { items: 3,},
            992: { items: 4,}
        }});
}