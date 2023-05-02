// Featured Product is rendering eight random product
function featuredProduct(containerId, data) {
    const featuredEl = document.getElementById(containerId);
    if (featuredEl == null) {
        console.error(`Featured-Product: Container is null, containerId: ${containerId}.`);
        return;
    }
    if (data == null | data == undefined) {
        console.error(`Featured-Product: Data is null.`);
        return;
    }
    if (data.products.length < 12) {
        console.error(`Featured-Product: Add more products! Product count: ${data.products.length}, min product count=12.`);
        featuredEl.innerHTML += `<h4 style="text-align:center; color:red;">Додайте більше продуктів у магазин.</h4>`;
        return;
    };

    // Generate eight random value
    const products = getRandomProduct(data.products);
    const categories = getCategory(products);
    const controls = controlsHtml(categories, data.categories);
    const featuredBody = featuredProdHtml(products);

    featuredEl.innerHTML += `
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="section-title">
                <h2>Рекомендації</h2>
            </div>
            <div class="featured__controls">
                <ul style="text-transform: capitalize;">
                <li class="active" data-filter="*">Усе</li>
                ${controls}
                </ul>
            </div>
        </div>
    </div>
    <div class="row featured__filter">
    ${featuredBody}
    </div>
    </div>
    `;

    function random(min, max, exclude) {
        let ran;
        while (!ran) {
            const x = Math.floor(Math.random() * (max - min) + 1) + min;
            if (exclude.indexOf(x) === -1) ran = x;
        }
        return ran;
    };
    function getRandomProduct(products) {
        const ranProducts = [];
        const length = 8; // Length of random array
        const min = 0; // Min random value
        const max = products.length - 1; // Max random value
        const exclude = []; // Array exclude random value
        while (ranProducts.length !== length) {
            let ran = random(min, max, exclude);
            exclude.push(ran);
            ranProducts.push(products[ran]);
        };
        return ranProducts;
    };
    function getCategory(products) {
        const categories = [];
        products.forEach(product => {
            if (categories.indexOf(product.category) === -1) categories.push(product.category);
        });
        return categories;
    };
    function controlsHtml(categories, dataCategories) {
        let html = ``;
        let controlMax = categories.length > 4 ? 4 : categories.length;
        for (let i = 0; i < controlMax; i++) {
            html += `<li data-filter=".${categories[i]}">${dataCategories[categories[i]]}</li>`
        };
        return html;
    };
    function featuredProdHtml(products) {
        let html = ``;
        products.forEach(product => {
            const href = `./product.html?id=${product.id}`;
            html += `
            <div class="col-lg-3 col-md-4 col-sm-6 mix ${product.category}">
                <div class="featured__item">
                    <div class="featured__item__pic set-bg" 
                    style="display:flex;align-items:center;height:260px;">
                        <a href="${href}">
                            <img src="${product.imgSrc[0]}"></img>
                        </a>
                        <ul class="featured__item__pic__hover">
                            <li><a><i class="fa fa-heart"></i></a></li>
                            <li><a><i class="fa fa-retweet"></i></a></li>
                            <li><a onclick="addToCart(${product.id})"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                    <div class="featured__item__text">
                    <h6><a href='${href}'>${product.name}</a></h6>
                    <h5>${product.price}₴</h5>
                    </div>
                </div>
            </div>
            `;
        });
        return html;
    }

/*------------------
    Gallery filter
--------------------*/

    $('.featured__controls li').on('click', function () {
        $('.featured__controls li').removeClass('active');
        $(this).addClass('active');
    });
    if ($('.featured__filter').length > 0) {
        var containerEl = document.querySelector('.featured__filter');
        var mixer = mixitup(containerEl);
    }
}