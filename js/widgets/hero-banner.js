// Set Home Hero Banner
function heroBanner(containerId, products) {
    let img = './img/hero/banner.jpg';
    let firstWord = 'Продукт з';
    let secondWord = 'категорії Розпродаж';
    let text = 'Додайте продукт в категорію Розпродаж';
    let href = '#';
    try {
        // Find last product of sale category
        const product = products.findLast(element => element.category == 'sale');
        // Set data
        img = product.imgSrc;
        const arrayWords = product.name.split(' '); // Get words from product name
        firstWord = arrayWords.shift(); // Get first word
        secondWord = arrayWords.join(' '); // Get words 
        text = 'Розпродаж. Встигніть замовити';
        href = `./product.html?id=${product.id}`;
    } catch (error) {
        console.error(error);
    } 
    // Find container element 
    const container = document.getElementById(containerId);
    if (container) {
        // Render
        container.outerHTML = `
                <div class="hero__item set-bg" data-setbg="${img}" 
                style="background-image: url(&quot;${img}&quot;);">
                    <div class="hero__text" 
                    style="border-radius: 50%; 
                    box-shadow: 0px 0px 4em 4em rgba(255, 255, 255, 0.2), 
                                inset 0px 0px 4em 5em rgba(255, 255, 255, 0.2);>
                        <span"></span>
                        <h2>${firstWord} <br />${secondWord}</h2>
                        <p>${text}</p>
                        <a href="${href}" class="primary-btn">ЗАМОВИТИ</a>
                    </div>
                </div>
            `;
    } else {
        console.error(`Hero Banner: Container not finded, Id: ${containerId}`);
    }

}

// home_page_slider