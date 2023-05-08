{/* <script src="js/pagination.min.js"></script> */}

function displayProducts(cotainerId, products) {
    
    // Products Grid with Pagination
    $('#pagination-container').pagination({
        dataSource: productsData,
        pageSize: 12,
        callback: function (data, pagination) {
            // template method of yourself
            var html = simpleTemplating(data);
            $('#data-container').html(html);
        }
    });

    function simpleTemplating(data) {
        let html = '';
        $.each(data, function (index, product) {
            html += `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                        <div class="product__item__pic set-bg" style="background-image: url('${product.imgSrc[0]}');">
                            <ul class="product__item__pic__hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                <li><a style="cursor: pointer;" onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                            <h6><a href="#">${product.name}</a></h6>
                            <h5>$${product.price}</h5>
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    };
}