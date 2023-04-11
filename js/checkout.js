const apiKey = "9bd900f2cabe860e47e323dad85630da";
const requestURL = 'https://api.novaposhta.ua/v2.0/json/';


document.addEventListener("DOMContentLoaded", () => {

    const cart = new Cart();
    renderProductsTable(cart.data);
    // nvstations();
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

// City input Google Maps autocomplete 
let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['locality'],
            componentRestrictions: {'country': ['UKR']},
        });
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const cityName = place.address_components[0].short_name; 
        console.log(place);
        searchSettlements(cityName);
    });
    
}

function searchSettlements(cityName) {
    const obj = {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : "Укр",
            "Limit" : "50",
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
          console.log(data);
        })
        .catch(console.error);
}

function novaposhtaApi () {

    const obj = {
       "apiKey": apiKey,
       "modelName": "Address",
       "calledMethod": "getWarehouses",
       "methodProperties": {
            "CityName" : "українка",
            "Page" : "1",
            "Limit" : "50",
            "Language" : "UA",
       }
    }
   
    const request = new Request(requestURL, {
      method: "POST",
      body: JSON.stringify(obj),
    });
    
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
}


