const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';
const cityInput = document.getElementById("city_input");
const cityList = document.getElementById("city_list");
const overlay = document.getElementById("overlay");
const nvPostInput = document.getElementById("nv_post_input");
const nvPostList = document.getElementById("nv_post_list");

const inputTextArr = document.querySelectorAll(".input_text");
const inputEmailEl = document.getElementById("email");
const inputPhoneEl = document.getElementById("phone");
const checkoutBtn = document.getElementById("checkout_btn");
const radioBtnBlock = document.getElementById("radiobtn_block");
const ukrPostEl = document.getElementById('ukr_post_input');
const nvPostEl = document.getElementById('nv_post_input');

let cart;
document.addEventListener("DOMContentLoaded", () => {
    cart = new Cart();
    renderProductsTable(cart.data);
    renderCheckoutCount(cart.quantity);
    renderCheckoutSum(cart.sum);
});

// Text validation
inputTextArr.forEach(element => {
    element.addEventListener("focusout", event => {
        textValidation(element);
    });
});
inputTextArr.forEach(element => {
    element.addEventListener("input", event => {
        textValidation(element);
        
    });
});


// Phone validation 
inputPhoneEl.addEventListener("focusout", () => phoneValidation(inputPhoneEl));
inputPhoneEl.addEventListener("input", () => phoneValidation(inputPhoneEl));


// Email validation 
inputEmailEl.addEventListener("focusout", () => emailValidation(inputEmailEl));
inputEmailEl.addEventListener("input", () => emailValidation(inputEmailEl));

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

// City Input Listener
let timeId, deliveryCity;
cityInput.addEventListener("input", event => {
    const cityName = event.target.value; 
    if (cityName.length > 1) {
        const query = {
            "apiKey": apiKey,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                "CityName" : cityName,
                "Limit" : "50",
                "Page" : "1"
            }};
        clearTimeout(timeId);
        timeId = setTimeout(sendQuery, 700, query, cityListWrite);
    }
});

function cityListWrite(data) {
    if (data.success)
    if (data.data[0].Addresses) {
        cityList.firstElementChild.innerHTML = ``;
        data.data[0].Addresses.forEach(element => {
            cityList.firstElementChild.innerHTML += 
            `<li onclick="citylistClick('${element.Present}', '${element.DeliveryCity}')">${element.Present}</li>`;
        });
    }
}
// City list click
function citylistClick(address, dc) {
    cityInput.classList.remove("warning");
    deliveryCity = dc;
    cityInput.value = address;
    listsHide();
}

// Send query Nova Poshta post numbers
function getNvPostNumbers() {
    const query =  {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityRef" : deliveryCity,
            "Page" : "1",
            "Limit" : "350",
            "Language" : "UA",
        }
    };
    sendQuery(query, nvPostListWrite);
}

function nvPostListWrite(data) {
    if(data.data) {
        nvPostList.firstElementChild.innerHTML = ``;
        data.data.forEach(element => {
            const description = element.Description.replaceAll('"','');
            nvPostList.firstElementChild.innerHTML += 
            `<li onclick="nvPostlistClick('${description}')">${element.Description}</li>`;
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

function postRadio(show, hide) {
    if (!textValidation(cityInput)) return;
    radioBtnBlock.classList.remove("warning");
    inputTextArr[3].classList.remove("warning");
    inputTextArr[4].classList.remove("warning");

    document.getElementById("nv_post_radio").disabled = false;
    document.getElementById("ukr_post_radio").disabled = false;
    document.getElementById(show).classList.remove("hide");
    document.getElementById(hide).classList.add("hide");
}

// Nova poshta list click
function nvPostlistClick(description) {
    nvPostInput.value = description;
    textValidation(nvPostInput);
    listsHide();
}

function listsHide() {
    overlay.classList.remove('visible');
    // Hide all lists
    for (const element of document.getElementsByClassName("input-list")){
        element.classList.add("hide");}
    // All inputs z-index
    for (const element of document.getElementsByClassName("checkout__input__add")){
        element.classList.remove("top-index");}
}

function showList(input, list) { 
    input.classList.add("top-index");
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
// return radio button checked value or false
function getCheckedRadio(name) {
    let rad = document.getElementsByName(name);
    for (let i=0; i < rad.length; i++) {
      if (rad[i].checked) {
        return rad[i].value;
      }
    }
    return false;
}

function validationAll() {
    let isValid = true;
    try {
        if (!validationRadioBlock(inputTextArr[3],inputTextArr[4])) {
            radioBtnBlock.classList.add("warning");
            radioBtnBlock.scrollIntoView({ block: "center"});
            isValid = false;
        }
        if (!textValidation(inputTextArr[2])) {
            isValid = false;
            inputTextArr[2].scrollIntoView({ block: "center"});
        }
        if (cart.data.length == 0) {
            isValid = false;
        }
        if (!emailValidation(inputEmailEl)) {
            isValid = false;
            inputEmailEl.scrollIntoView({ block: "center"});
        }
        if (!phoneValidation(inputPhoneEl)) {
            isValid = false;
            inputPhoneEl.scrollIntoView({ block: "center"});
        }
        if (!textValidation(inputTextArr[1])) {
            isValid = false;
            inputTextArr[1].scrollIntoView({ block: "center"});
        }
        if (!textValidation(inputTextArr[0])) {
            isValid = false;
            inputTextArr[0].scrollIntoView({ block: "center"});
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return isValid;
}

checkoutBtn.addEventListener("click", event => {
    // Validation form
    let isValid = validationAll();
    // Send mail
    if (isValid) {
        sendEmail() // send-email.js
        .then(message => {
            if (message == 'OK') {
                console.log('OK');
                // cart.clear();
                // Route final checkout page
                document.location.href = `./checkout-result.html`;
            } else {
                console.log('Send Mail Error');
            }
        });
    }  
});
