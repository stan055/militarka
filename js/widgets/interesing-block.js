function interestingBlock(containerId, products) {
    const container = document.getElementById(containerId);
    if (container == undefined | container == null) {
        console.error(`Interesting Block: Error container, conteiner ID = ${containerId}`)
        return
    }
    if (products.length < 3) {
        console.error(`Interesting Block: Add more products, product length = ${products.length}`)
        container.innerHTML += `<h4 style="text-align:center; color:red;">Додайте більше продуктів у магазин.</h4>`
        return
    }

    const interestingItems = renderItems(products)
    container.innerHTML += `
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="section-title from-blog__title">
                <h2>Цікаве</h2>
            </div>
        </div>
    </div>
    <div class="blog-interesting row">
    ${interestingItems}
    </div>
    </div>
    `
    function renderItems (products) {
        let html = ``
        const arrayLength = 3;
        const sortedByPrice = products.sort((a, b) => b.price - a.price).slice(0, arrayLength);
        sortedByPrice.forEach(product => {
            html += `
            <div class="col-lg-4 col-md-4 col-sm-6">
            <div class="blog__item">
                <div class="blog__item__pic" style="height: 250px;display:flex;align-items: center;">
                    <img src="${product.imgSrc}" alt="">
                </div>
                <div class="blog__item__text">
                    <ul>
                        <li><i class="fa fa-calendar-o"></i> May 4,2019</li>
                        <li><i class="fa fa-comment-o"></i> 5</li>
                    </ul>
                    <h5><a href="./product.html?id=${product.id}">${product.name}</a></h5>
                    <p>${product.description.slice(0,250)}...</p>
                </div>
            </div>
            </div>
            `; 
        });
        return html
    }

}