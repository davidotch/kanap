//----Afficher L'ID de la commande----

function idOrder() {
   const params = new URLSearchParams(window.location.search);

   const orderiId = params.get("orderId");

   let displayId = document.querySelector("#orderId");
   displayId.innerText = orderiId;
};

idOrder();
