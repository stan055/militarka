const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';
const LIMIT = 27;

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

// Autocomplete city by novaposhta api
function cityInput(idInput, idList) {
    const input = document.getElementById(idInput);
    const list = document.getElementById(idList);
    showList(input, list);
    autocomplete(input, list.children[0], queryCity, idInput);
}

function queryCity(cityName) {
    return {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : cityName,
            "Limit" : LIMIT,
            "Page" : "1"
        }
    }
} 

let timeId;
function autocomplete(input, ul, queryObj, idInput) {
    input.addEventListener("input", (event) => {
        if (event.inputType == "insertReplacementText" || event.inputType == null) {
        } else {
            if (input.value.length > 1) {
                const qery = queryObj(input.value);
                clearTimeout(timeId);
                timeId = setTimeout(sendQuery, 700, qery, ul, idInput);
            }
        }
    });
}

function sendQuery(query, ul, idInput) {
     const request = new Request(requestURL, {
        method: "POST",
        body: JSON.stringify(query),
      });
      
      fetch(request)
        .then((response) => response.json())
        .then((data) => {
        if(data.data[0]) {
            writeList(data.data[0], ul, idInput);
        }
        })
        .catch(console.error);
}

function writeList(data, ul, idInput) {
        ul.innerHTML = ``;
        data.Addresses.forEach(element => {
            ul.innerHTML += 
            `<li onclick="cityListOnClick('${element.Present}', '${idInput}')">${element.Present}</li>`;
        });
}

function cityListOnClick(address, id) {
    document.getElementById(id).value = address;
    listsHide();
}

function listsHide() {
    for (const element of document.getElementsByClassName("input-list")){
        element.classList.add("hide");}

    document.getElementById("overlay").classList.remove('visible');
    document.getElementById("autocomplete").style.zIndex = "1";

    for (const element of document.getElementsByClassName("checkout__input__add")){
        element.style.zIndex = "1";}
}

function showList(input, list) { 
    input.style.zIndex = "999";
    list.classList.remove('hide'); 
    document.getElementById("overlay").classList.add('visible'); 
}

document.getElementById("overlay").addEventListener("click", event => {
    listsHide();
});

function nvPostInputOnСlick() {
    inputOnСlick("nv_post_list","nv_post");
}

function postRadio(show, hide) {
    document.getElementById(show).classList.remove("hide");
    document.getElementById(hide).classList.add("hide");
}