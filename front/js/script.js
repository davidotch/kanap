// Datas Url from API
const url = 'http://localhost:3000/api/products';

// All product from API

fetch(url)
    .then(response => {
        if(response.ok){
            response.json().then(datas => {
                console.log(datas);
                showProducts(datas);
            })
        }
        else {
            console.log("Une erreur s'est produite");
        }
    }
)

