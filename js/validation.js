function emailValidation(element) {
    const value = element.value;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.match(regexEmail)) {
        element.classList.remove("warning");
        return true;
    } else {
        element.classList.add("warning");
        return false;
    }
}

function phoneValidation(element) {
    const value = element.value;
    const filteredArr = value.match(/\d/g) || [];
    const filteredStr = filteredArr.join('');
    const regexTel = /^\+?3?8?(0[5-9][0-9]\d{7})$/;
    if (filteredStr.match(regexTel)) {
        element.classList.remove("warning");
        return true;
    } else {
        element.classList.add("warning");
        return false;
    }
}

function textValidation(element) {
    if (element.value.length > 0) {
        element.classList.remove("warning");
        return true;
    }
    element.classList.add("warning");
    return false; 
}

function validationRadioBlock (...elements) {
    let isValid = false;
    elements.forEach(el => {
        if (el.value.length > 0) isValid = true;
    });
    return isValid;
}