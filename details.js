const params = new URLSearchParams(window.location.search);
const id = params.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch(URL + id)
  .then((resp) => resp.json())
  .then((product) => {
    const container = document.getElementById("product-details");
    container.innerHTML = `
    <h1>${product.name}</h1>
    <p>${product.description}</p>
    <p >${product.brand}</p>
    <p >${product.imageUrl}</p>
    <p >${product.price}</p>
    `;
  });
