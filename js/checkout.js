const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';

document.addEventListener("DOMContentLoaded", () => {

    const cart = new Cart();
    renderProductsTable(cart.data);
    autocompleteCity();
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

// Autocomplete city by novaposhta api
let timeId;
function autocompleteCity() {
    const input = document.getElementById("autocomplete");
    input.addEventListener("input", (event) => {
        if (event.inputType == "insertReplacementText" || event.inputType == null) {
        } else {
            const cityName = document.getElementById("autocomplete").value;
            if (cityName.length > 1) {
                clearTimeout(timeId);
                timeId = setTimeout(
                    searchSettlements,
                    700,
                    cityName,        
                );
            }
        }
    });
}

const LIMIT = 27;
function searchSettlements(cityNameValue) {
    const obj = {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : cityNameValue,
            "Limit" : LIMIT,
            "Page" : "1"
        }
     }

     const request = new Request(requestURL, {
        method: "POST",
        body: JSON.stringify(obj),
      });
      
      fetch(request)
        .then((response) => response.json())
        .then((data) => {
          const cityListEl = document.getElementById("city_list_ul");
        if(data.data[0]) {
            cityListEl.innerHTML = ``;
            data.data[0].Addresses.forEach(element => {
                cityListEl.innerHTML += 
                `<li onclick="cityListOnClick('${element.Present}', 1)">${element.Present}</li>`;
            });
          }
        })
        .catch(console.error);
}

function listsHide() {
    for (const element of document.getElementsByClassName("input-list")){
        element.classList.add("hide");}

    document.getElementById("overlay").classList.remove('visible');
    document.getElementById("autocomplete").style.zIndex = "1";

    for (const element of document.getElementsByClassName("checkout__input__add")){
        element.style.zIndex = "1";}
}

function inputOnСlick(id1, id3) { 
    document.getElementById(id1).classList.remove('hide'); 
    document.getElementById("overlay").classList.add('visible'); 
    document.getElementById(id3).style.zIndex = "999";
}

function cityInputOnСlick() {
    inputOnСlick("city_list", "autocomplete");
}

function cityListOnClick(address) {
    document.getElementById("autocomplete").value = address;
    cityListHide();
}

document.getElementById("overlay").addEventListener("click", event => {
    listsHide();
});

function nvPostInputOnСlick() {
    inputOnСlick("nv_post_list","nv_post");
}