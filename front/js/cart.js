// ----Get datas from local stotage----

let basket = JSON.parse(localStorage.getItem("localProduct"));
console.log(basket);

// ----Get product datas from API/ID to get price----

function getProductDatas(idProduct) {
   response = fetch("http://localhost:3000/api/products/" + idProduct).then(
      (data) => {
         return data.json();
      }
   );
   return response;
}

// ----Basket datas----

// ----la fonction async 'getBasket' contient l'expression await et interrompt l'exécution de la fonction asynchrone et attend la résolution de la promesse passée. La fonction async reprend ensuite puis renvoie la valeur 'productData'.

async function getBasket() {
   if (basket === null || basket == 0) {
      let h1 = document.querySelector("h1");
      h1.innerText = "Votre panier est vide";
   } else {
      for (let i = 0; i < basket.length; i++) {
         let item = basket[i];

         productPrice = await getProductDatas(item.id);
         console.log(productPrice); //----on initialise 'productPrice' avec comme valeur la fonction fectch.

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
      removeItem();
   }
}

getBasket();

// ----Get basket product total quantity and total price----

// ----la fonction async 'getTotalQuantity' contient l'expression await et interrompt l'exécution de la fonction asynchrone et attend la résolution de la promesse passée. La fonction async reprend ensuite puis renvoie la valeur 'productData'.

async function getTotalQuantity() {
   const quantity = document.querySelectorAll(".itemQuantity");
   let totalQty = 0;
   for (let i = 0; i < quantity.length; i++) {
      let value = quantity[i].value;
      totalQty += parseInt(value);
   }
   document.querySelector("#totalQuantity").innerText = totalQty;

   let totalPrice = 0;

   for (let i = 0; i < basket.length; i++) {
      let item = basket[i];

      productPrice = await getProductDatas(item.id);
      console.log(productPrice); //----on initialise 'productPrice' avec comme valeur la fonction fectch.

      totalPrice += quantity[i].value * productPrice.price;
   }
   document.querySelector("#totalPrice").innerHTML = totalPrice;
}

// -----Modify product quantity and remove from basket----

function changeQuantity() {
   const inputQuantity = document.querySelectorAll(".itemQuantity");

   for (let i = 0; i < inputQuantity.length; i++) {
      inputQty[i].addEventListener("change", (e) => {
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

// ----Remove item from basket----

function removeItem() {
   const removeBtn = document.querySelectorAll(".deleteItem");

   for (let i = 0; i < removeBtn.length; i++) {
      removeBtn[i].addEventListener("click", (e) => {
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
