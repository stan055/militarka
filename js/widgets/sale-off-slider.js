function saleOffSlider(containerId, products) {
    container = document.getElementById(containerId)
    container.innerHTML += `
    <div class="section-title product__discount__title">
    <h2>Розпродаж</h2>
    </div>
    <div class="row">
    <div class="product__discount__slider owl-carousel" id="product_discount_slider">
    ${body()}
    </div>
    </div>
    `
    $("#product_discount_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {items: 1,},
            480: {items: 2,},
            768: {items: 2,},
            992: {items: 3,}
        }
    });

    function body() {
        let html = ``
        products.forEach(product => {
            const pp = Math.round(product.price/100*20 + product.price)
            html += `
            <div class="col-lg-4">
            <div class="product__discount__item">
                <div class="product__discount__item__pic set-bg"
                    style="background-image: url('${product.imgSrc[0]}');">
                    <div class="product__discount__percent">-20%</div>
                    <ul class="product__item__pic__hover">
                        <li><a href="#"><i class="fa fa-heart"></i></a></li>
                        <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                        <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                    </ul>
                </div>
                <div class="product__discount__item__text">
                    <span>******</span>
                    <h5><a href="./product.html?id=${product.id}">${product.name}</a></h5>
                    <div class="product__item__price">${product.price}₴<span>${pp}₴</span></div>
                </div>
            </div>
            </div> 
            `
        });
        return html
    }

}










                                

                    