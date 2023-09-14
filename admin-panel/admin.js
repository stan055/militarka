import { getAuth, onAuthStateChanged, updateEmail, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"
import app from '../modules/firebase-app.js'
import getRandomInt from '../modules/random.js'

const menuItems = document.getElementsByClassName('admin-menu-item')
const pages = document.getElementsByTagName('section')
const auth = getAuth(app)
let db

document.addEventListener('DOMContentLoaded', () => { })

// Menu listeners
Array.from(menuItems).forEach
   (element => element.addEventListener('click', event => {
      const name = event.target.getAttribute('name')
      showPage(name)
   }));


function hideAllPages() {
   Array.from(pages).forEach(element => {
      element.classList.add('hide')
   })
}

function showPage(name) {
   const page = document.querySelector(`section[name='${name}']`)
   if (page) {
      hideAllPages()
      page.classList.remove('hide')
   }
}

// Auth state manager
onAuthStateChanged(auth, (user) => {
   if (user) {
      db = getFirestore(app);
      getCategory()
   } else {
      // const objUser = JSON.parse(localStorage.getItem('USER'))
      // if (objUser) {
      //    signInWithEmailAndPassword(auth, objUser.email, objUser.password)
      //       .then((userCredential) => {})
      //       .catch((error) => { document.location.href = 'login.html' })
      // } else {
      //    document.location.href = 'login.html'
      // }
      alert('Авторизація відсутня!')
   }
});

// Email button listener
document.getElementById('emailBtn').addEventListener('click', () => {
   const newEmail = document.getElementById('inputEmail').value

   const storageUser = JSON.parse(localStorage.getItem('USER'))
   if (storageUser) {
      // ReSignIn to Firebase
      signInWithEmailAndPassword(auth, storageUser.email, storageUser.password)
         .then((userCredential) => {
            // Update Email
            updateEmail(auth.currentUser, newEmail)
               .then(() => {
                  // Set storage new email
                  const updatedUser = { 'email': newEmail, 'password': storageUser.password }
                  localStorage.setItem('USER', JSON.stringify(updatedUser))
                  alert(`Емеіл змінено! ${newEmail}`)
               })
               .catch((error) => alert(error.message));
         })
         .catch((error) => {
            alert(error.message)
            signOut()
         })
   } else {
      signOut()
   }
})

// Sign Out Btn listener
document.getElementById('signout_btn').addEventListener('click', () => {
   signOut()
})

// Password button listener
document.getElementById('passBtn').addEventListener('click', () => {
   const newPass = document.getElementById('inputPass').value
   if (newPass.length < 6) return

   const storageUser = JSON.parse(localStorage.getItem('USER'))
   if (storageUser) {
      // ReSignIn to Firebase
      signInWithEmailAndPassword(auth, storageUser.email, storageUser.password)
         .then((userCredential) => {

            // Update admin password
            updatePassword(auth.currentUser, newPass)
               .then(() => {
                  const updatedUser = { 'email': storageUser.email, 'password': newPass }
                  localStorage.setItem('USER', JSON.stringify(updatedUser))
                  alert(`Пароль змінено! ${newPass}`)
               })
               .catch((error) => alert(error.message));
         })
         .catch((error) => {
            alert(error.message)
            signOut()
         })
   } else {
      signOut()
   }
})

// Sign out user
function signOut() {
   auth.signOut().then(function () {
      localStorage.removeItem('USER') // Remove USER
      document.location.href = 'login.html' // Follow to...
   }, function (error) { alert(error.message) });
}

// Store Name button listener
document.getElementById('nameBtn').addEventListener('click', () => {
   try {
      const storeName = document.getElementById('inputName').value

      if (storeName.length > 0) {
         const infoRef = doc(db, "base", "info");
         // Change store name
         updateDoc(infoRef, { store_name: storeName })
            .then(() => alert(`Нове ім'я додано: ${storeName}`))
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error.message)
   }
})

// Address button listener
document.getElementById('addressBtn').addEventListener('click', () => {
   try {
      const address = document.getElementById('inputAddress').value

      if (address.length > 0) {
         const infoRef = doc(db, "base", "info");
         // Change address
         updateDoc(infoRef, { address: address })
            .then(() => alert(`Нова адреса додана: ${address}`))
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error.message)
   }
})

// Store Email button listener
document.getElementById('emailStorBtn').addEventListener('click', () => {
   try {
      const value = document.getElementById('inputEmailStor').value

      if (value.length > 0) {
         const infoRef = doc(db, "base", "info");
         updateDoc(infoRef, { email: value })
            .then(() => alert(`Новий емеіл додано: ${value}`))
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error)
   }
})

// Phone number button listener
document.getElementById('telBtn').addEventListener('click', () => {
   try {
      const tel = document.getElementById('inputTel').value

      if (tel.length > 0) {
         const infoRef = doc(db, "base", "info");
         updateDoc(infoRef, { tel: tel })
            .then(() => alert(`Новий телефон додано: ${tel}`))
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error)
   }
})

// Header string
document.getElementById('textBtn').addEventListener('click', () => {
   try {
      const text = document.getElementById('inputText').value

      if (text.length > 0) {
         const infoRef = doc(db, "base", "info");
         updateDoc(infoRef, { text: text })
            .then(() => alert(`Новий текст додано: ${text}`))
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error)
   }
})

// ----------------MENU CATEGORY START--------------------

// Menu Add-Category button listener
document.getElementById('categoryBtn').addEventListener('click', () => {
   try {

      const element = document.getElementById('inputCategory')

      if (element.value.length > 0) {
         const docRef = doc(db, "base", "category");
         updateDoc(docRef, { array: arrayUnion(element.value) })
            .then(() => {
               getCategory()
               element.value = ''
            })
            .catch((error) => alert(error.message))
      }
   } catch (error) {
      alert(error)
   }
})

// Get Menu Category array
function getCategory() {
   const docRef = doc(db, "base", "category");
   getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
         const array = docSnap.data().array
         createCategoryList(array)

         // Category remove-button listener
         array.forEach(element => {
            const id = `category_${element.split(' ').join('_')}`
            document.getElementById(id).addEventListener('click', () => {

               // Remove element from category-array 
               updateDoc(docRef, { array: arrayRemove(element) })
                  .then(() => {
                     getCategory()
                  })
                  .catch((error) => alert(error.message))
            })
         })
      } else {
         alert("Категорій не знайдено!")
      }
   })
}

// Create admin category list
function createCategoryList(array) {
   try {
      const categoryList = document.getElementById('categoryList')
      categoryList.innerHTML = ''
      // Create Category list
      array.forEach(element => {
         const id = `category_${element.split(' ').join('_')}`
         const liId = `li_${id}`
         categoryList.innerHTML += `<li id="${liId}" class="list-group-item d-flex justify-content-between align-items-center">${element}<button id=${id} type="submit" class="btn btn-outline-dark">Видалити</button></li>`
      })
   } catch (error) {
      console.log(error)
   }

}

// ----------------MENU CATEGORY END--------------------

// ----------------ADD PRODUCT START--------------------

document.getElementById('addProductBtn').addEventListener('click', () => {
   const form = document.getElementById('productForm')
   const productForm = new FormData(form)

   const product = {
      title: productForm.get('title'),
      category: productForm.get('category'),
      price: productForm.get('price'),
      attribute: productForm.get('attribute'),
      description: productForm.get('description'),
      image: productForm.get('image1'),
      images: [
         productForm.get('image2'),
         productForm.get('image3'),
         productForm.get('image3'),
         productForm.get('image4'),
         productForm.get('image5')
      ],
      id: getRandomInt(1000000000000, 9999999999999)
   }

   if (product.title.length === 0) return
   if (product.category.length === 0) return
   if (product.price.length === 0) return
   if (product.description.length === 0) return
   if (product.image.size === 0) return

   const imagesEl = document.querySelectorAll('#productForm input[type="file"]')
   if (product.image.size > 1000000) {
      alert(`Помилка! Розмір ${product.image.name}  ПЕРЕВІЩУЄ ЛІМІТ 1мб!`)
      imagesEl[0].value = ''
      return
   }
   if (product.images[0].size > 1000000) {
      alert(`Помилка! Розмір ${product.images[0].name}  ПЕРЕВІЩУЄ ЛІМІТ 1мб!`)
      imagesEl[1].value = ''
      return
   }
   if (product.images[1].size > 1000000) {
      alert(`Помилка! Розмір ${product.images[0].name}  ПЕРЕВІЩУЄ ЛІМІТ 1мб!`)
      imagesEl[2].value = ''
      return
   }
   if (product.images[2].size > 1000000) {
      alert(`Помилка! Розмір ${product.images[0].name}  ПЕРЕВІЩУЄ ЛІМІТ 1мб!`)
      imagesEl[3].value = ''
      return
   }
   if (product.images[3].size > 1000000) {
      alert(`Помилка! Розмір ${product.images[0].name}  ПЕРЕВІЩУЄ ЛІМІТ 1мб!`)
      imagesEl[4].value = ''
      return
   }

   console.log('Product END')
})

// ----------------ADD PRODUCT END--------------------
