// GET BASKET DATAS FROM LOCAL STORAGE
let basket = JSON.parse(localStorage.getItem("localProduct"));
console.log(basket);

// GET PRODUCT DATAS FROM API BY ID TO GET ITS PRICE
function getProductDatas(idProduct) {
   response = fetch("http://localhost:3000/api/products/" + idProduct).then(
      (data) => {
         return data.json();
      }
   );
   return response;
}

// DISPLAY BASKET DATAS
getBasket = async () => {
   if (basket === null || basket == 0) {
      let h1 = document.querySelector("h1");
      h1.innerText = "Votre panier est vide";
   } else {
      for (let i = 0; i < basket.length; i++) {
         let item = basket[i];

         productData = await getProductDatas(item.id);
         console.log(productData);

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
                                <p>${productData.price} €</p>
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
      getTotalQty();
      changeQty();
      removeItem();
   }
};

getBasket();

