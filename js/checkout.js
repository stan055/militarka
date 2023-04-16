const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';
const cityInput = document.getElementById("city_input");
const cityList = document.getElementById("city_list");
const overlay = document.getElementById("overlay");
const nvPostInput = document.getElementById("nv_post_input");
const nvPostList = document.getElementById("nv_post_list");

document.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart();
    renderProductsTable(cart.data);
});

function renderProductsTable(data) {
    const tbody = document.getElementById('checkout_table_body');
    
    data.forEach(element => {
            tbody.innerHTML += `
            <tr style="font-size: small;">
                <td>
                    <img style="height: 6em;"src="${element.imgSrc[0]}" alt="">
                    </td>
                <td>
                    <span>${element.name}</span>
                </td>
                <td>
                    <span>${element.price} ₴</span>
                </td>
                <td style="text-align: center;">
                    <span>${element.numberOfUnits}</span>
                </td>
                <td>
                    <span>${element.price*element.numberOfUnits} ₴</span>
                </td>
            </tr>
            `;
    });
}

overlay.addEventListener("click", () => listsHide()); 

cityInput.addEventListener("focus", event => showList(cityInput, cityList));
nvPostInput.addEventListener("focus", event => {
    showList(nvPostInput, nvPostList);
    getNvPostNumbers();
});

let timeId, deliveryCity;
// City Input Listener
cityInput.addEventListener("input", event => {
    const cityName = event.target.value; 
    if (cityName.length > 1) {
        const query = {
            "apiKey": apiKey,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName" : cityName,
                "Limit" : 50,
                "Page" : "1"
            }};
        clearTimeout(timeId);
        timeId = setTimeout(sendQuery, 700, query, cityListWrite);
    }
});

function getNvPostNumbers() {
    const query =  {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            // "CityName": "Васильків",
            "CityRef" : deliveryCity,
            "Page" : "1",
            "Limit" : "300",
            "Language" : "UA",
        }
    };
    sendQuery(query, nvPostListWrite);
}

function cityListWrite(data) {
    if(data.data[0].Addresses) {
        cityList.firstElementChild.innerHTML = ``;
        data.data[0].Addresses.forEach(element => {
            cityList.firstElementChild.innerHTML += 
            `<li onclick="citylistClick('${element.Present}', '${element.DeliveryCity}')">${element.Present}</li>`;
        });
    }
}

function nvPostListWrite(data) {
    console.log(data)
    if(data.data) {
        nvPostList.firstElementChild.innerHTML = ``;
        data.data.forEach(element => {
            nvPostList.firstElementChild.innerHTML += 
            `<li onclick="nvPostlistClick('${element.Description}')">${element.Description}</li>`;
        });
    }
}

function sendQuery(query, writeList) {
    const request = new Request(requestURL, {
       method: "POST",
       body: JSON.stringify(query),
     });
     
     fetch(request)
       .then((response) => response.json())
       .then((data) => writeList(data))
       .catch(console.error);
}

function citylistClick(address, dc) {
    cityInput.classList.remove("warning");
    deliveryCity = dc;
    cityInput.value = address;
    listsHide();
}

function postRadio(show, hide) {
    if (!deliveryCity) {
        cityInput.classList.add("warning"); 
        return;
    }
    document.getElementById("nv_post_radio").disabled = false;
    document.getElementById("ukr_post_radio").disabled = false;
    document.getElementById(show).classList.remove("hide");
    document.getElementById(hide).classList.add("hide");
}

function nvPostlistClick(description) {
    nvPostInput.value = description;
    listsHide();
}

function listsHide() {
    overlay.classList.remove('visible');
    // Hide all lists
    for (const element of document.getElementsByClassName("input-list")){
        element.classList.add("hide");}
    // All inputs z-index = 1
    for (const element of document.getElementsByClassName("checkout__input__add")){
        element.style.zIndex = "1";}
}

function showList(input, list) { 
    input.style.zIndex = "999";
    list.classList.remove('hide'); 
    overlay.classList.add('visible'); 
}





