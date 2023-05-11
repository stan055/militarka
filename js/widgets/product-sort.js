function productSort(containerId, products) {
    const container = document.getElementById(containerId)
    container.innerHTML += `
    <div class="row">
    <div class="col-lg-4 col-md-5">
        <div class="filter__sort">
            <span>Сортувати</span>
            <select id="selector_sort">
                <option value="old">Дата додавання</option>
                <option value="new">Нове</option>
                <option value="cheep">Дешеве</option>
                <option value="expensive">Дороге</option>
            </select>
        </div>
    </div>
    <div class="col-lg-4 col-md-4">
        <div class="filter__found">
            <h6><span>${products.length}</span> Знайдено</h6>
        </div>
    </div>
    <div class="col-lg-4 col-md-3">
        <div class="filter__option">
            <span class="icon_grid-2x2"></span>
            <span class="icon_ul"></span>
        </div>
    </div>
    </div>
    `
    const selectorSort = document.getElementById('selector_sort')
    selectorSort.addEventListener("change", event => {
        console.log('SORT')
        if (event.target.value == 'old') {
            products = products.sort((a,b)=> a.id - b.id)
        }
        if (event.target.value == 'new') {
            products = products.sort((a,b)=> b.id - a.id)
        }
        if (event.target.value == 'cheep') {
            products = products.sort((a,b)=> a.price - b.price)
        }
        if (event.target.value == 'expensive') {
            products = products.sort((a,b)=> b.price - a.price)
        }
        productsGrid('pagination_container', 'data_container', products)
    });
}



