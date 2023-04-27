function sendEmail() {
    const date = new Date();
    const dateStr = date.toLocaleString();
    const id = orderId(date);
    const htmlMail = `
        <p>Дата: ${dateStr}</p>
        <p>Фамілія: ${inputTextArr[0].value}</p>
        <P>Імя: ${inputTextArr[1].value}</P>
        <P>Телефон: ${inputPhoneEl.value}</P>
        <p>Емеіл: ${inputEmailEl.value}</p>
        <p>Місто: ${cityInput.value}</p>
        <p>Пошта: ${getCheckedRadio('postType')}</p>
        <p>Відділення: ${getPostAddress(getCheckedRadio('postType'),nvPostEl, ukrPostEl)}</p>
        <h3>Замовлення: ${productsTable(cart.data)}</h3>
        <h2>Сумма: ${cart.sum} ₴</h2>
    `;

    return Email.send({
        Host : "smtp.elasticemail.com",
        Username : "stanislav055@gmail.com",
        Password : "4A7CD0EF3652ACE5A760A84FB6DB24CE3A55",
        To : 'stanislav055@gmail.com',
        From : "stanislav055@gmail.com",
        Subject : `Замовлення №${id}`,
        Body : htmlMail
    });
}

function orderId(date) {
    return `${date.getHours()}${date.getMinutes()}${Math.floor(Math.random()*99)}`;
}

// Create product table
function productsTable(data) {
  let resultHtml = 
  `<table><tbody>
      <tr>
      <th>Назва</th>
      <th>ID</th>
      <th>Ціна</th>
      <th>Кількість</th>
      <th>Сумма</th>
      </tr>
  `;
  data.forEach(el => {
      resultHtml += `
          <tr>
              <td style='padding: 1rem;'>
                  <a href='${document.location.origin}/product.html?id=${el.id}'>${el.name}</a>
              </td>
              <td style='padding: 1rem;'>
                  <span>${el.id} </span>
              </td>
              <td style='padding: 1rem;'>
                  <span>${el.price} ₴</span>
              </td>
              <td style='padding: 1rem;'>
                  <span>${el.numberOfUnits}</span>
              </td>
              <td style='padding: 1rem;'>
                  <span>${el.price*el.numberOfUnits} ₴</span>
              </td>
          </tr>
      `;
  })
  resultHtml += `</tbody></table>`;
  return resultHtml;
}

// return post address or Відсутня
function getPostAddress(postType, ...inputs) {
    let postAddress = 'Відсутня';
    inputs.forEach(element => {
        if (element.name == postType) postAddress = element.value;
    });
    return postAddress;
}