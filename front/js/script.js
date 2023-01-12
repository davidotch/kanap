// Datas Url from API
const url = "http://localhost:3000/api/products";

// All product from API

fetch(url).then((response) => {
   if (response.ok) {
      response.json().then((datas) => {
         console.log(datas);
         showProducts(datas);
      });
   } else {
      console.log("Une erreur s'est produite");
   }
});

// datas on page

function showProducts(products) {
   for (let product of products) {
      let allProducts = document.createElement("a");
      document.querySelector(".items").appendChild(allProducts);
      allProducts.href = `./product.html?id=${product._id}`;

      let articleProduct = document.createElement("article");
      allProducts.appendChild(articleProduct);

      let imageProduct = document.createElement("img");
      articleProduct.appendChild(imageProduct);
      imageProduct.src = `${product.imageUrl}`;
      imageProduct.alt = `${product.altTxt}`;

      let nameProduct = document.createElement("h3");
      articleProduct.appendChild(nameProduct);
      nameProduct.innerHTML = `${product.name}`;

      let descriptionProduct = document.createElement("p");
      articleProduct.appendChild(descriptionProduct);
      descriptionProduct.innerHTML = `${product.description}`;
   }
}
