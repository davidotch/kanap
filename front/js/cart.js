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


