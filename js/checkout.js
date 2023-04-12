const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';

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

let timeId;
function autocompleteCity() {
    const cityName = document.getElementById("autocomplete").value;
    if (cityName.length < 2) return;
    
    clearTimeout(timeId);
    timeId = setTimeout(
        searchSettlements,
        1000,
        cityName,        
    );
    
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
          const autocompleteSearch = document.getElementById("autocompleteSearch");
          autocompleteSearch.innerHTML = ``;
          if(data.data[0].Addresses) {
              data.data[0].Addresses.forEach(element => {
                autocompleteSearch.innerHTML += `<option value="${element.Present}" />`;
              });
          }
        })
        .catch(console.error);
}

