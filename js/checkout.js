const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';
const cityInput = document.getElementById("city_input");
const cityList = document.getElementById("city_list");
const overlay = document.getElementById("overlay");
const nvPostInput = document.getElementById("nv_post_input");
const nvPostList = document.getElementById("nv_post_list");
const lastNameEl = document.getElementById("lastname");
const firstNameEl = document.getElementById("firstname");
const inputTextArr = document.querySelectorAll(".input_text");
const inputEmailEl = document.getElementById("email");
const inputPhoneEl = document.getElementById("phone");

document.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart();
    renderProductsTable(cart.data);
    renderCheckoutCount(cart.quantity);
    renderCheckoutSum(cart.sum);
});


inputTextArr.forEach(element => {
    element.addEventListener("focusout", event => {
        if (!textLength(event.target.value))
        element.classList.add("warning");
    });
});
inputTextArr.forEach(element => {
    element.addEventListener("input", event => {
        if (textLength(event.target.value))
        element.classList.remove("warning");
    });
});
function textLength(text) {
    if (text.length > 0) return true;
    return false; 
}

// Phone validation
inputPhoneEl.addEventListener("focusout", event => {
    if (!phoneValidation(event.target.value))
    inputPhoneEl.classList.add("warning");
})
inputPhoneEl.addEventListener("input", event => {
    if (phoneValidation(event.target.value))
    inputPhoneEl.classList.remove("warning");
})
function phoneValidation(tel) {
    return tel.match(
        /^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/
      );
}
// ----------------
// Email validation
inputEmailEl.addEventListener("focusout", event => {
    if (!emailValidation(event.target.value))
        inputEmailEl.classList.add("warning");
});
inputEmailEl.addEventListener("input", event => {
    if (emailValidation(event.target.value))
    inputEmailEl.classList.remove("warning");
});
function emailValidation(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
// ---------------


function renderCheckoutCount(count) {
    document.getElementById("checkout_count").innerHTML = count;
}

function renderCheckoutSum(sum) {
    document.getElementById("checkout_sum").innerHTML = sum.toFixed(2);
    document.getElementById("checkout_total").innerHTML = `<big>${sum.toFixed(2)} ₴</big>`;
}

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

function ukrPostApi() {
   const url = 
   "https://www.ukrposhta.ua/address-classifier-ws/";
   const uri = 
   "get_regions_by_region_ua?region_name=Kyivska";

   const request = new Request(url + uri, {
    method: "GET",
    Accept: "application/json",
    mode: "no-cors"
  });
  
  fetch(request)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
}



