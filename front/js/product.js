// GET ID OF THE PAGE'S PRODUCT
const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

// NOW GET ITS DATAS BY FETCH REQUEST
getProductDatas = () => {
   fetch(url)
      .then(function (res) {
         if (res.ok) {
            return res.json();
         }
      })
      .then(function (datas) {
         console.log(datas);
         itemProduct(datas);
         addItemToCart(datas);
      })
      .catch(function (error) {
         console.log("Erreur lors du chargement : " + error);
      });
};
getProductDatas();

// DISPLAY PRODUCT'S DATAS ON THE PAGE, INJECT TO HTML
itemProduct = (datas) => {
   document.querySelector(
      ".item__img"
   ).innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}" />`;
   document.querySelector("title").innerText = `${datas.name}`;
   document.querySelector("#title").innerText = `${datas.name}`;
   document.querySelector("#price").innerText = `${datas.price}`;
   document.querySelector("#description").innerText = `${datas.description}`;
   for (let i of datas.colors) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      document.querySelector("#colors").appendChild(option);
   }
};

const itemQty = document.querySelector("#quantity");

const itemColor = document.querySelector("#colors");

const addToCart_btn = document.querySelector("#addToCart");

// CREATE CUSTOMER'S BASKET
addItemToCart = (datas) => {
   addToCart_btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (itemQty.value <= 0 || itemQty.value > 100 || itemColor.value == "") {
         alert("Veuillez saisir une quantité correcte et la couleur");
      } else {
         let qty = itemQty.value;
         let colour = itemColor.value;

         let selectedItem = {
            id: id,
            img: datas.imageUrl,
            alt: datas.altTxt,
            description: datas.description,
            name: datas.name,
            quantity: Number(qty),
            color: colour,
         };

         let basket = JSON.parse(localStorage.getItem("localBasket"));
         //json.parse=analyse une chaine de caractere json et construit l'objet décrit.

         // ADD SELECTED PRODUCT TO BASKET
         addToBasket = () =>
            localStorage.setItem("localBasket", JSON.stringify(basket));
         //json.stringinfy=convertit une valeurjs en chaine json.

         // WANT TO ACCESS THE BASKET ?
         accessToCart = () => {
            if (confirm("Commande enregistrée, accéder au panier ?") == true) {
               window.location.href = "../html/cart.html";
            }
         };

         // CREATE OR MODIFY BASKET
         if (basket) {
            let sameItem = basket.find(
               (element) => element.id === id && element.color === colour
            );

            if (sameItem) {
               let addQuantity =
                  parseInt(selectedItem.quantity) + parseInt(sameItem.quantity);
               //parseInt=analyse et renvoie un entier dans une base de données
               sameItem.quantity = addQuantity;

               addToBasket();
               accessToCart();
            } else {
               basket.push(selectedItem);

               addToBasket();
               accessToCart();
            }
         } else {
            basket = [];
            basket.push(selectedItem);

            addToBasket();
            accessToCart();
         }
      }
   });
};
