function verticalSlider(containerId, products = [], hText = 'Text') {
    if (containerId == undefined | containerId == null) {
        console.error(`Vertical Slider: containerId == ${containerId}`);
        return;
    };

    const container = document.getElementById(containerId);
    if (container == undefined | container == null) {
        console.error(`Vertical Slider: container has not finded, id: ${containerId}`);
        return;
    };

    if (products.length < 7) {
        console.error(`Vertical Slider: products.length = ${products.length}`);
        return;
    };

    const itemsHtml = renderItems();
    container.innerHTML += `
    <div class="col-lg-4 col-md-6">
    <div class="latest-product__text">
        <h4>${hText}</h4>
        <div class="latest-product__slider owl-carousel">
        ${itemsHtml}
        </div>
    </div>
    </div>
    `;

    function renderItems() {
        let html = ``;
        try {
            for (i=0; i<=3; i+=3) {
                html += `<div class="latest-prdouct__slider__item">`;
                for (y=0; y<3; y++) {
                    const index = i + y;
                    html += `
                    <a href="#" class="latest-product__item">
                    <div class="latest-product__item__pic">
                        <img src="${products[index].imgSrc[0]}" alt="">
                    </div>
                    <div class="latest-product__item__text">
                        <h6>${products[index].name}</h6>
                        <span>${products[index].price}₴</span>
                    </div>
                    </a>
                    `;
                };
                html += `</div>`;
            };    
        } catch (error) {
            console.error(error);
        }
        return html
    }
}

function verticalSliderStart(className = 'latest-product__slider') {
    $(`.${className}`).owlCarousel({
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