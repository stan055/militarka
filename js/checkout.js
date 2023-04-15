const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';
const LIMIT = 27;
const cityInput = document.getElementById("city_input");
const cityList = document.getElementById("city_list");
const overlay = document.getElementById("overlay");

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

let timeId;
cityInput.addEventListener("input", event => {
    const cityName = event.target.value; 
    if (cityName.length > 1) {
        const query = {
            "apiKey": apiKey,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName" : cityName,
                "Limit" : LIMIT,
                "Page" : "1"
            }};
        clearTimeout(timeId);
        timeId = setTimeout(sendQuery, 700, query, cityList.firstElementChild, cityInput.id);
    }
});

function writeList(data, listUl, idInput) {
    if(data.data[0].Addresses) {
        listUl.innerHTML = ``;
        data.data[0].Addresses.forEach(element => {
            listUl.innerHTML += 
            `<li onclick="listClick('${element.Present}', '${idInput}')">${element.Present}</li>`;
        });
    }
}

function sendQuery(query, listUl, idInput) {
    const request = new Request(requestURL, {
       method: "POST",
       body: JSON.stringify(query),
     });
     
     fetch(request)
       .then((response) => response.json())
       .then((data) => writeList(data, listUl, idInput))
       .catch(console.error);
}

// Autocomplete city by novaposhta api
// function cityInput(idInput, idList) {
//     const input = document.getElementById(idInput);
//     const list = document.getElementById(idList);
//     showList(input, list);
//     autocomplete(input, list.children[0], queryCity, idInput);
// }

function nvPostInput(idInput, idList) {
    const input = document.getElementById(idInput);
    const list = document.getElementById(idList);
    showList(input, list);
    autocomplete(input, list.children[0], queryNvPost, idInput);
}

// function queryCity(cityName) {
//     return {
//         "apiKey": apiKey,
//         "modelName": "Address",
//         "calledMethod": "searchSettlements",
//         "methodProperties": {
//             "CityName" : cityName,
//             "Limit" : LIMIT,
//             "Page" : "1"
//         }
//     }
// } 

function queryNvPost(ref) {
    return {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            // "CityName": "Васильков",
            "CityRef" : "db5c88d9-391c-11dd-90d9-001a92567626",
            "Page" : "1",
            "Limit" : "50",
            "Language" : "UA",
        }
    };
}

// function autocomplete(input, ul, queryObj, idInput) {
//     input.addEventListener("input", (event) => {
//         if (event.inputType == "insertReplacementText" || event.inputType == null) {
//         } else {
//             if (input.value.length > 1) {
//                 const qery = queryObj(input.value);
//                 clearTimeout(timeId);
//                 timeId = setTimeout(sendQuery, 700, qery, ul, idInput);
//             }
//         }
//     });
// }





function listClick(address, id) {
    document.getElementById(id).value = address;
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

function postRadio(show, hide) {
    document.getElementById(show).classList.remove("hide");
    document.getElementById(hide).classList.add("hide");
}