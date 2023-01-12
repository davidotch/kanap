// get all products from api

function getProducts() {
   fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((datas) => {
         console.log(datas);
         allProducts(datas);
      })
      .catch((error) => {
         console.log("Une erreur est survenue : " + error);
      });
}
getProducts();

function allProducts(datas) {
   for (let i = 0; i < datas.length; i++) {
      let data = datas[i];
      console.log(i);
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
