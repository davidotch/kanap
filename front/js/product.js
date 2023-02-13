//----Obtenir ID du produit de la page ----
// --URLSerachParams permet de travailler les paramètre d'une Url.
// --window.location nous permet de renvoyer un objet qui contient des informations sur l'url courante du document.
const params = new URLSearchParams(window.location.search);

// --get nous permet de renvoyer la valeur de params et de rechercher son id.
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

//----Obtenir les données par une requête Fetch----
function getProductDatas() {
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
}
getProductDatas();

//----Afficher les données du produit sur la page + injection Html----
function itemProduct(datas) {
   document.querySelector(
      ".item__img"
   ).innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}" />`;
   document.querySelector("title").innerText = `${datas.name}`;
   document.querySelector("#title").innerText = `${datas.name}`;
   document.querySelector("#price").innerText = `${datas.price}`;
   document.querySelector("#description").innerText = `${datas.description}`;
   // --for...of permet de creer une boucle au sein de notre array pour récupérer les couleurs.
   for (let i of datas.colors) {
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      document.querySelector("#colors").appendChild(option);
   }
}

//----Création du panier----
const itemQuantity = document.querySelector("#quantity");
const itemColor = document.querySelector("#colors");
const addToCart_btn = document.querySelector("#addToCart");

function addItemToCart(datas) {
   addToCart_btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (
         itemQuantity.value <= 0 ||
         itemQuantity.value > 100 ||
         itemColor.value == ""
      ) {
         alert("Veuillez saisir une quantité correcte et la couleur");
      } else {
         let qty = itemQuantity.value;
         let colour = itemColor.value;

         let selectProduct = {
            id: id,
            img: datas.imageUrl,
            alt: datas.altTxt,
            description: datas.description,
            name: datas.name,
            quantity: Number(qty),
            color: colour,
         };

         let basket = JSON.parse(localStorage.getItem("localProduct"));
         //json.parse=analyse une chaine de caractere json et construit l'objet décrit.

         //----Ajouter le produit sélectionner au panier----
         addToBasket = () =>
            localStorage.setItem("localProduct", JSON.stringify(basket));
         //json.stringinfy=convertit une valeurjs en chaine json.

         //----Accéder au panier----
         accessToCart = () => {
            if (
               confirm("Votre article a été ajouté, accéder au panier ?") ==
               true
            ) {
               window.location.href = "../html/cart.html";
            }
         };

         //----Créer ou modifier le panier----
         if (basket) {
            let sameItem = basket.find(
               // --find renvoie la valeur du 1er element trouvé dans notre array.
               (element) => element.id === id && element.color === colour
            );

            if (sameItem) {
               let addQuantity =
                  parseInt(selectProduct.quantity) +
                  parseInt(sameItem.quantity);
               //parseInt=convertit une chaine de caractere en nombre entier
               //parseFloat=convertit une chaine de caractere en nombre avec la virgule
               sameItem.quantity = addQuantity;

               addToBasket();
               accessToCart();
            } else {
               // --push ajoute l'element a la fin de notre array et retourne la nouvelle valeur.
               basket.push(selectProduct);

               addToBasket();
               accessToCart();
            }
         } else {
            basket = [];
            basket.push(selectProduct);

            addToBasket();
            accessToCart();
         }
      }
   });
}
