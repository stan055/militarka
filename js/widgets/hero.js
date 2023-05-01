function hero(containerId, menuCategories = [], tel = '') {
    const element = document.getElementById(containerId);
    const menu = heroMenu(menuCategories);

    if (element) {
        element.innerHTML = `
        <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <div class="hero__categories">
                    <div class="hero__categories__all">
                        <i class="fa fa-bars"></i>
                        <span>Категорії</span>
                    </div>
                    <ul>
                    ${menu}
                    </ul>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="hero__search">
                    <div class="hero__search__form">
                        <form action="#">
                            <div class="hero__search__categories">
                                Категорії
                                <span class="arrow_carrot-down"></span>
                            </div>
                            <input type="text" placeholder="Що ви шукаєте?">
                            <button type="submit" class="site-btn">Пошук</button>
                        </form>
                    </div>
                    <div class="hero__search__phone">
                        <div class="hero__search__phone__icon">
                            <i class="fa fa-phone"></i>
                        </div>
                        <div class="hero__search__phone__text">
                            <h5>${tel}</h5>
                            <span>працюємо 7/7 днів</span>
                        </div>
                    </div>
                </div>
                <div id="home_page_slider">
                </div>
            </div>
        </div>
        </div>   
        `;
    } else {
        console.error(`Hero Widget: container(${containerId}) not finded`);
        return null;
    }

    // Open close hero menu
    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    function heroMenu(categories) {
        let categoryHtml = '';
        try {
            Object.entries(categories).forEach((category) => {
                categoryHtml += `
                    <li><a href="./shop-grid.html?category=${category[0]}">${category[1]}</a></li>
                `;
            });
        } catch (error) {
            console.log(error);
        }
        return categoryHtml;
    }
}