// get information product by id

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// All product from API

const url = `http://localhost:3000/api/products/${id}`;

fetch(url).then((response) => {
   if (response.ok) {
      response.json().then((datas) => {
         console.log(datas);
         showItemProduct(datas);
      });
   } else {
      console.log("Erreur de chargement");
   }
});
