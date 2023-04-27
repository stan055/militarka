function featuredProduct(data) {
    // Return if products.lenght too short
    if (data.products.length < 12) {console.log("Data product array too short... Add more products!"); return};
    // Generate eight random value
    const randoms = generateArrayRandomValues(0,data.products.length-1,8);

    // Get eight random products
    let categories = [];
    try {
        randoms.forEach(index => {
            let categoryIndexOf = categories.indexOf(data.products[index].category);
            if (categoryIndexOf === -1) categories.push(data.products[index].category);
        });
    } catch (error) {
        console.log(error);
        return;
    }    
    
    const featuredControls = document.querySelector('.featured__controls');
    const rowFeaturedFilter = document.querySelector('.row.featured__filter');
    
    // Set Menu Featured Products

    featuredControls.innerHTML = `
    <ul style="text-transform: capitalize;">
        <li class="active" data-filter="*">Усе</li>
        <li data-filter=".${categories[0]}">${data.categories[categories[0]]}</li>
        <li data-filter=".${categories[1]}">${data.categories[categories[1]]}</li>
        <li data-filter=".${categories[2]}">${data.categories[categories[2]]}</li>
        <li data-filter=".${categories[3]}">${data.categories[categories[3]]}</li>
    </ul>
    `;

    // Set Fetured Products  Items
    rowFeaturedFilter.innerHTML = ``;
    randoms.forEach(index => {
        const href = `./product.html?id=${data.products[index].id}`;
        onclick="${href}";
        rowFeaturedFilter.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 mix ${data.products[index].category}">
        <div class="featured__item">
        <div class="featured__item__pic set-bg" 
        style="background-image: url(${data.products[index].imgSrc[0]});
        cursor: pointer;" 
        onclick="window.location='${href}'">
        <ul class="featured__item__pic__hover">
        <li><a href="#"><i class="fa fa-heart"></i></a></li>
        <li><a href="#"><i class="fa fa-retweet"></i></a></li>
        <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
        </ul>
        </div>
        <div class="featured__item__text">
        <h6><a href='${href}'>${data.products[index].name}</a></h6>
        <h5>${data.products[index].price}₴</h5>
        </div>
        </div>
        </div>
        `;
    });

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