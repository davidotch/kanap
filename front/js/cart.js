//----Obtenir des données à partir du LocalStorage----
// --on récpère les données dans le localStorage.
let basket = JSON.parse(localStorage.getItem("localProduct"));
console.log(basket);

//----Obtenir les données du produit à partir de l'API/ID pour obtenir le prix----
function getProductDatas(idProduct) {
   response = fetch("http://localhost:3000/api/products/" + idProduct).then(
      (data) => {
         return data.json();
      }
   );
   return response;
}

//----Données du panier----

// ----la fonction async 'getBasket' contient l'expression await et interrompt l'exécution de la fonction asynchrone et attend la résolution de la promesse passée. La fonction async reprend ensuite puis renvoie la valeur 'getproductData'.
async function getBasket() {
   if (basket === null || basket == 0) {
      let h1 = document.querySelector("h1");
      h1.innerText = "Votre panier est vide";
   } else {
      //--length indique le nombre d'element dans le tableau pour nous ce sera 'basket' dans le localStorage--
      for (let i = 0; i < basket.length; i++) {
         let item = basket[i];

         //----on initialise 'productPrice' avec comme valeur fectch.
         productPrice = await getProductDatas(item.id);
         console.log(productPrice);

         //----Création de l'élément "article" pour afficher les articles dans le panier----
         let article = document.createElement("article");
         article.className = "cart__item";
         article.setAttribute("data-id", item.id);
         article.setAttribute("data-color", item.color);
         document.querySelector("#cart__items").appendChild(article);
         article.innerHTML += `<div class="cart__item__img">
                               <img src="${item.img}" alt="${item.alt}">
                            </div>
                            <div class="cart__item__content">
                             <div class="cart__item__content__description">
                               <h2>${item.name}</h2>
                                <p>${item.color}</p>
                                <p>${productPrice.price} €</p>
                             </div>
                            <div class="cart__item__content__settings">
                               <div class="cart__item__content__settings__quantity">
                                  <p>Qté : </p>
                                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                               </div>
                               <div class="cart__item__content__settings__delete">
                                 <p class="deleteItem">Supprimer</p>
                                </div>
                              </div>
                            </div>`;
      }
      getTotalQuantity();
      changeQuantity();
      deleteProduct();
   }
}

getBasket();

// ----Obtenir la quantité totale et le prix total du produit dans le panier----

// --la fonction async 'getTotalQuantity' contient l'expression await et interrompt l'exécution de la fonction asynchrone et attend la résolution de la promesse passée. La fonction async reprend ensuite puis renvoie la valeur 'getproductData'--

async function getTotalQuantity() {
   const quantity = document.querySelectorAll(".itemQuantity");
   let totalQty = 0;
   //--for ([initialisation]; [condition]; [expression-finale])--
   for (let i = 0; i < quantity.length; i++) {
      let value = quantity[i].value;
      totalQty += parseInt(value);
   }
   document.querySelector("#totalQuantity").innerText = totalQty;

   let totalPrice = 0;

   for (let i = 0; i < basket.length; i++) {
      let item = basket[i];

      //--on initialise 'productPrice' avec comme valeur la fonction fectch--
      productPrice = await getProductDatas(item.id);
      console.log(productPrice);

      totalPrice += quantity[i].value * productPrice.price;
   }
   document.querySelector("#totalPrice").innerHTML = totalPrice;
}

// -----Modifier la quantité du produit et le retirer du panier----
function changeQuantity() {
   const inputQuantity = document.querySelectorAll(".itemQuantity");

   for (let i = 0; i < inputQuantity.length; i++) {
      inputQuantity[i].addEventListener("change", (e) => {
         e.preventDefault();

         let modifiedValue = inputQuantity[i].value;

         if (modifiedValue > 0 && modifiedValue <= 100) {
            basket[i].quantity = modifiedValue;

            localStorage.setItem("localProduct", JSON.stringify(basket));
         } else if (modifiedValue > 100 || modifiedValue < 0) {
            alert("La quantité saisie est incorrecte");
         } else {
            if (
               confirm("Voulez-vous supprimer cet article du panier ?") == true
            ) {
               let itemToRemoveId = basket[i].id;
               let itemToRemoveColor = basket[i].color;

               newBasket = basket.filter(
                  // --filter permet de créer et de retourner un nouveau tableau remplissant une condition déterminé
                  (e) =>
                     e.id !== itemToRemoveId || e.color !== itemToRemoveColor
               );

               localStorage.setItem("localProduct", JSON.stringify(newBasket));
            }
         }
         getTotalQuantity();
      });
   }
}

// ----Supprimer l'article du panier----

function deleteProduct() {
   const deleteButton = document.querySelectorAll(".deleteItem");

   for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", (e) => {
         e.preventDefault();

         if (
            confirm("Voulez-vous supprimer cet article du panier ? ") == true
         ) {
            let itemToRemoveId = basket[i].id;
            let itemToRemoveColor = basket[i].color;

            newBasket = basket.filter(
               (e) => e.id !== itemToRemoveId || e.color !== itemToRemoveColor
            );

            localStorage.setItem("localProduct", JSON.stringify(newBasket));

            window.location.reload();
         }
      });
   }
}

// ----Formulaire----

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");

const firstNameError = firstName.nextElementSibling;
const lastNameError = lastName.nextElementSibling;
const addressError = address.nextElementSibling;
const cityError = city.nextElementSibling;
const emailError = email.nextElementSibling;

const nameCityRegExp = /^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/;
const addressRegExp = /^[0-9]{1,3}[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$/;
const emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

function formControl() {
   //--fonction testREgExp et msg erreur--
   function testRegExp(name, regExp, error) {
      //--match() permet d'obtenir le tableau des correspondances entre la chaîne courante et une expression rationnelle--
      if (name.value.match(regExp)) {
         error.innerHTML = "";
      } else {
         error.innerHTML = "La saisie est incorrecte";
         return false;
      }
   }

   //----Ecoute evenements des differents champs----
   firstName.addEventListener("change", function () {
      testRegExp(firstName, nameCityRegExp, firstNameError);
   });
   lastName.addEventListener("change", function () {
      testRegExp(lastName, nameCityRegExp, lastNameError);
   });
   address.addEventListener("change", function () {
      testRegExp(address, addressRegExp, addressError);
   });
   city.addEventListener("change", function () {
      testRegExp(city, nameCityRegExp, cityError);
   });
   email.addEventListener("change", function () {
      testRegExp(email, emailRegExp, emailError);
   });
}
formControl();

//----Passer la commande----

const postUrl = "http://localhost:3000/api/products/order";
const btnOrder = document.querySelector("#order");

btnOrder.addEventListener("click", (e) => {
   e.preventDefault();

   if (
      firstName.value == "" ||
      lastName.value == "" ||
      address.value == "" ||
      city.value == "" ||
      email.value == ""
   ) {
      alert("Veuillez remplir les champs du formulaire");
   } else if (
      firstNameError.innerHTML !== "" ||
      lastNameError.innerHTML !== "" ||
      addressError.innerHTML !== "" ||
      cityError.innerHTML !== "" ||
      emailError.innerHTML !== ""
   ) {
      alert("La saisie de votre formulaire est incorrecte");
   } else if (basket === null || basket == 0) {
      alert("votre panier est vide, veuillez choisir un article");
      window.location.href = "index.html";
   } else if (confirm("Confirmez-vous votre commande ? ") == true) {
      let basketItems = [];

      //--for ([initialisation]; [condition]; [expression-finale])--
      for (let i = 0; i < basket.length; i++) {
         basketItems.push(basket[i].id);
      }

      let order = {
         contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
         },
         products: basketItems,
      };

      const options = {
         // --la méthode post permet d'envoyer des données.
         method: "post",
         // -- convertit une valeur js en chaine JSON.
         body: JSON.stringify(order),
         // -- headers de l'API fetch permet d'effectuer des actions sur les entetes de requetes.
         headers: {
            // -- content-type permet d'indiquer la nature et le format d'un document.
            "Content-Type": "application/json",
            // --accept indique quels sont les types de contenu.
            accept: "application/json",
         },
      };

      fetch(postUrl, options)
         .then((res) => res.json())
         .then((datas) => {
            console.log(datas);

            localStorage.clear();

            window.location.href = "confirmation.html?orderId=" + datas.orderId;
         })
         .catch((error) => {
            alert(error);
         });
   } else {
      return false;
   }
});
