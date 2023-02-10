//----Appel de l'API pour retrouver les différents produits----
// --la fonction est un ensemble d'instructions qui effectue une tache ou clacul une valeur.
// --Fetch fournit une interface jS qui permet l'acces et la manipulation http comme les requêtes et les réponses et agit de maière asynchrone.
// --API "Application Programming Interface" ets un service creer par un tiers afin d'obtenir differntes informations.
function getProducts() {
   fetch("http://localhost:3000/api/products")
      // --.then est une methode qui nous renvoie un une promesse
      .then((response) => response.json()) // --siTenue.
      .then((datas) => {
         console.log(datas);
         allProducts(datas);
      })
      // --En cas d'erreur sur notre API on retoure une erreur.
      .catch((error) => {
         // --siRejeté.
         console.log("Une erreur est survenue : " + error);
      });
}
getProducts();

//----Nous utilisons les informations récupérées via l'API pour afficher tous les produits----
function allProducts(datas) {
   //  --L'instruction "for" crée une boucle composée de 3 expressions.
   // --Initilisation -> déclaration de la variable.
   // --Condition -> qui est évaluée avant chaque itération et si cette expression est vérifié alors l'instruction est éxécuté.
   // --Expression finale -> qui est évaluée a la fin de chaque itération pour mettre a jour ou incréménter le compteur de la variable d'initialisation.
   for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      console.log(i);
      //--Création de l'élément "a" pour afficher les articles--
      let a = document.createElement("a");
      a.setAttribute("href", `./product.html?id=${data._id}`);
      document.querySelector("#items").appendChild(a);
      a.innerHTML = `
      <article>
         <img src="${data.imageUrl}" alt="${data.altTxt}, ${data.name}">
         <h3 class="productName">${data.name}</h3>
         <p class="productDescription">${data.description}</p>
      </article></a>`;
   }
}
