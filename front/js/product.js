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

// datas on page

function showItemProduct(datas) {
   document.querySelector(
      ".item__img"
   ).innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
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
}
