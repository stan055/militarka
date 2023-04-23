function sendEmail(subject, body) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "stanislav055@gmail.com",
        Password : "4A7CD0EF3652ACE5A760A84FB6DB24CE3A55",
        To : 'tortugatk500@gmail.com',
        From : "stanislav055@gmail.com",
        Subject : subject,
        Body : body
    }).then(
      message => alert(message)
    );
}

// Create product table for mail
function productsHtml(data) {
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
                  <a href='http://127.0.0.1:5501/product.html?id=${el.id}'>${el.name}</a>
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