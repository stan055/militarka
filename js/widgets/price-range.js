function priceRange(containerId, products) {
    const container = document.getElementById(containerId);
    const priceMax = Math.max(...products.map(prod => prod.price))
    const priceMin = Math.min(...products.map(prod => prod.price))

    container.innerHTML += `
    <h4>Ціна</h4>
    <div class="price-range-wrap">
        <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" id="price_range_slider"
            data-min="${priceMin}" data-max="${priceMax}">
            <div class="ui-slider-range ui-corner-all ui-widget-header"></div>
            <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
            <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
        </div>
        <div class="range-slider">
            <div class="price-input">
                <input type="text" id="minamount">
                <input type="text" id="maxamount" style="text-align: right;">
            </div>
        </div>
    </div>    
    `
    let rangeSlider = $("#price_range_slider"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');

    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val(ui.values[0] + '₴');
            maxamount.val(ui.values[1] + '₴');
        },
        stop: function (event, ui) {
            const filtered = products.filter(prod => prod.price >= ui.values[0] && prod.price <= ui.values[1])

            const yPos = window.pageYOffset
            const xPos = window.pageXOffset

            productsGrid('pagination_container', 'data_container', filtered)
            window.scrollTo(xPos, yPos)

        }
    });
    minamount.val(rangeSlider.slider("values", 0) + '₴');
    maxamount.val(rangeSlider.slider("values", 1) + '₴');
}

